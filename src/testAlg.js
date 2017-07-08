// var parsePath = require('parse-filepath');
// var treepath = require('./treepath.js');

var treepath = (function() {
  function buildTree(tree, parts) {
    var lastDir = 'root';
    var dirPath = '';

    parts.forEach(function(part) {
      var name = part.trim();

      // In case we have a single `/`
      if (!name || !!name.match(/^\/$/)) {
        return;
      }

      // It's a directory
      if (name.indexOf('.') === -1) {
        lastDir = name;
        dirPath += lastDir + '/';

        if (!tree[name]) {
          tree[name] = {
            path: dirPath,
            files: []
          };
        }
      } else {
        // It's a file
        tree[lastDir].files.push(name);
      }
    });
  }

  return function init(paths) {
    if (!paths || !Array.isArray(paths)) {
      throw new TypeError('Expected paths to be an array of strings but received: ' + (typeof paths));
    }

    var tree = {
      root: {
        path: '',
        files: []
      }
    };

    paths.forEach(function(path) {
      buildTree(tree, path.split('/'));
    });

    return tree;
  };
}());

function prefix(arr1){
  var arr= arr1.concat().sort(),
  a1= arr[0], a2= arr[arr.length-1], L= a1.length, i= 0;
  while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
  return a1.substring(0, i);
}

var testArray = [
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(243) Congenital hypothyroidism.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism/(244-0) Postsurgical hypothyroidi~.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism/(244-1) Other postablative hypoth~.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism/(244-2) Iodine hypothyroidism.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism/(244-3) Other iatrogenic hypothyr~.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism/(244-8) Other specified acquired ~.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(244) Acquired hypothyroidism/(244-9) Unspecified hypothyroidism.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(246) Other disorders of thyroid/(246-1) Dyshormonogenic goiter.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Thyroid disorders (240-246)/(246) Other disorders of thyroid/(246-8) Other specified disorders~.txt",
    "i2b2/Diagnoses/Endocrine disorders (240-259)/Other endocrine gland diseases (250-259)/(258) Polyglandular dysfunction a~/(258-1) Other combinations of end~.txt"
];

// var s = [];
// var common = prefix(testArray)
// testArray.forEach((filePath) => {
//   var path = filePath.replace(common, "");
//   console.log(path)
//   s.push(path.split('/'));
// });
// console.log(s);

var hierarchy = testArray.reduce(function(hier,path){
    var x = hier;
    path.split('/').forEach(function(item){
        if(!x[item]){
            x[item] = {};
        }
        x = x[item];
    });
    x.path = path;
    return hier;
}, {});

console.log('Hierarchy', JSON.stringify((hierarchy)))

// var makeul = function(hierarchy, classname){
//     var dirs = Object.keys(hierarchy);
//     console.log(dirs)
//     var ul = '<ul';
//     if(classname){
//         ul += ' class="' + classname + '"';
//     }
//     ul += '>\n';
//     dirs.forEach(function(dir){
//         var path = hierarchy[dir].path;
//         if(path){ // file
//             ul += '<li class="file" data-url="' + path + '">' + dir + '</li>\n';
//         }else{
//             ul += '<li class="folder">' + dir + '\n';
//             ul += makeul(hierarchy[dir]);
//             ul += '</li>\n';
//         }
//     });
//     ul += '</ul>\n';
//     return ul;
// };

// console.log(makeul(hierarchy, 'base-UL'));

// var filePaths = testArray.map((path) => {
//     return parsePath(path.replace('\\', '/'));
// });

// var groupedPaths = {};

// filePaths.map((path) => {
//     const dir = path.dir;
//     const base = path.base;

//     if(!groupedPaths.hasOwnProperty(dir)){
//         // console.log('hey')
//         groupedPaths[dir] = [];
//         groupedPaths[dir].push(base);
//     } else if (groupedPaths.hasOwnProperty(dir)) {
//         // console.log(groupedPaths[dir])
//         groupedPaths[dir].push(base);
//     }
// })

// console.log(treepath(testArray));