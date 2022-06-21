import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import { before, after } from 'mocha';
import UserModel from '../database/models/UserModel';
import * as JWT from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;
const tokenJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjU1ODM2MzkzLCJleHAiOjE2NTY0NDExOTN9.iUaWvWt03xeGebiYMMdmx0E5AgCIXtLKTiHhvwoimlk';

describe('Testing route /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
      } as UserModel);

    sinon
      .stub(JWT, "sign")
      .resolves(tokenJWT);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
    (JWT.sign as sinon.SinonStub).restore();
  })

  it('login success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "secret_admin"
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Its not possible to login with wrong passwor', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "wdqdweqw"
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
});

describe('/login email does not exists', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(null);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('Its not possible to login with wrong inexistent email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "notnot@admin.com",
        password: "passwordf"
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });
});

