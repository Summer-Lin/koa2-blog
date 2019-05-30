const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user.js')

User.sync({force: false})


class UserModel {
    /**
     * 创建用户
     *
     * @param   user
     *
     * @return  boolean
     */
    /**
     * 创建用户
     *
     * @param   {[Object]}  user  
     *
     * @return  {[Boolean]} 
     */
    static async create(user) {
      let {username, password, email} = user;
      
      await User.create({
        username,
        password,
        email
      }) 

      return true
    }
    /**
     * 根据用户名查询用户信息
     *
     * @param   {[String]}  username  姓名
     *
     * @return  
     */
    static async queryUsername(username) {
       return await User.findOne({
         where: {
           username
         }
       })
    }
}

module.exports = UserModel