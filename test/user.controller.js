const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    // Bonus possible (non demandé)
    // it('avoid creating an existing user', (done) => {
    //   done()
    // })
  })

  describe('Get', () => {

    it('get a user by username', (done) => {
      // 1) Create user first
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      userController.create(user, (errCreate, resultCreate) => {
        expect(errCreate).to.be.equal(null)
        expect(resultCreate).to.be.equal('OK')

        // 2) Get user
        userController.get('sergkudinov', (errGet, resultGet) => {
          expect(errGet).to.be.equal(null)
          expect(resultGet).to.deep.equal({
            username: 'sergkudinov',
            firstname: 'Sergei',
            lastname: 'Kudinov'
          })
          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('does_not_exist', (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

  })
})
