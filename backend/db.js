const mongoose = require('mongoose')

url = 'mongodb://0.0.0.0/Inotebook'
mongoose.connect(url);

const connection = mongoose.connection;

connection.on('open', () => {
    console.log('connected to mongoose')
})

connection.on('error', (err)=> {
    console.log(err);
})

module.exports = connection