const CategoryModel = require("../models/CategoryModel");

class CategoryController {
  static add(req, res) {
    const { categoryName, parentId } = req.body;
    CategoryModel.create({ name: categoryName, parentId: parentId || "0" })
      .then(category => {
        res.send({ status: 0, data: category });
      })
      .catch(error => {
        console.error("添加分类异常", error);
        res.send({ status: 1, msg: "添加分类异常, 请重新尝试" });
      });
  }

  static list(req, res) {
    const parentId = req.query.parentId || "0";
    CategoryModel.find({ parentId })
      .then(categorys => {
        res.send({ status: 0, data: categorys });
      })
      .catch(error => {
        console.error("获取分类列表异常", error);
        res.send({ status: 1, msg: "获取分类列表异常, 请重新尝试" });
      });
  }

  static update(req, res) {
    const { categoryId, categoryName } = req.body;
    CategoryModel.findOneAndUpdate({ _id: categoryId }, { name: categoryName })
      .then(oldCategory => {
        res.send({ status: 0 });
      })
      .catch(error => {
        console.error("更新分类名称异常", error);
        res.send({ status: 1, msg: "更新分类名称异常, 请重新尝试" });
      });
  }

  static info(req, res) {
    const categoryId = req.query.categoryId;
    CategoryModel.findOne({ _id: categoryId })
      .then(category => {
        res.send({ status: 0, data: category });
      })
      .catch(error => {
        console.error("获取分类信息异常", error);
        res.send({ status: 1, msg: "获取分类信息异常, 请重新尝试" });
      });
  }
}

module.exports = CategoryController;
