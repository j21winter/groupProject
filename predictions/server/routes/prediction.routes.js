const PredictionController = require('../controllers/predictions.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    
    // PROTECTED ROUTES 
    // CREATE
    app.post('/api/predictions/new', authenticate, PredictionController.addPrediction)
    app.post('/api/predictions/new/many', authenticate, PredictionController.addMany)
    // READ
    app.get('/api/predictions', authenticate, PredictionController.findAllPredictions)
    app.get('/api/predictions/:id', authenticate, PredictionController.findPrediction)
    // UPDATE
    app.patch('/api/predictions/:id', authenticate, PredictionController.updatePrediction)
    // DELETE
    app.delete('/api/predictions/:id', authenticate, PredictionController.deletePrediction)
    
}