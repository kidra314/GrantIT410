/**
 * Created by Grant on 3/7/2016.
 */
var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/admin', function(req, res, next) {
    res.render('admin', { title: 'Agent Bishop | Admin' });
});

module.exports = router;