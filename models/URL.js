const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const schema = new mongoose.Schema({
    url: {
        type: String,
        trim: true,
        required: true
    },

    hash: {
        type: String,
        trim: true,
        required: true
    }
});

schema.pre('save', async function(next) {
    next();
})

module.exports = mongoose.model('URL', schema);
