const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/predictions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Established connection to the database"))
.catch(err => console.log("Something went wrong when connecting to the database", err));

