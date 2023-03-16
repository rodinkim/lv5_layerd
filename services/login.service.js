const LoginRepository = require('../repositories/login.repository');
const { ValidationError } = require('../exceptions/index.exception');
const jwt = require('jsonwebtoken');


class LoginService {
  constructor() {
    this.loginRepository = new LoginRepository();
  }
  createLogin = async (nickname, password) => {
    
    const user = await this.loginRepository.findByNicknameAndPassword(nickname, password);
    if (!user) {
        throw new ValidationError('닉네임 또는 패스워드를 확인해주세요.');
    }

    return user;
  }

  generateToken(userId){
    

    const token = jwt.sign(
      { userId },
      'Secret Key',
      { expiresIn: '1h' },
    );
  
    return token;
  }
}

module.exports = LoginService;