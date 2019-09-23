const RoleModel = require("../models/RoleModel");

class RoleController {
  static add(req, res) {
    const { roleName } = req.body;
    RoleModel.create({ name: roleName })
      .then(role => {
        res.send({ status: 0, data: role });
      })
      .catch(error => {
        console.error("添加角色异常", error);
        res.send({ status: 1, msg: "添加角色异常, 请重新尝试" });
      });
  }

  static list(req, res) {
    RoleModel.find()
      .then(roles => {
        res.send({ status: 0, data: roles });
      })
      .catch(error => {
        console.error("获取角色列表异常", error);
        res.send({ status: 1, msg: "获取角色列表异常, 请重新尝试" });
      });
  }

  static update(req, res) {
    const role = req.body;
    role.auth_time = Date.now();
    RoleModel.findOneAndUpdate({ _id: role._id }, role)
      .then(oldRole => {
        // console.log('---', oldRole._doc)
        res.send({ status: 0, data: { ...oldRole._doc, ...role } });
      })
      .catch(error => {
        console.error("更新角色异常", error);
        res.send({ status: 1, msg: "更新角色异常, 请重新尝试" });
      });
  }
}

module.exports = RoleController;
