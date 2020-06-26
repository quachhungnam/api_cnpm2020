const mongoose = require("mongoose");
const Permisson = require('../models/permission.model');

exports.get_all = (req, res, next) => {
  Permisson.find().exec()
    .then((data) => {
      let perList = data.map((p) => {
        return p;
      })
      return res.status(200).send({ permissions: perList });
    })
    .catch((err) => {
      return res.status(400).send();
    })
}

exports.get_by_id = (req, res, next) => {
  const permission_id = req.params.permissionid;
  Permisson.findOne({ _id: permission_id }).exec()
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
  console.log(input);
  var newPermission = new Permisson();
  newPermission.object = input.object;

  if ("create" in input) {
    newPermission._create = true;
  }
  else if ("read" in input) {
    newPermission._read = true;
  }
  else if ("update" in input) {
    newPermission._update = true;
  }
  else if ("delete" in input) {
    newPermission._delete = true;
  }
  newPermission._id = new mongoose.Types.ObjectId;
  newPermission.locked = false;
  newPermission.save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        success: true,
        message: "Permission created",
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
  const permission_id = req.params.permissionid;

  var per = new Permisson();

  Permisson.findOne({ _id: permission_id }).exec()
    .then((data) => {
      if (!data) {
        return res.status(400).send();
      }
      per = data;
      return Permisson.deleteOne({ _id: permission_id }).exec()
    })
    .then(() => {
      return res.status(200).send(per);
    })
    .catch((err) => {
      return res.status(400).send();
    })
}