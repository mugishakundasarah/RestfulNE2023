const router = require("express").Router()
const authRoutes = require("./auth.controller")

router.use("/auth", authRoutes)

module.exports = router

