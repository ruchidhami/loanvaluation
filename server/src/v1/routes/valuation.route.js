const express = require('express'),
  router = express.Router();

const multiparty = require('connect-multiparty'),
  multipartyMiddleware = multiparty();

const ValuationController = require('../controllers/valuation.controller');

router.post('/valuation', ValuationController.createValuation);

router.patch('/valuation/:id', ValuationController.updateValuation);

router.delete('/valuation/:id', ValuationController.deleteValuation);

router.get('/valuation',ValuationController.fetchAll);

router.get('/valuation/:id',ValuationController.fetch);

router.patch('/upload/:id', multipartyMiddleware, ValuationController.upload);


module.exports = router;