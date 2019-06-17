const CategoryModel = require("../models/category")

class Category {
  /**
   * 创建分类
   */
  static async create(ctx) {
    let {name, icon, parent_id, z_index} = ctx.request.body;

    let params = { name, icon, parent_id, z_index }

    params.z_index = z_index || "1";
    params.parent_id = parent_id || 0;

    let errors = [];

    for (let item in params) {
      if (params[item] === undefined) {
        let index = errors.length + 1;
        errors.push("错误" + index + ": 参数: " + item + "不能为空")
      }
    }

    if (errors.length > 0) {
      ctx.response.status = 200;
      ctx.body = {
        code: 412,
        message: errors
      }
      return false;
    } 

    try {
      
      await CategoryModel.create(params);
      
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "创建分类成功"
      }
    } catch(err) {

       ctx.response.status = 200;
       ctx.body = {
         code: 500,
         message: "创建分类失败"
       }
    }
  }
  /**
   * 获取分类列表
   *
   */
  static async list(ctx) {
    
    try {
      let data = await CategoryModel.list();

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: `获取分类列表成功！`,
        data
      }
    } catch(err) {
       ctx.response.status = 500;
       ctx.body = {
         code: 500,
         message: `获取分类列表失败`,
         data: err
       }
    }
  }
  /**
   * 删除分类
   *
   */
  static async delete(ctx) {
    let { id } = ctx.params;
    if(!id) {
      ctx.response.status = 200
      ctx.body = {
        code: 412,
        message: "请传入正确的ID"
      }
      return false
    }

    try {
      let detail = await CategoryModel.detail(id)
      if (!detail) {
        ctx.response.status = 200
        ctx.body = {
          code: 412,
          message: "请传入正确的ID"
        }
        return false
      }
     
      await CategoryModel.delete(id)
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        message: "删除成功"
      }
    } catch(err) {
        ctx.response.status = 200
        ctx.body = {
          code: 500,
          message: "删除失败",
          data: err
        }
    }
  }
  /**
   * 获取分类详情
   */
  static async detail(ctx) {
    let {id} = ctx.params

    if(!id) {
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        message: "ID不能为空"
      }
      return false
    }

    try {
      let data = await CategoryModel.detail(id)
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        message: "查询成功",
        data
      }
    } catch (err) {
      ctx.response.status = 200
      ctx.body = {
        code: 500,
        message: "获取详情失败",
        data: err
      }
    }
  }
  /**
   * 更新分类
   */
  static async update(ctx) {
    let {id} = ctx.params

    if (!id) {
      ctx.response.status = 200
      ctx.body = {
        code: 412,
        message: "ID不能为空"
      }
      return false
    }

    if(isNaN(id)) {
      ctx.response.status = 200
      ctx.body = {
        code: 412,
        message: "请传入正确的ID"
      }
      return false
    }

    let { name, icon, parent_id, z_index = 1} = ctx.request.body
    let params = {
      name,
      icon,
      parent_id,
      z_index
    }

    try {
      
      await CategoryModel.update(id, params)
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        message: "更新分类成功"
      }
    } catch (err) {
      ctx.response.status = 200
      ctx.body = {
        code: 500,
        message: "更新分类失败",
        data: err
      }
    }


  }
}

module.exports = Category