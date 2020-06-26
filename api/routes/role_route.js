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

router.get("/permission", PermissionController.get_all);
router.get("/permission/:permissionid", PermissionController.get_by_id);
router.post("/permission/", PermissionController.create);
router.delete("/permission/:permissionid", PermissionController.delete_by_id);

router.get("/accountrole", AccountRoleController.get_all);
router.get("/accountrole/:accountroleid", AccountRoleController.get_by_id);
router.post("/accountrole/", AccountRoleController.create);
router.delete("/accountrole/:accountroleid", AccountRoleController.delete_by_id);

router.get("/rolepermission", RolePermissionController.get_all);
router.get("/rolepermission/:permissionid", RolePermissionController.get_by_id);
router.post("/rolepermission/", RolePermissionController.create);
router.delete("/rolepermission/:permissionid", RolePermissionController.delete_by_id);

module.exports = router;
