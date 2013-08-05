/**
 * Created with JetBrains WebStorm.
 * User: luckystar
 * Date: 13-7-31
 * Time: 下午1:44
 * To change this template use File | Settings | File Templates.
 */

require('colors');
var parseString = require('xml2js').parseString;

module.exports = function (xml,zip) {
    parseString(xml, function (err, result) {
        try {
            if (err) throw err;
            require('./appXml.rules.js')(result.widget,zip);
        } catch (e) {
            console.log(('Error: '+e.toString()).red);
            process.exit(1);
        }
    });
};
