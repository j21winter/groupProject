const LeagueController = require('../controllers/league.controller')
// const { authenticate } = require('../config/jwt.config')


module.exports = (app) => {
    
    // PROTECTED ROUTES 
    // CREATE
    app.post('/api/league/new', LeagueController.addLeague)
    // READ ALL Leagues
    app.get('/api/allLeagues', LeagueController.findAllLeagues)
    // READ One League
    app.get('/api/league/:id', LeagueController.findLeague)
    
    // Maybe this needs to go in the users route/controller?
    // READ All Leagues where user id=:id
    // app.get('/api/allLeagues/:id')


    // UPDATE
    app.patch('/api/league/:id', LeagueController.updateLeague)
    // DELETE
    app.delete('/api/league/:id', LeagueController.deleteLeague)
    
}