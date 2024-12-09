module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1733746951103, function(require, module, exports) {
/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



var preferredCharsets = require('./lib/charset')
var preferredEncodings = require('./lib/encoding')
var preferredLanguages = require('./lib/language')
var preferredMediaTypes = require('./lib/mediaType')

/**
 * Module exports.
 * @public
 */

module.exports = Negotiator;
module.exports.Negotiator = Negotiator;

/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */

function Negotiator(request) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }

  this.request = request;
}

Negotiator.prototype.charset = function charset(available) {
  var set = this.charsets(available);
  return set && set[0];
};

Negotiator.prototype.charsets = function charsets(available) {
  return preferredCharsets(this.request.headers['accept-charset'], available);
};

Negotiator.prototype.encoding = function encoding(available) {
  var set = this.encodings(available);
  return set && set[0];
};

Negotiator.prototype.encodings = function encodings(available) {
  return preferredEncodings(this.request.headers['accept-encoding'], available);
};

Negotiator.prototype.language = function language(available) {
  var set = this.languages(available);
  return set && set[0];
};

Negotiator.prototype.languages = function languages(available) {
  return preferredLanguages(this.request.headers['accept-language'], available);
};

Negotiator.prototype.mediaType = function mediaType(available) {
  var set = this.mediaTypes(available);
  return set && set[0];
};

Negotiator.prototype.mediaTypes = function mediaTypes(available) {
  return preferredMediaTypes(this.request.headers.accept, available);
};

// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;

}, function(modId) {var map = {"./lib/charset":1733746951104,"./lib/encoding":1733746951105,"./lib/language":1733746951106,"./lib/mediaType":1733746951107}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1733746951104, function(require, module, exports) {
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;

/**
 * Module variables.
 * @private
 */

var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Charset header.
 * @private
 */

function parseAcceptCharset(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var charset = parseCharset(accepts[i].trim(), i);

    if (charset) {
      accepts[j++] = charset;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */

function parseCharset(str, i) {
  var match = simpleCharsetRegExp.exec(str);
  if (!match) return null;

  var charset = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';')
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a charset.
 * @private
 */

function getCharsetPriority(charset, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(charset, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the charset.
 * @private
 */

function specify(charset, spec, index) {
  var s = 0;
  if(spec.charset.toLowerCase() === charset.toLowerCase()){
    s |= 1;
  } else if (spec.charset !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
}

/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */

function preferredCharsets(accept, provided) {
  // RFC 2616 sec 14.2: no header = *
  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all charsets
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullCharset);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getCharsetPriority(type, accepts, index);
  });

  // sorted list of accepted charsets
  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full charset string.
 * @private
 */

function getFullCharset(spec) {
  return spec.charset;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1733746951105, function(require, module, exports) {
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;

/**
 * Module variables.
 * @private
 */

var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Encoding header.
 * @private
 */

function parseAcceptEncoding(accept) {
  var accepts = accept.split(',');
  var hasIdentity = false;
  var minQuality = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify('identity', encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: 'identity',
      q: minQuality,
      i: i
    };
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */

function parseEncoding(str, i) {
  var match = simpleEncodingRegExp.exec(str);
  if (!match) return null;

  var encoding = match[1];
  var q = 1;
  if (match[2]) {
    var params = match[2].split(';');
    for (var j = 0; j < params.length; j++) {
      var p = params[j].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i
  };
}

/**
 * Get the priority of an encoding.
 * @private
 */

function getEncodingPriority(encoding, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the encoding.
 * @private
 */

function specify(encoding, spec, index) {
  var s = 0;
  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
    s |= 1;
  } else if (spec.encoding !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */

function preferredEncodings(accept, provided) {
  var accepts = parseAcceptEncoding(accept || '');

  if (!provided) {
    // sorted list of all encodings
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullEncoding);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getEncodingPriority(type, accepts, index);
  });

  // sorted list of accepted encodings
  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full encoding string.
 * @private
 */

function getFullEncoding(spec) {
  return spec.encoding;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1733746951106, function(require, module, exports) {
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;

/**
 * Module variables.
 * @private
 */

var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Language header.
 * @private
 */

function parseAcceptLanguage(accept) {
  var accepts = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var language = parseLanguage(accepts[i].trim(), i);

    if (language) {
      accepts[j++] = language;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a language from the Accept-Language header.
 * @private
 */

function parseLanguage(str, i) {
  var match = simpleLanguageRegExp.exec(str);
  if (!match) return null;

  var prefix = match[1]
  var suffix = match[2]
  var full = prefix

  if (suffix) full += "-" + suffix;

  var q = 1;
  if (match[3]) {
    var params = match[3].split(';')
    for (var j = 0; j < params.length; j++) {
      var p = params[j].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    i: i,
    full: full
  };
}

/**
 * Get the priority of a language.
 * @private
 */

function getLanguagePriority(language, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(language, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the language.
 * @private
 */

function specify(language, spec, index) {
  var p = parseLanguage(language)
  if (!p) return null;
  var s = 0;
  if(spec.full.toLowerCase() === p.full.toLowerCase()){
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred languages from an Accept-Language header.
 * @public
 */

function preferredLanguages(accept, provided) {
  // RFC 2616 sec 14.4: no header = *
  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all languages
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullLanguage);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getLanguagePriority(type, accepts, index);
  });

  // sorted list of accepted languages
  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full language string.
 * @private
 */

function getFullLanguage(spec) {
  return spec.full;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1733746951107, function(require, module, exports) {
/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;

/**
 * Module variables.
 * @private
 */

var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept header.
 * @private
 */

function parseAccept(accept) {
  var accepts = splitMediaTypes(accept);

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var mediaType = parseMediaType(accepts[i].trim(), i);

    if (mediaType) {
      accepts[j++] = mediaType;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a media type from the Accept header.
 * @private
 */

function parseMediaType(str, i) {
  var match = simpleMediaTypeRegExp.exec(str);
  if (!match) return null;

  var params = Object.create(null);
  var q = 1;
  var subtype = match[2];
  var type = match[1];

  if (match[3]) {
    var kvps = splitParameters(match[3]).map(splitKeyValuePair);

    for (var j = 0; j < kvps.length; j++) {
      var pair = kvps[j];
      var key = pair[0].toLowerCase();
      var val = pair[1];

      // get the value, unwrapping quotes
      var value = val && val[0] === '"' && val[val.length - 1] === '"'
        ? val.substr(1, val.length - 2)
        : val;

      if (key === 'q') {
        q = parseFloat(value);
        break;
      }

      // store parameter
      params[key] = value;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a media type.
 * @private
 */

function getMediaTypePriority(type, accepted, index) {
  var priority = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec = specify(type, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the media type.
 * @private
 */

function specify(type, spec, index) {
  var p = parseMediaType(type);
  var s = 0;

  if (!p) {
    return null;
  }

  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
    s |= 4
  } else if(spec.type != '*') {
    return null;
  }

  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s |= 2
  } else if(spec.subtype != '*') {
    return null;
  }

  var keys = Object.keys(spec.params);
  if (keys.length > 0) {
    if (keys.every(function (k) {
      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
    })) {
      s |= 1
    } else {
      return null
    }
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s,
  }
}

/**
 * Get the preferred media types from an Accept header.
 * @public
 */

function preferredMediaTypes(accept, provided) {
  // RFC 2616 sec 14.2: no header = */*
  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');

  if (!provided) {
    // sorted list of all types
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullType);
  }

  var priorities = provided.map(function getPriority(type, index) {
    return getMediaTypePriority(type, accepts, index);
  });

  // sorted list of accepted types
  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full type string.
 * @private
 */

function getFullType(spec) {
  return spec.type + '/' + spec.subtype;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec) {
  return spec.q > 0;
}

/**
 * Count the number of quotes in a string.
 * @private
 */

function quoteCount(string) {
  var count = 0;
  var index = 0;

  while ((index = string.indexOf('"', index)) !== -1) {
    count++;
    index++;
  }

  return count;
}

/**
 * Split a key value pair.
 * @private
 */

function splitKeyValuePair(str) {
  var index = str.indexOf('=');
  var key;
  var val;

  if (index === -1) {
    key = str;
  } else {
    key = str.substr(0, index);
    val = str.substr(index + 1);
  }

  return [key, val];
}

/**
 * Split an Accept header into media types.
 * @private
 */

function splitMediaTypes(accept) {
  var accepts = accept.split(',');

  for (var i = 1, j = 0; i < accepts.length; i++) {
    if (quoteCount(accepts[j]) % 2 == 0) {
      accepts[++j] = accepts[i];
    } else {
      accepts[j] += ',' + accepts[i];
    }
  }

  // trim accepts
  accepts.length = j + 1;

  return accepts;
}

/**
 * Split a string of parameters.
 * @private
 */

function splitParameters(str) {
  var parameters = str.split(';');

  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ';' + parameters[i];
    }
  }

  // trim parameters
  parameters.length = j + 1;

  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }

  return parameters;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1733746951103);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map