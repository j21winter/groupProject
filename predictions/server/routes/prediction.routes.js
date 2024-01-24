const PredictionController = require('../controllers/predictions.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    
    // PROTECTED ROUTES 
    // CREATE
    app.post('api/prediction/new', authenticate, PredictionController.addPrediction)
    // READ
    app.get('/api/prediction/:id', authenticate, PredictionController.findPrediction)
    // UPDATE
    app.patch('/api/prediction/:id', authenticate, PredictionController.updatePrediction)
    // DELETE
    app.delete('/api/prediction/:id', authenticate, PredictionController.deletePrediction)
    
}