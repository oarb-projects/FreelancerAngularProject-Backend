const express = require('express');
const router = express.Router(); 
const sellers=require("../controller/sellers.controller")
const properties=require("../controller/properties.controller")

router.get('/', (req, res) => {
    res.send('Hello Word');
});
router.get("/seed",sellers.init)
router.get("/seedProperty",properties.initProperties)

module.exports = router;