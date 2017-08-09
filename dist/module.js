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

"use strict";
var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}'undefined'==typeof window.DOMParser&&console.error('DOMParser is unavailable. Please load a DOMParser shim before the angular-jxon module');var EmptyTree=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:'toString',value:function toString(){return'null'}},{key:'valueOf',value:function valueOf(){return null}}]),a}(),cfg={sValueProp:'keyValue',sAttrProp:'keyAttributes',sAttrsPref:'@',sLowCase:!0,sEmptyTrue:!0,sAutoDate:!0,sIgnorePrefixed:!1,aCache:[],rIsNull:/^\s*$/,rIsBool:/^(?:true|false)$/i},objectify=function(a){return null===a?new EmptyTree:a instanceof Object?a:new a.constructor(a)},parseText=function(a){return cfg.rIsNull.test(a)?null:cfg.rIsBool.test(a)?'true'===a.toLowerCase():isFinite(a)?parseFloat(a):cfg.sAutoDate&&isFinite(Date.parse(a))?new Date(a):a},createObjTree=function(a,b,c,d){var e,f,g=cfg.aCache.length,h=a.hasChildNodes(),i=a.nodeType===a.ELEMENT_NODE&&a.hasAttributes(),j=!!(2&b),k=0,l='',m=!j||{};if(h)for(var p,q=0;q<a.childNodes.length;++q)p=a.childNodes.item(q),4===p.nodeType?l+=p.nodeValue:3===p.nodeType?l+=p.nodeValue.trim():1===p.nodeType&&!(cfg.sIgnorePrefixed&&p.prefix)&&cfg.aCache.push(p);var n=cfg.aCache.length,o=parseText(l);!j&&(h||i)&&(m=0===b?objectify(o):{});for(var r=g;r<n;++r)e=cfg.aCache[r].nodeName,cfg.sLowCase&&(e=e.toLowerCase()),f=createObjTree(cfg.aCache[r],b,c,d),m.hasOwnProperty(e)?(m[e].constructor!==Array&&(m[e]=[m[e]]),m[e].push(f)):(m[e]=f,++k);if(i){for(var s,t,u=a.attributes.length,v=d?'':cfg.sAttrsPref,w=d?{}:m,x=0;x<u;++k,++x)s=a.attributes.item(x),t=s.name,cfg.sLowCase&&(t=t.toLowerCase()),w[v+t]=parseText(s.value.trim());d&&(c&&Object.freeze(oAttrParent),m[cfg.sAttrProp]=oAttrParent,k-=nAttrLen-1)}return 3===b||(2===b||1===b&&0<k)&&l?m[cfg.sValueProp]=o:!j&&0==k&&l&&(m=o),c&&(j||0<k)&&Object.freeze(m),cfg.aCache.length=g,m},loadObjTree=function(a,b,c){var d,e;if(c.constructor!==String&&c.constructor!==Number&&c.constructor!==Boolean)c.constructor===Date&&b.appendChild(a.createTextNode(c.toGMTString()));else if(b.appendChild(a.createTextNode(c.toString())),c===c.valueOf())return;for(var f in c)if(c.hasOwnProperty(f)){if(d=c[f],isFinite(f)||d instanceof Function)continue;if(f===cfg.sValueProp)null!==d&&!0!==d&&b.appendChild(a.createTextNode(d.constructor===Date?d.toGMTString():d+''));else if(f===cfg.sAttrProp)for(var g in d)d.hasOwnProperty(g)&&b.setAttribute(g,d[g]);else if(f.charAt(0)===cfg.sAttrsPref&&f!=cfg.sAttrsPref+'xmlns')b.setAttribute(f.slice(1),d);else if(d.constructor===Array)for(var h=0;h<d.length;++h)e=a.createElementNS(d[h][cfg.sAttrsPref+'xmlns']||b.namespaceURI,f),loadObjTree(a,e,d[h]),b.appendChild(e);else e=a.createElementNS((d||{})[cfg.sAttrsPref+'xmlns']||b.namespaceURI,f),d instanceof Object?loadObjTree(a,e,d):null!==d&&!0!==d?e.appendChild(a.createTextNode(d.toString())):!cfg.sEmptyTrue&&!0===d&&e.appendChild(a.createTextNode(d.toString())),b.appendChild(e)}},JXONService=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:'xmlToString',value:function xmlToString(a){return'undefined'==typeof a.xml?new window.XMLSerializer().serializeToString(a):a.xml}},{key:'build',value:function build(a,b,c,d){return this.xmlToJs(a,b,c,d)}},{key:'jsToXml',value:function jsToXml(a,b,c,d){var e=window.document.implementation.createDocument(b||null,c||'',d||null);return loadObjTree(e,e.documentElement||e,a),e}},{key:'unbuild',value:function unbuild(a,b,c,d){return this.jsToXml(a,b,c,d)}},{key:'stringToXml',value:function stringToXml(a){return new window.DOMParser().parseFromString(a,'application/xml')}},{key:'jsToString',value:function jsToString(a,b,c,d){return this.xmlToString(this.jsToXml(a,b,c,d))}},{key:'stringify',value:function stringify(a,b,c,d){return this.jsToString(a,b,c,d)}},{key:'stringToJs',value:function stringToJs(a){var b=this.stringToXml(a);return this.xmlToJs(b)}},{key:'xmlToJs',value:function xmlToJs(a,b,c,d){var e=1<arguments.length&&'number'==typeof b?3&b:1;return createObjTree(a,e,c||!1,3<arguments.length?d:3==e)}}]),a}(),Module=__webpack_require__(1).module('angular-jxon',['ng']);Module.provider('$JXON',function(){this.config=function(a){if('object'===('undefined'==typeof a?'undefined':_typeof(a))){for(var b in a)if(a.hasOwnProperty(b))switch(b){case'valueKey':cfg.sValueProp=a.valueKey;break;case'attrKey':cfg.sAttrProp=a.attrKey;break;case'attrPrefix':cfg.sAttrsPref=a.attrPrefix;break;case'lowerCaseTags':cfg.sLowCase=a.lowerCaseTags;break;case'trueIsEmpty':cfg.sEmptyTrue=a.trueIsEmpty;break;case'autoDate':cfg.sAutoDate=a.autoDate;break;case'ignorePrefixedNodes':cfg.sIgnorePrefixed=a.ignorePrefixedNodes;break;default:}}else throw new TypeError('config must be an object')},this.$get=function(){return new JXONService}}),module.exports=Module.name;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=module.map