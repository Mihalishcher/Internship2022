const http = require('http');
const mongoose = require('mongoose');

const server = require('./server');
const events = require('./events');
const dbConfig = require('../config/dbConfig');

const PORT = server.get('port');

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbConfig.NAME}:${dbConfig.PASSWORD}@cluster0.tsgplcg.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        events.bind(http.createServer(server).listen(PORT));
    } catch (e) {
        console.log(e);
    }
})();
