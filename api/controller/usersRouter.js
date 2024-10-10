const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    try {
      console.log('Attempting to create user with email:', email);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      console.log('User created successfully:', newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('plainTextPassword:', password);
    console.log('user.password ::', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
