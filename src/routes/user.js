const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
    .post('/', (req, resp) => {
      userController.create(req.body, (err, res) => {
        let respObj
        if (err) {
          respObj = { status: "error", msg: err.message }
          return resp.status(400).json(respObj)
        }
        respObj = { status: "success", msg: res }
        return resp.status(201).json(respObj)
      })
    })

    .get('/:username', (req, resp) => {
      const username = req.params.username

      userController.get(username, (err, user) => {
        let respObj

        if (err) {
          respObj = { status: "error", msg: err.message }
          return resp.status(400).json(respObj)
        }

        if (!user) {
          respObj = { status: "error", msg: "User not found" }
          return resp.status(404).json(respObj)
        }

        // Success: return user object
        return resp.status(200).json(user)
      })
    })

module.exports = userRouter
