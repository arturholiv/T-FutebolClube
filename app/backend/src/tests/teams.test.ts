import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { before, after } from 'mocha';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;
const teams = [
	{
		id: 1,
		teamName: 'Avaí/Kindermann',
	},
	{
		id: 2,
		teamName: 'Bahia',
	},
	{
		id: 3,
		teamName: 'Botafogo',
	},
];

const team = {
		id: 1,
		teamName: 'Avaí/Kindermann',
	};

describe('/teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('returns all teams correctly', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    expect(chaiHttpResponse.body).to.eql(teams);

  });
});

describe('/teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(team as Team);
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('returns a team searching by its own id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
    expect(chaiHttpResponse.body).to.eql(team);

  });
});