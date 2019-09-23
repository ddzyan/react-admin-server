const express = require("express");

const CategoryController = require("../controllers/category");
const router = express.Router();

// 添加分类
router.post("/add", CategoryController.add);

// 获取分类列表
router.get("/list", CategoryController.list);

// 更新分类名称
router.post("/update", CategoryController.update);

// 根据分类ID获取分类
router.get("/info", CategoryController.info);

module.exports = router;
