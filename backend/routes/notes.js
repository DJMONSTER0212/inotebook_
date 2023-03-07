const express = require("express")
const router = express.Router();

router.get('/',(req,res)=>{
    obj  = {
        a:'aoiuf',
        number:219
    }
    res.json(obj)
})

module.exports = router