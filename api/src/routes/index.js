const { Router } = require('express');
const career = require("./career");
const students = require("./students");
const administrative = require("./administrative");
const quarter = require("./quarter");
const teacher = require("./teacher");
const user = require("./user");

const router = Router();



router.use("/students", students);
router.use("/administrative", administrative);
router.use("/career", career);
router.use("/quarter",quarter);
router.use("/teacher", teacher);
router.use("/user", user);

module.exports = router;