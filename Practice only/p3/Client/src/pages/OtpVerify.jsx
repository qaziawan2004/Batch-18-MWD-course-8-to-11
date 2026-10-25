import React, { useRef, useState } from "react";
import "../App.css";

export default function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setError("");

    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOtp = [...otp];

    pasted.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    setError("");

    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter all six digits.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Connect your existing OTP verification API here.
      // Example:
      // await verifyOtp(code);

      setError("Connect your existing OTP verification API.");
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // Connect your existing resend OTP API here.
    setError("Connect your existing resend OTP API.");
  };

  return (
    <div id="otp-verify" className="otp-page">
      <div className="otp-glow otp-glow-one" />
      <div className="otp-glow otp-glow-two" />

      <main className="otp-card">
        <div className="otp-brand">
          <div className="otp-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>

          <div className="otp-brand-name">SECURE VERIFICATION</div>
        </div>

        <div className="otp-heading">
          <span className="otp-eyebrow">ONE-TIME PASSWORD</span>

          <h1>
            Verify your <span>identity</span>
          </h1>

          <p>
            Enter the six-digit verification code sent to your email address.
          </p>
        </div>

        <form className="otp-form" onSubmit={handleSubmit}>
          <label className="otp-label" htmlFor="otp-digit-0">
            Verification code
          </label>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-digit-${index}`}
                ref={(element) => {
                  inputsRef.current[index] = element;
                }}
                className={`otp-digit ${digit ? "filled" : ""}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                aria-label={`OTP digit ${index + 1}`}
                maxLength={1}
                value={digit}
                onChange={(event) =>
                  handleChange(index, event.target.value)
                }
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <div className="otp-helper">
            <span className="otp-status-dot" />
            Your verification code is private and secure.
          </div>

          {error && (
            <p className="otp-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="otp-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify code"}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="otp-resend">
          Didn't receive the code?
          <button type="button" onClick={handleResend}>
            Resend OTP
          </button>
        </div>

        <div className="otp-divider" />

        <div className="otp-footer">
          <span>
            <span aria-hidden="true">✓</span> Secure connection
          </span>
          <span>
            <span aria-hidden="true">●</span> Privacy protected
          </span>
        </div>

        <p className="otp-copyright">
          Protected account verification
        </p>
      </main>
    </div>
  );
}
