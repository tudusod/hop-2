const express = require('express');

const classRoute = express.Router();
const ClassModel = require('../models/class.schema');

classRoute.post('/class', async (req, res) => {
  const body = req.body;

  try {
    const response = await ClassModel.create({
      name: body.name,
      teachers: body.teachers,
      roomNumber: body.roomNumber
    });
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = classRoute;