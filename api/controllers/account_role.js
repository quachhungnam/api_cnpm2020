const mongoose = require("mongoose");
const Role = require("../models/role.model");
const Account = require("../models/account");
const AccountRole = require("../models/AccountRole.model");

exports.get_all = (req, res, next) => {
  var AccountRole_list = [];
  var role_list = [];

  AccountRole.aggregate([
    {
      $lookup: {
        from: "accounts",
        localField: "account_id",
        foreignField: "_id",
        as: "accounts",
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "role_id",
        foreignField: "_id",
        as: "roles",
      },
    },
  ])
    .exec()
    .then((result) => {
      return res.status(200).send(result);
    });
};

exports.get_by_id = (req, res, next) => {
  const account_role_id = req.params.accountroleid;
  Role.findOne({ _id: account_role_id })
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
  var newAccountRole = new Role();
  newAccountRole.account_id = input.accountid;
  newAccountRole.role_id = input.roleid;
  newAccountRole._id = new mongoose.Types.ObjectId();
  newRole
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        success: true,
        message: "Account_Role created",
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
  const account_role_id = req.params.accountroleid;

  var account_role = new AccountRole();

  AccountRole.findOne({ _id: account_role_id })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(400).send();
      }
      role = data;
      return AccountRoleRole.deleteOne({ _id: role_id }).exec();
    })
    .then(() => {
      return res.status(200).send(role);
    })
    .catch((err) => {
      return res.status(400).send();
    });
};
