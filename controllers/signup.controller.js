const SignupService = require('../services/signup.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class SignupController {
  constructor() {
  this.signupService = new SignupService(); 
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/

  createSignup = async (req, res) => {
    try{
      const { nickname, password, confirm } = req.body;  
      if (!nickname || !password || !confirm) {
        throw new InvalidParamsError();
      }

      await this.signupService.createSignup(nickname, password, confirm);

      return res.status(201).send({ message: '회원 가입에 성공하였습니다.' });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400);
      res.json({ errorMessage: error.message });
    }
  }
}
module.exports = SignupController;