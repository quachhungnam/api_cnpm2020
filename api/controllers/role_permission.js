const mongoose = require("mongoose");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const RolePermission = require("../models/role_permission.model");

exports.get_all = (req, res, next) => {
  var role_permission_list = [];
  var role_list = [];

  RolePermission.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "role_id",
        foreignField: "_id",
        as: "roles",
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "permission_id",
        foreignField: "_id",
        as: "permissions",
      },
    },
  ])
    .exec()
    .then((result) => {
      return res.status(200).send(result);
    });
};

exports.get_by_id = (req, res, next) => {
  const role_permission_id = req.params.rolepermissionid;
  Role.findOne({ _id: role_permission_id })
    .exec()
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(400).send();
    });
};

exports.create = (req, res, next) => {
  const input = req.body;
  var newRolePermission = new RolePermission();
  newRolePermission.role_id = input.roleid;
  newRolePermission.permission_id = input.roleid;
  newRolePermission._id = new mongoose.Types.ObjectId();
  newRolePermission
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        success: true,
        message: "Role_Permission created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err,
      });
    });
};

exports.delete_by_id = (req, res, next) => {
  const role_permission_id = req.params.rolepermissionid;

  var role_permission = new RolePermission();

  RolePermission.findOne({ _id: role_permission_id })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(400).send();
      }
      role_permission = data;
      return RolePermission.deleteOne({ _id: role_permission_id }).exec();
    })
    .then(() => {
      return res.status(200).send(role_permission);
    })
    .catch((err) => {
      return res.status(400).send();
    });
};
