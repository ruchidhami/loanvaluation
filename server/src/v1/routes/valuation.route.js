const express = require('express'),
  router = express.Router();
const Multer = require('multer');

const ValuationController = require('../controllers/valuation.controller');

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post('/valuation', ValuationController.createValuation);

router.patch('/valuation/:id', ValuationController.updateValuation);

router.delete('/valuation/:id', ValuationController.deleteValuation);

router.get('/valuation',ValuationController.fetchAll);

router.get('/valuation/:id',ValuationController.fetch);

router.patch('/upload/:id', multer.single('image'), ValuationController.upload);


module.exports = router;