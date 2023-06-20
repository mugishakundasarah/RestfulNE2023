const router = require("express").Router()
const { authenticate } = require("../utils/AuthenticateToken")
const authRoutes = require("./auth.controller")
const employeeRoutes = require("./employee.controller")

router.use("/auth", authRoutes)
router.use('/employees', authenticate, employeeRoutes)

module.exports = router

