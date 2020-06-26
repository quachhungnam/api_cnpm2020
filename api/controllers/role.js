const mongoose = require("mongoose");
const Role = require('../models/role.model');

exports.get_all = (req, res, next) => {
  Role.find().exec()
    .then((data) => {
      let roleList = data.map((p) => {
        return p;
      })
      return res.status(200).send({ roles: roleList });
    })
    .catch((err) => {
      return res.status(400).send();
    })
}

exports.get_by_id = (req, res, next) => {
  const role_id = req.params.roleid;
  Role.findOne({ _id: role_id }).exec()
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(400).send();
    })
}

exports.create = (req, res, next) => {
  const input = req.body;
  var newRole = new Role();
  newRole.name = input.name;
  newRole._id = new mongoose.Types.ObjectId;
  newRole.save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        success: true,
        message: "Role created",
      })
    })
    .catch ((err) => {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
      });
    });
}

exports.delete_by_id = (req, res, next) => {
  const role_id = req.params.roleid;

  var role = new Role();

  Role.findOne({ _id: role_id }).exec()
    .then((data) => {
      if (!data) {
        return res.status(400).send();
      }
      role = data;
      return Role.deleteOne({ _id: role_id }).exec()
    })
    .then(() => {
      return res.status(200).send(role);
    })
    .catch((err) => {
      return res.status(400).send();
    })
}