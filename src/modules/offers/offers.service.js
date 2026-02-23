const repo = require("./offers.repository");
const db = require("../../config/db.postgres");

async function issueOffer(user, payload) {
  if (!["TPO","RECRUITER","ADMIN"].includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  const applicationCheck = await db.query(
    `SELECT status FROM applications
     WHERE drive_id=$1 AND student_id=$2`,
    [payload.drive_id, payload.student_id]
  );

  if (!applicationCheck.rows.length) {
    throw new Error("APPLICATION_NOT_FOUND");
  }

  if (applicationCheck.rows[0].status !== "SELECTED") {
    throw new Error("STUDENT_NOT_SELECTED");
  }

  const existing = await repo.findOffer(
    payload.student_id,
    payload.drive_id
  );

  if (existing) {
    throw new Error("OFFER_ALREADY_EXISTS");
  }

  return repo.createOffer(payload);
}

async function respondToOffer(user, offerId, decision) {
  if (user.role !== "STUDENT") {
    throw new Error("ONLY_STUDENT_ALLOWED");
  }

  const offerQuery = await db.query(
    `SELECT * FROM offers WHERE id=$1`,
    [offerId]
  );

  if (!offerQuery.rows.length) {
    throw new Error("OFFER_NOT_FOUND");
  }

  const offer = offerQuery.rows[0];

  if (decision === "ACCEPTED") {
    await db.query(
      `UPDATE applications
       SET status='OFFERED'
       WHERE drive_id=$1 AND student_id=$2`,
      [offer.drive_id, offer.student_id]
    );
  }

  return repo.updateOfferStatus(offerId, decision);
}

module.exports = {
  issueOffer,
  respondToOffer
};