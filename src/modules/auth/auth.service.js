const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const repo = require("./auth.repository");
const crypto = require("crypto");


async function register(email, password, phone) {
  email = email.toLowerCase().trim();

  const existing = await repo.findByEmail(email);
  if (existing) throw new Error("USER_EXISTS");

  const hash = await bcrypt.hash(password, 12);
  console.log("Password hashed");
  
  const user = await repo.createUser(email, phone, hash);
  console.log("User created");

  // Assign default STUDENT role
  await repo.assignRole(user.id, "STUDENT");

  return generateToken(user);
}

async function login(email, password) {
  email = email.toLowerCase().trim();

  const user = await repo.findByEmail(email);
  if (!user) throw new Error("USER_NOT_FOUND");

  if (!user.is_active) throw new Error("ACCOUNT_DISABLED");

  const valid = await bcrypt.compare(password, user.password_hash_txt);
  if (!valid) throw new Error("INVALID_PASSWORD");

  if (user.mfa_enabled) {
    return { mfaRequired: true, userId: user.id };
  }

  return { token: generateToken(user) };
}

async function requestReset(email) {
  email = email.toLowerCase().trim();
  const user = await repo.findByEmail(email);
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await repo.insertResetToken(user.id, token, expires);

  return token;
}

async function resetPassword(token, newPassword) {
  const record = await repo.findResetToken(token);

  if (!record || record.used || record.expires_at < new Date()) {
    throw new Error("INVALID_TOKEN");
  }

  const hash = await bcrypt.hash(newPassword, 12);

  await repo.updatePassword(record.user_id, hash);
  await repo.markTokenUsed(token);

  return true;
}

function generateToken(user) {
  console.log("Token generated");
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

module.exports = { 
  register, 
  login,
  requestReset,
  resetPassword,
  generateToken
};
