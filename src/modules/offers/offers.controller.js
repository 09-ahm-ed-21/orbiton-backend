const service = require("./offers.service");

async function issueOffer(req, res) {
  try {
    const result = await service.issueOffer(req.user, req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function respondToOffer(req, res) {
  try {
    const result = await service.respondToOffer(
      req.user,
      req.params.id,
      req.body.decision
    );
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  issueOffer,
  respondToOffer
};