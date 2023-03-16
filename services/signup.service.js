const SignupRepository = require('../repositories/signup.repository');
const { ValidationError } = require('../exceptions/index.exception');

const Joi = require('joi');
const { isRegexValidation } = require('../helpers/regex.helper');

const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;

const userSchema = Joi.object({
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.string(),
});

class SignupService {
  constructor() {
  this.signupRepository = new SignupRepository();
  }

  createSignup = async (nickname, password, confirm) => {
    await userSchema.validate({ nickname, password, confirm });
    
    if (password !== confirm) {
      throw new ValidationError('패스워드 확인과 일치 하지 않습니다.');
    }
    if (nickname.search(re_nickname) === -1) {
      throw new ValidationError('유효하지 않은 닉네임 입니다.');
    }
    if (password.search(re_password) === -1) {
      throw new ValidationError('유효하지 않은 패스워드 입니다.');
    }
    if (isRegexValidation(password, nickname)) {
      throw new ValidationError('패스워드에 닉네임이 포함되어 있습니다.');
    }
  
    const existingUser = await this.signupRepository.findByNickname(nickname);
    if (existingUser.length) {
      throw new ValidationError('닉네임이 이미 사용중입니다.');
    }
  
    const user = await this.signupRepository.createUser(nickname, password);
    console.log(`${nickname} 님이 가입하셨습니다.`);
  
    return user;
  }
  
}

module.exports = SignupService;