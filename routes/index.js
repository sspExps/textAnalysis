var express = require('express');
var router = express.Router();
var api = require("../controllers");
/* Home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Analytics'
    });
});
router.post("/result", function(req, res, next) {
    if (!req.body.tRawtextUrl) {
        var data = api.scrapUrl(res);
    }else{
        var data = api.scrapText(res, req.body.tRawtextUrl);
    }
});

module.exports = router;
