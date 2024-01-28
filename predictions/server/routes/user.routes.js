const UserController = require('../controllers/user.controller')
// const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    // LOGIN & REG ROUTES
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    
    // PROTECTED ROUTES 
    app.post('/api/logout',  UserController.logout)
    //READ ALL
    app.get('/api/users', UserController.findAll)
    // READ ONE
    app.get('/api/user/:id',  UserController.findOne)
    // UPDATE
    app.patch('/api/user/:id',  UserController.updateUser)
    // DELETE
    app.delete('/api/user/:id',  UserController.deleteUser)

    //need to add authenticate back in once fixed^
    
}