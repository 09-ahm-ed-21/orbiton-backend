const service = require("./auth.service");

async function register(req, res) {
  try {
    const token = await service.register(
      req.body.email,
      req.body.password,
      req.body.phone
    );
    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const token = await service.login(
      req.body.email,
      req.body.password
    );
    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function requestReset(req, res) {
  try {
    const token = await service.requestReset(req.body.email);
    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function resetPassword(req, res) {
  try {
    await service.resetPassword(req.body.token, req.body.newPassword);
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login, requestReset, resetPassword };
