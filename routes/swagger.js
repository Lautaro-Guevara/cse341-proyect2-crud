const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/', swaggerUI.serve);
router.get('/', (req, res, next) => {
	const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
	const document = {
		...swaggerDocument,
		host: req.get('host'),
		schemes: [protocol]
	};

	return swaggerUI.setup(document)(req, res, next);
});

module.exports = router;