var express = require('express');
var router = express.Router();
let userModel = require('../schemas/users');

async function toggleStatus(req, res, statusValue) {
  let email = req.body.email;
  let username = req.body.username;

  if (!email || !username) {
    return res.status(400).send({
      message: 'EMAIL AND USERNAME ARE REQUIRED'
    });
  }

  let user = await userModel.findOne({
    isDeleted: false,
    email: email,
    username: username
  });

  if (!user) {
    return res.status(404).send({
      message: 'USER NOT FOUND'
    });
  }

  user.status = statusValue;
  await user.save();

  user = await userModel.findById(user._id).populate({
    path: 'role',
    select: 'name description'
  });

  return res.send(user);
}

router.post('/enable', async function (req, res) {
  try {
    return await toggleStatus(req, res, true);
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
});

router.post('/disable', async function (req, res) {
  try {
    return await toggleStatus(req, res, false);
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
});

module.exports = router;
