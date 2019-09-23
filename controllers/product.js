const ProductModel = require("../models/ProductModel");
const fs = require("fs");
const path = require("path");
/*
得到指定数组的分页信息对象
 */
function pageFilter(arr, pageNum, pageSize) {
  pageNum = pageNum * 1;
  pageSize = pageSize * 1;
  const total = arr.length;
  const pages = Math.floor((total + pageSize - 1) / pageSize);
  const start = pageSize * (pageNum - 1);
  const end = start + pageSize <= total ? start + pageSize : total;
  const list = [];
  for (var i = start; i < end; i++) {
    list.push(arr[i]);
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  };
}

class ProductController {
  static updateStatus(req, res) {
    const { productId, status } = req.body;
    ProductModel.findOneAndUpdate({ _id: productId }, { status })
      .then(oldProduct => {
        res.send({ status: 0 });
      })
      .catch(error => {
        console.error("更新产品状态异常", error);
        res.send({ status: 1, msg: "更新产品状态异常, 请重新尝试" });
      });
  }

  static add(req, res) {
    const product = req.body;
    ProductModel.create(product)
      .then(product => {
        res.send({ status: 0, data: product });
      })
      .catch(error => {
        console.error("添加产品异常", error);
        res.send({ status: 1, msg: "添加产品异常, 请重新尝试" });
      });
  }

  static list(req, res) {
    const { pageNum, pageSize } = req.query;
    ProductModel.find({})
      .then(products => {
        res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) });
      })
      .catch(error => {
        console.error("获取商品列表异常", error);
        res.send({ status: 1, msg: "获取商品列表异常, 请重新尝试" });
      });
  }

  static search(req, res) {
    const {
      pageNum,
      pageSize,
      searchName,
      productName,
      productDesc
    } = req.query;
    let contition = {};
    if (productName) {
      contition = { name: new RegExp(`^.*${productName}.*$`) };
    } else if (productDesc) {
      contition = { desc: new RegExp(`^.*${productDesc}.*$`) };
    }
    ProductModel.find(contition)
      .then(products => {
        res.send({ status: 0, data: pageFilter(products, pageNum, pageSize) });
      })
      .catch(error => {
        console.error("搜索商品列表异常", error);
        res.send({ status: 1, msg: "搜索商品列表异常, 请重新尝试" });
      });
  }

  static update(req, res) {
    const product = req.body;
    ProductModel.findOneAndUpdate({ _id: product._id }, product)
      .then(oldProduct => {
        res.send({ status: 0 });
      })
      .catch(error => {
        console.error("更新商品异常", error);
        res.send({ status: 1, msg: "更新商品名称异常, 请重新尝试" });
      });
  }

  static delete(req, res) {
    const { _id } = req.body;
    ProductModel.findByIdAndDelete(_id, (err, doc) => {
      if (err) {
        res.send({ status: 1, msg: "删除商品异常,请重新尝试" });
      } else if (!doc) {
        res.send({ status: 1, msg: "商品不存在" });
      } else {
        // 删除图片
        const { imgs } = doc;
        imgs.forEach(img_path => {
          const file_path = path.join(__dirname, "../public/upload", img_path);
          fs.stat(file_path, (err, stats) => {
            if (!err && stats) {
              fs.unlinkSync(file_path);
            }
          });
        });
        res.send({ status: 0 });
      }
    });
  }
}

module.exports = ProductController;
