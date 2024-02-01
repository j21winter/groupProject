const LeagueController = require('../controllers/league.controller')
const { authenticate } = require('../config/jwt.config')


module.exports = (app) => {
    
    // PROTECTED ROUTES 
    // CREATE
    app.post('/api/league/new', authenticate, LeagueController.addLeague)
    // READ ALL Leagues
    app.get('/api/allLeagues',  authenticate, LeagueController.findAllLeagues)
    // READ One League
    app.get('/api/league/:id',  authenticate, LeagueController.findLeague)
    
    // Maybe this needs to go in the users route/controller?
    // READ All Leagues where user id=:id
    // app.get('/api/allLeagues/:id')

    // UPDATE NAME
    app.patch('/api/league/info/:id',  authenticate, LeagueController.updateLeagueinfo);
    app.patch('/api/league/leave/:id',  authenticate, LeagueController.leaveLeague);

    // UPDATE to add members
    app.patch('/api/league/:id',  authenticate, LeagueController.updateLeague)
    // DELETE
    app.delete('/api/league/:id',  authenticate, LeagueController.deleteLeague)
    
}