const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/ContactController");
const validateToken = require("../middleware/ValidateTokenHandler");

// This is to make all the routes protected(i.e, only authorized  users can have access to these routes )
router.use(validateToken);

// router.route("/").get(getContacts);
// router.route("/").post(createContact);
// OR
router.route("/").get(getContacts).post(createContact);

// router.route("/:id").get(getContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);
// OR
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
