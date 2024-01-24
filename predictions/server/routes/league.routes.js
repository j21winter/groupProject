const LeagueController = require('../controllers/league.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    
    // PROTECTED ROUTES 
    // CREATE
    app.post('api/league/new', authenticate, LeagueController.addLeague)
    // READ
    app.get('/api/league/:id', authenticate, LeagueController.findLeague)
    // UPDATE
    app.patch('/api/league/:id', authenticate, LeagueController.updateLeague)
    // DELETE
    app.delete('/api/league/:id', authenticate, LeagueController.deleteLeague)
    
}