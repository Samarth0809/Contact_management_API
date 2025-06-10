const pool = require('../config/db');

class Contact {
  static async create({ userId, name, email, phone, tags }) {
    const [result] = await pool.query(
      'INSERT INTO contacts (user_id, name, email, phone, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [userId, name, email, phone, JSON.stringify(tags)]
    );
    return result.insertId;
  }
  static async findAll({ userId, tag, search, page = 1, limit = 10 }) {
    let q = 'SELECT * FROM contacts WHERE user_id = ?';
    const params = [userId];
    if (tag) {
      q += ' AND JSON_CONTAINS(tags, ?)';
      params.push(`"${tag}"`);
    }
    if (search) {
      q += ' AND (name LIKE ? OR phone LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    q += ' ORDER BY updated_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), (page - 1) * limit);

    const [rows] = await pool.query(q, params);
    return rows;
  }
  static async findById(id, userId) {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ? AND user_id = ?', [id, userId]);
    return rows[0];
  }
  static async update(id, userId, data) {
    const { name, email, phone, tags } = data;
    await pool.query(
      'UPDATE contacts SET name=?, email=?, phone=?, tags=?, updated_at=NOW() WHERE id=? AND user_id=?',
      [name, email, phone, JSON.stringify(tags), id, userId]
    );
  }
  static async delete(id, userId) {
    await pool.query('DELETE FROM contacts WHERE id = ? AND user_id = ?', [id, userId]);
  }
}
module.exports = Contact;