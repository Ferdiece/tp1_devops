const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },

  get: (username, callback) => {
    // Check parameters
    if (!username)
      return callback(new Error("Wrong user parameters"), null)

    db.hgetall(username, (err, userObj) => {
      if (err) return callback(err, null)

      // Redis returns null if key does not exist
      if (!userObj) return callback(null, null)

      const user = {
        username: username,
        firstname: userObj.firstname,
        lastname: userObj.lastname,
      }

      return callback(null, user)
    })
  }
}
