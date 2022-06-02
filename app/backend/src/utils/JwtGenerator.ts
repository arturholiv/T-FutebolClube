import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import fs from 'fs/promises';

class JWTGenerator {
  private _SECRET: Secret;
  private _jwtConfig: SignOptions;
  private _secretPath = '../../jwt.evaluation.key';

  constructor() {
    this._jwtConfig = {
      expiresIn: '60 min',
      algorithm: 'HS256',
    };
    fs.readFile(this._secretPath, 'utf8').then((secret: Secret) => {
      this._SECRET = secret;
    });
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
