const express = require('express');
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { contactValidation } = require('../validators/contactValidator');
const { validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', contactValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, createContact);
router.put('/:id', contactValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, updateContact);
router.delete('/:id', deleteContact);

module.exports = router;