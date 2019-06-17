const db = require("../config/db")
const Sequelize = db.sequelize;
const Category = Sequelize.import('../schema/category.js');

Category.sync({
  force: false
});

class CategoryModel {
  /**
   * 创建分类
   *
   */
  static async create (data) {
    return await Category.create(data)
  }
  /**
   * 获取分类列表
   */
  static async list() {
    return await Category.findAll({
      attributes: ['id', 'name', 'parent_id', 'icon', 'z_index']
    })
  }
  /**
   * 删除分类
   */
  static async delete(id){
    await Category.destroy({
      where: {
        id,
      }
    })
    return true
  }
  /**
   * 获取分类详情
   */
  static async detail(id) {
    return await Category.findOne({
      where: {
        id
      }
    })
  }
  /**
   * 更新分类数据
   */
  static async update(id, data) {
    await Category.update(data, {
      where: {
        id
      },
      fields: ['name', 'parent_id', 'icon', 'z_index']
    })
    return true
  }
  

}

module.exports = CategoryModel
