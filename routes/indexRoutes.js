//*********************
// Require Statements
//*********************
const express = require('express');
const router = express.Router();

//*********************
// Routes
//*********************
router.get("/", (req, res) => {
    //#swagger.tags = ['Index']
    res.send("Hello, World!");
});


//*********************
// Export Router
//*********************
module.exports = router;