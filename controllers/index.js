var scrapUrl,
    scrapText,
    path = require('path'),
    _u = require("underscore"),
    fs = require('fs'),
    findMatch,
    kWords = ['JavaScript', 'Java', 'C\\+\\+', 'Ruby', 'PHP', 'Python', 'iOS', 'SQL'];

findMatch = function(webText) {
    var regEx = new RegExp(kWords.join("|"), "gi");
    var mData = webText.replace(regEx, function myFunction(mWord) {
        return '<mark>' + mWord + '</mark>';
    });
    var matches = webText.match(regEx);
    return ({ mText: mData, status: "200", kWords: _u.uniq(matches) });
}

module.exports = {
    scrapUrl: function(res) {
        var fPath = path.join(__dirname, '../txtFiles', 'glassdoor.txt');
        fs.readFile(fPath, "utf8", function(error, data) {
            var mText = { mText: "Error..", status: "00" };
            if (data) {
                mText = findMatch(data);
            }
            res.send(mText);
        });
    },
    scrapText: function(res, wText) {
        mText = findMatch(wText);
        res.send(mText);
    }
}
