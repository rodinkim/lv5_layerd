const LoginService = require('../services/login.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LoginController {
  constructor() {
    this.loginService = new LoginService(); 
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  
  createLogin = async (req, res, next) => {
    try{
      const { nickname, password } = req.body;
      
      if (!nickname || !password ) {
        throw new InvalidParamsError();
      }

      const user = await this.loginService.createLogin(nickname, password);
      
      const userId = user.userId

      const token = await this.loginService.generateToken(userId);
      
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      res.cookie('middleProjectCookie', `Bearer ${token}`, {
        expires: expires, // cookie의 만료시간 설정
      });

      return res.status(200).json({ token });
      
      } catch (error) {
        next(error);
      }
    }
  }

module.exports = LoginController;
