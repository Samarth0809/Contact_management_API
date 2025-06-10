
const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, tags } = req.body;
    const userId = req.user.id;
    const contactId = await Contact.create({ userId, name, email, phone, tags });
    res.status(201).json({ message: 'Contact created', contactId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { tag, search, page = 1, limit = 10 } = req.query;
    const contacts = await Contact.findAll({
      userId: req.user.id,
      tag,
      search,
      page,
      limit,
    });
    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id, req.user.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id, req.user.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    await Contact.update(req.params.id, req.user.id, req.body);
    res.json({ message: 'Contact updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id, req.user.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    await Contact.delete(req.params.id, req.user.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};