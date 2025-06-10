const { body } = require('express-validator');

exports.contactValidation = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone required'),
  body('tags')
    .isArray().withMessage('Tags must be array of strings')
    .custom((tags) => tags.every(tag => typeof tag === 'string'))
    .withMessage('Each tag must be a string'),
];