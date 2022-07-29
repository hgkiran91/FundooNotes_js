import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let jwtToken;
let noteId;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Post /new user registration', () => {
    it('given new user when added should return status 201', (done) => {
      const userCredentials = {
        firstName: "Naveen",
        lastName: "Baradwaj",
        email: "naveen@gmail.com",
        password: "naveenb1234"
      };
      request(app)
        .post('/api/v1/users')
        .send(userCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
    it('given new user when added should return status 400', (done) => {
      const userCredentials = {
        firstName: 78685,
        lastName: "Baradwaj",
        email: "naveen@gmail.com",
        password: "naveenb1234"
      };
      request(app)
        .post('/api/v1/users')
        .send(userCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });
  describe('POST /login', () => {
    it('given when user login should return status 200', (done) => {
      const userCredentials = {
        email: "naveen@gmail.com",
        password: "naveenb1234"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userCredentials)
        .end((err, res) => {
          jwtToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });

    it('given when user not login should return status 400', (done) => {
      const userCredentials = {
        email: "naveen12@gmail.com",
        password: "naveenb1234"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });

  describe('Post /new note', () => {
    it('given new note when added should return status 201', (done) => {
      const notedetails = {
        Title: "Mocha",
        Descreption: "Mocha is a js framework for Node.js"
      };
      request(app)
        .post('/api/v1/notes')
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          noteId = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
    it('given new note when not added should return status 400', (done) => {
      const notedetails = {
        Title: 89676,
        Descreption: "Mocha is js framework for Node.js"
      }
      request(app)
        .post('/api/v1/notes')
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
  });

  describe('Get /get all note', () => {
    it('given all note when called should return status 201', (done) => {
      const notedetails = {
        // Title: "Mocha",
        // Descreption: "Mocha is a js framework for Node.js"
      };
      request(app)
        .get('/api/v1/notes/')
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
    it('given all note when not called should return status 400', (done) => {
      const notedetails = {
        // Title: "Mocha",
        // Descreption: "Mocha is a js framework for Node.js"
      };
      request(app)
        .get('/api/v1/notes/')
        // .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });
  describe('Get /get single note', () => {
    it('given single note when called should return status 201', (done) => {
      const notedetails = {
        // Title: "Mocha",
        // Descreption: "Mocha is a js framework for Node.js"
      };
      request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
    it('given single note when not called should return status 400', (done) => {
      const notedetails = {
        Title: "Mocha",
        Descreption: "Mocha is a js framework for Node.js"
      };
      request(app)
        .get(`/api/v1/notes/${noteId}`)
        // .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });
  describe('Put /update note', () => {
    it('given note when updated should return status 201', (done) => {
      const notedetails = {
        Title: "Chai",
        Descreption: "Chai is a assertion library for Node.js"
      };
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
    it('given note when not updated should return status 400', (done) => {
      const notedetails = {
        Title: 89676,
        Descreption: "Mocha is js framework for Node.js"
      }
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        // .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });

  describe('Delet /delete note', () => {
    it('given note when deleted should return status 201', (done) => {
      const notedetails = {
        // Title: "Chai",
        // Descreption: "Chai is a assertion library for Node.js"
      };
      request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
    it('given note when not deleted should return status 400', (done) => {
      const notedetails = {
        // Title: 89676,
        // Descreption: "Mocha is js framework for Node.js"
      }
      request(app)
        .delete(`/api/v1/notes/${noteId}`)
        // .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });

  describe('IsArchive /isArchive note', () => {
    it('given note when archived should return status 201', (done) => {
      const notedetails = {
        // Title: "Chai",
        // Descreption: "Chai is a assertion library for Node.js"
      };
      request(app)
        .put(`/api/v1/notes/${noteId}/isarchive`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
    it('given note when not archived should return status 400', (done) => {
      const notedetails = {
        // Title: 89676,
        // Descreption: "Mocha is js framework for Node.js"
      }
      request(app)
        .put(`/api/v1/notes/${noteId}/isarchive`)
        // .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });

  describe('IsTrash /isTrash note', () => {
    it('given note when moved to trash should return status 201', (done) => {
      const notedetails = {
        // Title: "Chai",
        // Descreption: "Chai is a assertion library for Node.js"
      };
      request(app)
        .put(`/api/v1/notes/${noteId}/isTrash`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
    it('given note when not moved to trash should return status 400', (done) => {
      const notedetails = {
        // Title: 89676,
        // Descreption: "Mocha is js framework for Node.js"
      }
      request(app)
        .put(`/api/v1/notes/${noteId}/isTrash`)
        // .set("Authorization", `Bearer ${jwtToken}`)
        .send(notedetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.UNAUTHORIZED);
          done();
        });
    });
  });
})