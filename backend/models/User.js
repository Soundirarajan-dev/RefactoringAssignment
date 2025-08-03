const database = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.is_active = data.is_active !== undefined ? data.is_active : true;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  static async findAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const users = await database.query(
      'SELECT * FROM users WHERE is_active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    
    const totalResult = await database.get('SELECT COUNT(*) as count FROM users WHERE is_active = 1');
    const total = totalResult.count;

    return {
      users: users.map(user => new User(user).toJSON()),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async findById(id) {
    const user = await database.get('SELECT * FROM users WHERE id = ? AND is_active = 1', [id]);
    return user ? new User(user) : null;
  }

  static async findByEmail(email) {
    const user = await database.get('SELECT * FROM users WHERE email = ? AND is_active = 1', [email]);
    return user ? new User(user) : null;
  }

  static async create(userData) {
    const { name, email, password } = userData;
    
    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const password_hash = await this.hashPassword(password);
    
    const result = await database.run(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );

    return await this.findById(result.id);
  }

  static async update(id, userData) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updates = [];
    const values = [];

    if (userData.name) {
      updates.push('name = ?');
      values.push(userData.name);
    }

    if (userData.email) {
      // Check if email is taken by another user
      const existingUser = await database.get(
        'SELECT id FROM users WHERE email = ? AND id != ? AND is_active = 1',
        [userData.email, id]
      );
      if (existingUser) {
        throw new Error('Email is already taken');
      }
      updates.push('email = ?');
      values.push(userData.email);
    }

    if (userData.password) {
      const password_hash = await this.hashPassword(userData.password);
      updates.push('password_hash = ?');
      values.push(password_hash);
    }

    if (updates.length === 0) {
      return user;
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await database.run(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return await this.findById(id);
  }

  static async delete(id) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Soft delete
    await database.run(
      'UPDATE users SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    return true;
  }

  static async search(name, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const searchTerm = `%${name}%`;
    
    const users = await database.query(
      'SELECT * FROM users WHERE name LIKE ? AND is_active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [searchTerm, limit, offset]
    );

    const totalResult = await database.get(
      'SELECT COUNT(*) as count FROM users WHERE name LIKE ? AND is_active = 1',
      [searchTerm]
    );
    const total = totalResult.count;

    return {
      users: users.map(user => new User(user).toJSON()),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      searchTerm: name
    };
  }

  async checkPassword(password) {
    return await User.comparePassword(password, this.password_hash);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      is_active: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = User;
