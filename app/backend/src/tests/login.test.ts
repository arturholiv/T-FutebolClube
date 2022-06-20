import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import {
    CORRECT_DATA,
    NO_EMAIL,
    INCORRECT_EMAIL
} from '../utils/mocks/mocks.login';

import Users from '../database/models/UserModel';

        describe.only('Testing route Login', () => {
            let chaiHttpResponse: Response;
            it('Tests if return status 200 when its ok', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send(CORRECT_DATA)
                expect(chaiHttpResponse.status).to.equal(200);
            });

            it('Incrorrect Email on body', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send(INCORRECT_EMAIL)
                expect(chaiHttpResponse.status).to.equal(401);
            });

            it('expects a string type message', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send(INCORRECT_EMAIL)
                expect(chaiHttpResponse.text).to.a('string');
            });

            it('expects a message "Incorrect email or password"', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send(INCORRECT_EMAIL)
                expect(chaiHttpResponse.text).to.include('Incorrect email or password');
            });

            it('tests if status 400 whithout email in the body', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send(NO_EMAIL)
                expect(chaiHttpResponse.status).to.be.equal(400);
            });


            it('Testa se o METHOD é POST qdo omitir o email no corpo da requisicao ', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send(NO_EMAIL)
                expect(chaiHttpResponse.text).to.be.eql('{"message":"All fields must be filled"}');
            });

            it('Testa se o METHOD é POST qdo omite-se o password no corpo da requisicao ', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send({
                        "email": "admin@admin.com"
                    })
                expect(chaiHttpResponse.text).to.be.eql('{"message":"All fields must be filled"}');
            });

            it('Testando rota /login/validate', async () => {
                chaiHttpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send({
                        "email": "admin@admin.com",
                        "password": "secret_admin"
                    })

                chaiHttpResponse = await chai
                    .request(app)
                    .get('/login/validate')
                    .set('authorization', chaiHttpResponse.body.token)

                expect(chaiHttpResponse.status).to.be.eql(200);

            });
        });