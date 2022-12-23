// const decompress = require('decompress');
 
// decompress('../scorm.zip', 'dist').then(files => {
//     console.log('done!');
// });

var rimraf = require("rimraf");
rimraf("dist/scorm", function () { console.log("done"); });