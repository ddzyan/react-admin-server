const express = require("express");

const RoleController = require("../controllers/role");
const router = express.Router();
// 添加角色
router.post("/manage/role/add", RoleController.add);

// 获取角色列表
router.get("/manage/role/list", RoleController.list);

// 更新角色(设置权限)
router.post("/manage/role/update", RoleController.update);
module.exports = router;
