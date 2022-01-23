import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import app from '../../src/app';

chai.should();
chai.use(chaiHttp);

let server: Application;

describe('APP', () => {
  before(async () => {
    server = await app();
  });

  it('should get 200 for /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        try {
          res.should.have.status(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /purchase', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        try {
          res.should.have.status(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /refund', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        try {
          res.should.have.status(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /balance', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        try {
          res.should.have.status(200);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 404 for /random', (done) => {
    chai.request(server)
      .get('/random')
      .end((err, res) => {
        try {
          res.should.have.status(404);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
