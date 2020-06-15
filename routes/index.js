const express = require('express');
const router = express.Router(); 
const sellers=require("../controller/sellers.controller")
router.get('/', (req, res) => {
    res.send('Hello Word');
});
router.get("/seed",sellers.init)

module.exports = router;