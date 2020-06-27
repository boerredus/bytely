const router = require('express').Router();

// Importing controllers
const URLController = require('../controllers/URLController');

// Setting routes
router.get('/', URLController.add);
router.post('/', URLController.addAction);

router.get('/:hash', URLController.url);

module.exports = router;
