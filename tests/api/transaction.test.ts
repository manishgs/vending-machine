import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import app from '../../src/app';

chai.should();
chai.use(chaiHttp);

let server: Application;

describe('API', () => {
  before(async () => {
    server = await app();
  });

  it('should get 401 with invalid token for /api/products', (done) => {
    chai.request(server)
      .get('/api/products')
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer XXXX')
      .end((err, res) => {
        try {
          res.should.have.status(401);
          expect(res.body).to.include.keys('status', 'message');
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Token is not valid');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /api/products', (done) => {
    chai.request(server)
      .get('/api/products')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .end((err, res) => {
        try {
          res.should.have.status(200);
          expect(res.body).to.include.keys('status', 'data');
          expect(res.body.status).to.equal('OK');
          expect(res.body.data.length).to.equal(3);
          expect(res.body.data[0]).to.include.keys('id', 'name', 'price', 'quantity');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /api/balance', (done) => {
    chai.request(server)
      .get('/api/balance')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .end((err, res) => {
        try {
          res.should.have.status(200);
          expect(res.body).to.include.keys('status', 'data');
          expect(res.body.status).to.equal('OK');
          expect(res.body.data).to.include.keys('balance');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 400 with invalid request for /api/purchase', (done) => {
    chai.request(server)
      .post('/api/purchase')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .send({
        productId: 1,
        amount: 1,
      })
      .end((err, res) => {
        try {
          res.should.have.status(400);
          expect(res.body).to.include.keys('status', 'message');
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid request');
          //
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 422 with Not enough amount for /api/purchase', (done) => {
    chai.request(server)
      .post('/api/purchase')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .send({
        productId: 1,
        amount: { 1: 10 },
      })
      .end((err, res) => {
        try {
          res.should.have.status(422);
          expect(res.body).to.include.keys('status', 'message');
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Not enough amount');
          //
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 400 with invalid request for /api/purchase', (done) => {
    chai.request(server)
      .post('/api/purchase')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .send({
        productId: 1,
        amount: { 2: 100 },
      })
      .end((err, res) => {
        try {
          res.should.have.status(400);
          expect(res.body).to.include.keys('status', 'message');
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid request');
          //
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /api/purchase', (done) => {
    chai.request(server)
      .post('/api/purchase')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .send({
        productId: 1,
        amount: { 1: 100 },
      })
      .end((err, res) => {
        try {
          res.should.have.status(200);
          res.body.should.include.keys('status', 'data');
          expect(res.body.data.return).to.deep.equal({ 1: 80 });
          expect(res.body.data.receive).to.deep.equal({ 1: 100 });
          expect(res.body.data.type).to.equal('BUY');
          expect(res.body.data.quantity).to.equal(1);
          expect(res.body.data.price).to.equal(20);

          //
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('should get 200 for /api/refund', (done) => {
    chai.request(server)
      .post('/api/refund')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`)
      .send({
        productId: 1,
      })
      .end((err, res) => {
        try {
          res.should.have.status(200);
          expect(res.body).to.include.keys('status', 'data');
          expect(res.body.status).to.equal('OK');
          expect(res.body.data.return).to.deep.equal({ 1: 20 });
          expect(res.body.data.receive).to.deep.equal({});
          expect(res.body.data.type).to.equal('REFUND');
          expect(res.body.data.quantity).to.equal(1);
          expect(res.body.data.price).to.equal(20);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
