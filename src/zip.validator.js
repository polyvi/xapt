/**
 * Created with JetBrains WebStorm.
 * User: luckystar
 * Date: 13-7-31
 * Time: 下午1:55
 * To change this template use File | Settings | File Templates.
 */

require('colors');

var path = require('path'),
    AdmZip = require('adm-zip'),
    UglifyJS = require("uglify-js2");

module.exports = function (paras) {
    if (!paras.target) {
        paras.target = paras.source.replace(path.extname(paras.source), '.xpa');
    }
    console.log('Message: reading & checking file: ' + paras.source);

    var source = new AdmZip(paras.source),
        target = new AdmZip();

    checkAppXml();

    source.getEntries().forEach(function (entry) {
            var entryName = entry.entryName.trim();
            var chinese = /[\u4e00-\u9fa5]/g;
            if (chinese.test(entryName)) {
                console.log('warning: fileName or folderName has chinese characters: ' + entryName.red);
            }

            //移除所有xFace.js，xFace引擎将在运行时自动加载引擎内置的xFace.js文件
            if (path.basename(entryName) === 'xFace.js') {
                console.log('warning: will ignore file: ' + entryName.red);
            } else {
                if (paras.minify && /(.js)$/.test(entryName)) {
                    var result = UglifyJS.minify(entry.getData().toString(), {fromString:true});
                    target.addFile(entryName, new Buffer(result.code));
                } else {
                    target.addFile(entryName, entry.getData());
                }
            }
        }
    );

    writeTarget();

    function checkAppXml() {
        var appXmlEntry = source.getEntry('app.xml');
        if (appXmlEntry) {
            require('./appXml.validator')(appXmlEntry.getData().toString(), source);
        } else {
            console.log('Error:'.red + ' 缺少xFace应用配置文件(appXml)');
            process.exit(1);
        }
    }


    function writeTarget() {
        console.log('Message: writing files: ');
        target.writeZip(paras.target);
        console.log('Message: ' + 'Successed! '.green);
        console.log('         Please check the file: ' + paras.target.red);
        console.log();//output an empty line
    }
};

