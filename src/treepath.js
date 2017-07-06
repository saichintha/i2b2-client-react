/**
 * Treepath takes an array of pathnames and gives you back
 * an object representation of that path hierarchy.
 */
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