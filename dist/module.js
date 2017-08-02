(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["angular-jxon"] = factory(require("angular"));
	else
		root["angular-jxon"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
* @name angular-jxon
* @author Joseph Quinn <quinn.josephr@protonmail.com>
* @license MIT
* @requires angular/angular@>=1.3.0 < 2
* @exports angular-jxon.name
*/
// Ensure DOMParser is available
if (typeof window.DOMParser === 'undefined') {
  console.error('DOMParser is unavailable. Please load a DOMParser shim before the angular-jxon module');
}
/**
* @class EmptyTree
*/
class EmptyTree {
  /**
  * @constructs
  */
  constructor() {}
  /**
  * @function toString
  * @return {String} 'null'
  */
  toString() {
    return 'null';
  }
  /**
  * @function valueOf
  * @return null
  */
  valueOf() {
    return null;
  }
}
/**
* @var {Object} cfg
*/
var cfg = {
  sValueProp: 'keyValue',
  sAttrProp: 'keyAttributes',
  sAttrsPref: '@',
  sLowCase: true,
  sEmptyTrue: true,
  sAutoDate: true,
  sIgnorePrefixed: false,
  aCache: [],
  rIsNull: /^\s*$/,
  rIsBool: /^(?:true|false)$/i
};
/**
* @constant {Function} objectify
* @param {Mixed} vValue
* @return {Object}
*/
const objectify = function (vValue) {
  return vValue === null ? new EmptyTree() : vValue instanceof Object ? vValue : new vValue.constructor(vValue);
};
/**
* @constant {Function} parseText
* @param {Mixed} sValue
* @return {Mixed}
*/
const parseText = function (sValue) {
  if (cfg.rIsNull.test(sValue)) {
    return null;
  }
  if (cfg.rIsBool.test(sValue)) {
    return sValue.toLowerCase() === 'true';
  }
  if (isFinite(sValue)) {
    return parseFloat(sValue);
  }
  if (cfg.sAutoDate && isFinite(Date.parse(sValue))) {
    return new Date(sValue);
  }
  return sValue;
};
/**
* @constant {Function} createObjTree
* @param {Object} oParentNode
* @param {Number} nVerb
* @param {Boolean} bFreeze
* @param {Boolean} bNesteAttr 
* @return {Object}
*/
const createObjTree = function (oParentNode, nVerb, bFreeze, bNesteAttr) {
  var nLevelStart = cfg.aCache.length,
      bChildren = oParentNode.hasChildNodes(),
      bAttributes = oParentNode.nodeType === oParentNode.ELEMENT_NODE && oParentNode.hasAttributes(),
      bHighVerb = Boolean(nVerb & 2);

  var sProp,
      vContent,
      nLength = 0,
      sCollectedTxt = "",
      vResult = bHighVerb ? {} : /* put here the default value for empty nodes: */true;

  if (bChildren) {
    for (var oNode, nItem = 0; nItem < oParentNode.childNodes.length; nItem = nItem + 1) {
      oNode = oParentNode.childNodes.item(nItem);
      if (oNode.nodeType === 4) {
        sCollectedTxt += oNode.nodeValue;
      } /* nodeType is "CDATASection" (4) */
      else if (oNode.nodeType === 3) {
          sCollectedTxt += oNode.nodeValue.trim();
        } /* nodeType is "Text" (3) */
        else if (oNode.nodeType === 1 && !(cfg.sIgnorePrefixed && oNode.prefix)) {
            cfg.aCache.push(oNode);
          } /* nodeType is "Element" (1) */
    }
  }

  var nLevelEnd = cfg.aCache.length,
      vBuiltVal = parseText(sCollectedTxt);

  if (!bHighVerb && (bChildren || bAttributes)) {
    vResult = nVerb === 0 ? objectify(vBuiltVal) : {};
  }

  for (var nElId = nLevelStart; nElId < nLevelEnd; nElId = nElId + 1) {
    sProp = cfg.aCache[nElId].nodeName;
    if (cfg.sLowCase) sProp = sProp.toLowerCase();
    vContent = createObjTree(cfg.aCache[nElId], nVerb, bFreeze, bNesteAttr);
    if (vResult.hasOwnProperty(sProp)) {
      if (vResult[sProp].constructor !== Array) {
        vResult[sProp] = [vResult[sProp]];
      }
      vResult[sProp].push(vContent);
    } else {
      vResult[sProp] = vContent;
      nLength = nLength + 1;
    }
  }

  if (bAttributes) {
    var nAttrLen = oParentNode.attributes.length,
        sAPrefix = bNesteAttr ? "" : cfg.sAttrsPref,
        oAttrParent = bNesteAttr ? {} : vResult;

    for (var oAttrib, oAttribName, nAttrib = 0; nAttrib < nAttrLen; nLength = nLength + 1, nAttrib = nAttrib + 1) {
      oAttrib = oParentNode.attributes.item(nAttrib);
      oAttribName = oAttrib.name;
      if (cfg.sLowCase) oAttribName = oAttribName.toLowerCase();
      oAttrParent[sAPrefix + oAttribName] = parseText(oAttrib.value.trim());
    }

    if (bNesteAttr) {
      if (bFreeze) {
        Object.freeze(oAttrParent);
      }
      vResult[cfg.sAttrProp] = oAttrParent;
      nLength -= nAttrLen - 1;
    }
  }

  if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
    vResult[cfg.sValueProp] = vBuiltVal;
  } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
    vResult = vBuiltVal;
  }

  if (bFreeze && (bHighVerb || nLength > 0)) {
    Object.freeze(vResult);
  }

  cfg.aCache.length = nLevelStart;

  return vResult;
};
/**
* @constant {Function} loadObjTree
* @param {Object} oXMLDoc
* @param {Object} oParentEl
* @param {Object} oParentObj
*/
const loadObjTree = function (oXMLDoc, oParentEl, oParentObj) {
  var vValue, oChild;

  if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
    oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString())); /* verbosity level is 0 or 1 */
    if (oParentObj === oParentObj.valueOf()) {
      return;
    }
  } else if (oParentObj.constructor === Date) {
    oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toGMTString()));
  }

  for (var sName in oParentObj) {
    if (oParentObj.hasOwnProperty(sName)) {

      vValue = oParentObj[sName];
      if (isFinite(sName) || vValue instanceof Function) {
        continue;
      } /* verbosity level is 0 */
      // when it is _
      if (sName === cfg.sValueProp) {
        if (vValue !== null && vValue !== true) {
          oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue)));
        }
      } else if (sName === cfg.sAttrProp) {
        /* verbosity level is 3 */
        for (var sAttrib in vValue) {
          if (vValue.hasOwnProperty(sAttrib)) {
            oParentEl.setAttribute(sAttrib, vValue[sAttrib]);
          }
        }
      } else if (sName.charAt(0) === cfg.sAttrsPref && sName !== cfg.sAttrsPref + 'xmlns') {
        oParentEl.setAttribute(sName.slice(1), vValue);
      } else if (vValue.constructor === Array) {
        for (var nItem = 0; nItem < vValue.length; nItem = nItem + 1) {
          oChild = oXMLDoc.createElementNS(vValue[nItem][cfg.sAttrsPref + 'xmlns'] || oParentEl.namespaceURI, sName);
          loadObjTree(oXMLDoc, oChild, vValue[nItem]);
          oParentEl.appendChild(oChild);
        }
      } else {
        oChild = oXMLDoc.createElementNS((vValue || {})[cfg.sAttrsPref + 'xmlns'] || oParentEl.namespaceURI, sName);
        if (vValue instanceof Object) {
          loadObjTree(oXMLDoc, oChild, vValue);
        } else if (vValue !== null && vValue !== true) {
          oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
        } else if (!cfg.sEmptyTrue && vValue === true) {
          oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
        }
        oParentEl.appendChild(oChild);
      }
    }
  }
};
/**
* @class JXONService
*/
class JXONService {
  /**
  * @constructs
  */
  constructor() {}
  /**
  * @function xmlToString
  * @param {Object} xmlObj
  * @return {String}
  */
  xmlToString(xmlObj) {
    if (typeof xmlObj.xml !== "undefined") {
      return xmlObj.xml;
    } else {
      return new window.XMLSerializer().serializeToString(xmlObj);
    }
  }
  /**
  * @alias xmlToJs
  */
  build(oXMLParent, nVerbosity, bFreeze, bNesteAttributes) {
    return this.xmlToJs(oXMLParent, nVerbosity, bFreeze, bNesteAttributes);
  }
  /**
  * @function jsToXml
  * @param {Object} oObjTree
  * @param {String} sNamespaceURI
  * @param {String} sQualifiedName
  * @param {Object} oDocumentType
  * @return {Object}
  */
  jsToXml(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType) {
    var oNewDoc = window.document.implementation.createDocument(sNamespaceURI || null, sQualifiedName || "", oDocumentType || null);
    loadObjTree(oNewDoc, oNewDoc.documentElement || oNewDoc, oObjTree);
    return oNewDoc;
  }
  /**
  * @alias jsToXml
  */
  unbuild(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType) {
    return this.jsToXml(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType);
  }
  /**
  * @function stringToXml
  * @param {Object} xmlStr
  * @return {String}
  */
  stringToXml(xmlStr) {
    return new window.DOMParser().parseFromString(xmlStr, 'application/xml');
  }
  /**
  * @function jsToString
  * @param {Object} oObjectTree
  * @param {String} sNamespaceURI
  * @param {String} sQualifiedName
  * @param {Object} oDocumentType
  * @return {String}
  */
  jsToString(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType) {
    return this.xmlToString(this.jsToXml(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType));
  }
  /**
  * @alias jsToString
  */
  stringify(oObjTree, sNamespaceURI /* optional */, sQualifiedName /* optional */, oDocumentType /* optional */) {
    return this.jsToString(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType);
  }
  /**
  * @function stringToJs
  * @param {String} str - An string representing an XML document
  * @return {Object}
  */
  stringToJs(str) {
    var xmlObj = this.stringToXml(str);
    return this.xmlToJs(xmlObj);
  }
  /**
  * @function xmlToJs
  * @param {Object} oXMLParent
  * @param {Number} nVerbosity
  * @param {Boolean} bFreeze
  * @param {Boolean} bNesteAttributes
  * @return {Object}
  */
  xmlToJs(oXMLParent, nVerbosity, bFreeze, bNesteAttributes) {
    var _nVerb = arguments.length > 1 && typeof nVerbosity === "number" ? nVerbosity & 3 : /* put here the default verbosity level: */1;
    return createObjTree(oXMLParent, _nVerb, bFreeze || false, arguments.length > 3 ? bNesteAttributes : _nVerb === 3);
  }
}
/**
* @ngdoc module
* @name angular-jxon
*/
var Module = __webpack_require__(1).module('angular-jxon', ['ng']);
/**
* @ngdoc provider
* @name $JXONProvider
* @description Provider for the $JXON factory
*/
Module.provider('$JXON', function JXONProvider() {
  /**
  * @ngdoc method
  * @name $JXONProvider#config
  * @param {Object} cfgObject the configuration object to into the defaults
  * @throws {InvalidArgumentException}
  */
  this.config = function (cfgObject) {
    if (typeof cfgObject === 'object') {
      for (var key in cfgObject) {
        if (cfgObject.hasOwnProperty(key)) {
          switch (key) {
            case 'valueKey':
              cfg.sValueProp = cfgObject.valueKey;
              break;
            case 'attrKey':
              cfg.sAttrProp = cfgObject.attrKey;
              break;
            case 'attrPrefix':
              cfg.sAttrsPref = cfgObject.attrPrefix;
              break;
            case 'lowerCaseTags':
              cfg.sLowCase = cfgObject.lowerCaseTags;
              break;
            case 'trueIsEmpty':
              cfg.sEmptyTrue = cfgObject.trueIsEmpty;
              break;
            case 'autoDate':
              cfg.sAutoDate = cfgObject.autoDate;
              break;
            case 'ignorePrefixedNodes':
              cfg.sIgnorePrefixed = cfgObject.ignorePrefixedNodes;
              break;
            default:
              break;
          }
        }
      }
    } else {
      throw new TypeError('config must be an object');
    }
  };
  /**
  * @function $get
  * @return {Object} JXONService
  */
  this.$get = function JXONFactory() {
    return new JXONService();
  };
});
module.exports = Module.name;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=module.map