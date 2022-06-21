import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Secret, SignOptions } from 'jsonwebtoken';

class JWTGenerator {
  private _SECRET: Secret;
  private _jwtConfig: SignOptions;

  constructor() {
    this._jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    this._SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
  }

  public generateToken(email: string, password: string): string {
    const data = {
      email,
      password,
    };
    const token = jwt.sign(data, this._SECRET, this._jwtConfig);
    return token;
  }
}

export default JWTGenerator;
