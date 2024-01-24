const UserController = require('../controllers/user.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) => {
    // LOGIN & REG ROUTES
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    
    // PROTECTED ROUTES 
    app.post('/api/logout', authenticate, UserController.logout)
    // READ
    app.get('/api/user/:id', authenticate, UserController.findOne)
    // UPDATE
    app.patch('/api/user/:id', authenticate, UserController.updateUser)
    // DELETE
    app.delete('/api/user/:id', authenticate, UserController.deleteUser)
    
}