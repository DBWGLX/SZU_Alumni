module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1732523202259, function(require, module, exports) {
/**
 * Expose `pathToRegexp`.
 */

module.exports = pathToRegexp;

/**
 * Match matching groups in a regular expression.
 */
var MATCHING_GROUP_REGEXP = /\\.|\((?:\?<(.*?)>)?(?!\?)/g;

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */

function pathToRegexp(path, keys, options) {
  options = options || {};
  keys = keys || [];
  var strict = options.strict;
  var end = options.end !== false;
  var flags = options.sensitive ? '' : 'i';
  var lookahead = options.lookahead !== false;
  var extraOffset = 0;
  var keysOffset = keys.length;
  var i = 0;
  var name = 0;
  var pos = 0;
  var backtrack = '';
  var m;

  if (path instanceof RegExp) {
    while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
      if (m[0][0] === '\\') continue;

      keys.push({
        name: m[1] || name++,
        optional: false,
        offset: m.index
      });
    }

    return path;
  }

  if (Array.isArray(path)) {
    // Map array parts into regexps and return their source. We also pass
    // the same keys and options instance into every generation to get
    // consistent matching groups before we join the sources together.
    path = path.map(function (value) {
      return pathToRegexp(value, keys, options).source;
    });

    return new RegExp(path.join('|'), flags);
  }

  path = path.replace(
    /\\.|(\/)?(\.)?:(\w+)(\(.*?\))?(\*)?(\?)?|[.*]|\/\(/g,
    function (match, slash, format, key, capture, star, optional, offset) {
      pos = offset + match.length;

      if (match[0] === '\\') {
        backtrack += match;
        return match;
      }

      if (match === '.') {
        backtrack += '\\.';
        extraOffset += 1;
        return '\\.';
      }

      backtrack = slash || format ? '' : path.slice(pos, offset);

      if (match === '*') {
        extraOffset += 3;
        return '(.*)';
      }

      if (match === '/(') {
        backtrack += '/';
        extraOffset += 2;
        return '/(?:';
      }

      slash = slash || '';
      format = format ? '\\.' : '';
      optional = optional || '';
      capture = capture ?
        capture.replace(/\\.|\*/, function (m) { return m === '*' ? '(.*)' : m; }) :
        (backtrack ? '((?:(?!/|' + backtrack + ').)+?)' : '([^/' + format + ']+?)');

      keys.push({
        name: key,
        optional: !!optional,
        offset: offset + extraOffset
      });

      var result = '(?:'
        + format + slash + capture
        + (star ? '((?:[/' + format + '].+?)?)' : '')
        + ')'
        + optional;

      extraOffset += result.length - match.length;

      return result;
    });

  // This is a workaround for handling unnamed matching groups.
  while (m = MATCHING_GROUP_REGEXP.exec(path)) {
    if (m[0][0] === '\\') continue;

    if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
      keys.splice(keysOffset + i, 0, {
        name: name++, // Unnamed matching groups must be consistently linear.
        optional: false,
        offset: m.index
      });
    }

    i++;
  }

  path += strict ? '' : path[path.length - 1] === '/' ? '?' : '/?';

  // If the path is non-ending, match until the end or a slash.
  if (end) {
    path += '$';
  } else if (path[path.length - 1] !== '/') {
    path += lookahead ? '(?=/|$)' : '(?:/|$)';
  }

  return new RegExp('^' + path, flags);
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1732523202259);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map