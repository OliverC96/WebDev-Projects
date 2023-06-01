const express = require("express");
const router = express.Router();

// Configuring the root/home route
router.get("/", (req, res) => {
    res.render("home");
});

module.exports = router;
