const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Verificar si el usuario ya existe
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    // Crear nuevo usuario
    user = new User({
      email,
      password,
      name
    });
    
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Crear y devolver el token JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    // Crear y devolver el token JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};