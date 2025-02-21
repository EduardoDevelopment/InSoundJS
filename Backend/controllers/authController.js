const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  User.findUserByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    User.createUser(email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ message: "Error al registrar usuario" });

      res.json({ message: "Usuario registrado con éxito" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  User.findUserByEmail(email, (err, results) => {
    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secreto", { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token });
  });
};
