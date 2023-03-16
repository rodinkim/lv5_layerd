const { Users } = require('../models');

class SignupRepository extends Users{
  constructor() {
    super();
  }

  findByNickname = async (nickname) => {
    const user = await Users.findAll({
      attributes: ['userId'],
      where: { nickname },
    });
    return user;
  }

  createUser = async (nickname, password) => {
    const user = await Users.create({ nickname, password});
    return user;
  }
}

module.exports = SignupRepository;