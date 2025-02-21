const db = require("../config/db");

class User {
  static createUser(email, password, callback) {
    const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(sql, [email, password], callback);
  }

  static findUserByEmail(email, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  }
}

module.exports = User;
