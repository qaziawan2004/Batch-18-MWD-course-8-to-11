import bcrypt from "bcryptjs";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

import generateVerificationCode from "../utils/generateVerificationCode.js";

import sendVerificationEmail from "../utils/sendVerificationEmail.js";


// ==========================================
// REGISTER
// ==========================================

export const register = async (
  req,
  res,
  next
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Validation

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Name, email and password are required"
      });
    }


    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters"
      });
    }


    // Check existing user

    const existingUser =
      await User.findOne({
        email
      });


    if (
      existingUser &&
      existingUser.isVerified
    ) {
      return res.status(400).json({
        message:
          "An account with this email already exists"
      });
    }


    // Generate verification code

    const verificationCode =
      generateVerificationCode();


    // Hash password

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );


    // Hash verification code

    const hashedVerificationCode =
      await bcrypt.hash(
        verificationCode,
        10
      );


    // Expire after 10 minutes

    const verificationCodeExpires =
      new Date(
        Date.now() +
        10 * 60 * 1000
      );


    let user;


    if (existingUser) {

      existingUser.name =
        name;

      existingUser.password =
        hashedPassword;

      existingUser.verificationCode =
        hashedVerificationCode;

      existingUser.verificationCodeExpires =
        verificationCodeExpires;

      existingUser.isVerified =
        false;


      user =
        await existingUser.save();

    } else {

      user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,

          isVerified: false,

          verificationCode:
            hashedVerificationCode,

          verificationCodeExpires
        });

    }


    // Send email

    try {

      await sendVerificationEmail(
        email,
        name,
        verificationCode
      );

    } catch (emailError) {

      console.error(
        "Email sending failed:",
        emailError.message
      );


      // If this was a newly created user,
      // remove it because email verification
      // could not be sent.

      if (!existingUser) {
        await User.findByIdAndDelete(
          user._id
        );
      }


      return res.status(500).json({
        message:
          "Account could not be created because verification email could not be sent"
      });

    }


    res.status(201).json({
      message:
        "Registration successful. Verification code sent to your email.",
      email
    });

  } catch (error) {

    next(error);

  }
};


// ==========================================
// VERIFY EMAIL
// ==========================================

export const verifyEmail = async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      code
    } = req.body;


    if (!email || !code) {
      return res.status(400).json({
        message:
          "Email and verification code are required"
      });
    }


    const user =
      await User.findOne({
        email
      });


    if (!user) {
      return res.status(404).json({
        message:
          "User not found"
      });
    }


    if (user.isVerified) {
      return res.status(400).json({
        message:
          "Email is already verified"
      });
    }


    if (
      !user.verificationCode ||
      !user.verificationCodeExpires
    ) {
      return res.status(400).json({
        message:
          "No verification code found"
      });
    }


    if (
      new Date() >
      user.verificationCodeExpires
    ) {
      return res.status(400).json({
        message:
          "Verification code has expired"
      });
    }


    // Compare entered code
    // with hashed code

    const codeMatches =
      await bcrypt.compare(
        code,
        user.verificationCode
      );


    if (!codeMatches) {
      return res.status(400).json({
        message:
          "Invalid verification code"
      });
    }


    // Verify user

    user.isVerified =
      true;

    user.verificationCode =
      null;

    user.verificationCodeExpires =
      null;


    await user.save();


    // Generate JWT

    const token =
      generateToken(
        user._id
      );


    res.status(200).json({

      message:
        "Email verified successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });

  } catch (error) {

    next(error);

  }
};


// ==========================================
// RESEND VERIFICATION CODE
// ==========================================

export const resendVerificationCode =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        email
      } = req.body;


      if (!email) {
        return res.status(400).json({
          message:
            "Email is required"
        });
      }


      const user =
        await User.findOne({
          email
        });


      if (!user) {
        return res.status(404).json({
          message:
            "User not found"
        });
      }


      if (user.isVerified) {
        return res.status(400).json({
          message:
            "Email is already verified"
        });
      }


      const code =
        generateVerificationCode();


      const hashedCode =
        await bcrypt.hash(
          code,
          10
        );


      user.verificationCode =
        hashedCode;


      user.verificationCodeExpires =
        new Date(
          Date.now() +
          10 * 60 * 1000
        );


      await user.save();


      await sendVerificationEmail(
        user.email,
        user.name,
        code
      );


      res.status(200).json({
        message:
          "New verification code sent"
      });

    } catch (error) {

      next(error);

    }
  };


// ==========================================
// LOGIN
// ==========================================

export const login = async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      password
    } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required"
      });
    }


    const user =
      await User.findOne({
        email
      });


    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password"
      });
    }


    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Please verify your email before logging in"
      });
    }


    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatches) {
      return res.status(401).json({
        message:
          "Invalid email or password"
      });
    }


    const token =
      generateToken(
        user._id
      );


    res.status(200).json({

      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });

  } catch (error) {

    next(error);

  }
};
