const express = require("express");
const fs = require("fs");
const path = require("path");

const ProductController = require("../controllers/product");
const router = express.Router();

// 更新产品状态(上架/下架)
router.post("/updateStatus", ProductController.updateStatus);

// 添加产品
router.post("/add", ProductController.add);

// 获取产品分页列表
router.get("/list", ProductController.list);

// 搜索产品列表
router.get("/search", ProductController.search);

// 更新产品
router.post("/update", ProductController.update);

// 删除产品
router.post("/delete", ProductController.delete);

module.exports = router;
