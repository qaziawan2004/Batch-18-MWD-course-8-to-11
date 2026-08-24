import bcrypt from 'bcryptjs';

export function createOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

export async function hashOtp(otp) {
    return bcrypt.hash(otp, 10);
}

export async function compareOtp(otp, hash) {
    return bcrypt.compare(otp, hash);
}

export function otpExpiry() {
    return new Date(Date.now() + 10 * 60 * 1000);
}
