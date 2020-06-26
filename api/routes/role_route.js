const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const RoleController = require("../controllers/role");
const PermissionController = require("../controllers/permission");
const AccountRoleController = require("../controllers/account_role");
const RolePermissionController = require("../controllers/role_permission");


router.get("/", RoleController.get_all);
router.get("/:roleid", RoleController.get_by_id);
router.post("/", RoleController.create);
router.delete("/:roleid", RoleController.delete_by_id);

router.get('/and/permission', PermissionController.get_all);
router.get("/and/permission/:permissionid", PermissionController.get_by_id);
router.post("/and/permission", PermissionController.create);
router.delete("/and/permission/:permissionid", PermissionController.delete_by_id);

router.get("/and/accountrole", AccountRoleController.get_all);
router.get("/and/accountrole/:accountroleid", AccountRoleController.get_by_id);
router.post("/and/accountrole", AccountRoleController.create);
router.delete("/and/accountrole/:accountroleid", AccountRoleController.delete_by_id);

router.get("/and/rolepermission", RolePermissionController.get_all);
router.get("/and/rolepermission/:permissionid", RolePermissionController.get_by_id);
router.post("/and/rolepermission/", RolePermissionController.create);
router.delete("/and/rolepermission/:permissionid", RolePermissionController.delete_by_id);

module.exports = router;
