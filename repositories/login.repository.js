const { Users } = require('../models');
const { Op } = require('sequelize');

class LoginRepository extends Users{
  constructor() {
    super();
  }
  
  async findByNicknameAndPassword(nickname, password) {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ nickname }, { password }],
      },
    });

    return user;
  }
}

module.exports = LoginRepository;