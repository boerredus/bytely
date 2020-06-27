const URL = require('../models/URL'),
    adler_32 = require('adler-32'),
    adler32 = str => adler_32.str(str).toString(16).padStart(8, 0);

module.exports.add = (req, res) => {
    res.render('index');
}

module.exports.addAction = async (req, res) => {
    let url = {
        url: req.body.url,
        hash: adler32(req.body.url)
    },
        count,
        result;

    do {
        url.hash = count === undefined ? adler32(url.hash) : adler32(url.hash + count);
        result = await URL.find({ hash: url.hash });

        count = count === undefined ? 0 : count + 1;

    } while (result && result.length);

    await new URL(url).save();
    res.status(200).send(url.hash);
}

module.exports.url = async (req, res) => {
    const result = await URL.find({ hash: req.params.hash });

    res.render('redirect', result[0]);
}
