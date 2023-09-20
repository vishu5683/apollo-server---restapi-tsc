import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.use(bodyParser.json());

// Welcome message for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the REST API!');
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`REST API is running on port ${port}`);
});
