// Controllers is going to control all our logic for request and response and it is going to connect to our database

// This express provided asynchandler helps us as we don't have to write try catch blocks for async while connection to mongodb AS MONGOdb deals with promises
const asyncHandler = require("express-async-handler");

const Contact = require("../models/ContactModel");



// @description = Get all contacts
// @route = GET /api/contacts
// @access = public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});



// @description = Get all contacts
// @route = GET /api/contacts
// @access = public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});



// @description = Create contacts
// @route = POST /api/contacts
// @access = public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields  are mandatory!");
  }

  const createdContact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(createdContact);
});



// @description = Update contact
// @route = PUT /api/contacts/:id
// @access = public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});



// @description = Delete contacts
// @route = DELETE /api/contacts/:id
// @access = public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  // await Contact.remove()
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedContact);
});


module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
