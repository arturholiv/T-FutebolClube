import { Response, Request, NextFunction } from 'express';

export default class LoginMiddleware {
  private _email: string;
  private _password: string;

  verifyEmail(req: Request, res: Response, next: NextFunction): void | Response {
    const { email } = req.body;
    this._email = email;

    if (!email || !email.includes('@') || !email.endsWith('.com')) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  verifyPassword(req: Request, res: Response, next: NextFunction): void | Response {
    const { password } = req.body;

    this._password = password;

    if (this._password.length < 6) {
      return res.status(401).json({ message: 'password length must be greatter than 6' });
    }
    next();
  }
}
