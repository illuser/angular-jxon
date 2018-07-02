# Angular-JXON

[![npm version](https://badge.fury.io/js/angular-jxon.svg)](http://badge.fury.io/js/angular-jxon)

An AngularJS provider for Mozilla's JXON library (as implemented by [https://github.com/tyrasd](https://github.com/tyrasd/jxon))

## Install

### NPM
```bash
npm install --save angular-jxon
```

### Yarn
```bash
yarn add angular-jxon
```

### Git
```bash
git clone https://github.com/illuser/angular-jxon.git
```


## Example

[Demo Plnkr](http://plnkr.co/WoxqCL)

```javascript

'use strict';

var MyApp = angular.module('myApp', ['angular-jxon']);


MyApp.config(['$JXONProvider', function($JXONProvider) {

  var jxonConfig = {
    valueKey: '_',        // default: 'keyValue'
    attrKey: '$',         // default: 'keyAttributes'
    attrPrefix: '$',      // default: '@'
    lowerCaseTags: false, // default: true
    trueIsEmpty: false,   // default: true
    autoDate: false,      // default: true
    ignorePrefixedNodes: false // default: true
  }

  $JXONProvider.config(jxonConfig);

]);

MyApp.controller('xmlCtrl', ['$scope', '$http', '$log', '$JXON', function($scope, $http, $log, $JXON) {


  $scope.xmlToJs = '';

  $http.get('/some/xml/endpoint')
    .success(function(data, status, headers, config) {
      
      $scope.xmlToJs = $JXON.stringToJs(data);

    })
    .error(function(data, status, headers, config) {

      $log.error('xmlCtrl#$JXON - ', status, ': ', data);

    });

}]);

```

## API

### #xmlToJs(oXMLParent)
#### #build(oXMLParent)
Converts an XML Document to a JSON object

@param oXMLParent - an XML Document to be transformed to JSON

@returns - a JSON object
```javascript
var xmlString = '<current><city id="2643743" name="London"></city></current>';
var xmlDoc = new DOMParser().parseFromString(xmlString, 'application/xml');

var json = $JXON.xmlToJs(xmlDoc);

json === {
  "current": {
    "city": {
      "@name": "London",
      "@id": 2643743
    }
  }
};
```

### #xmlToString(xmlObj)
Converts an XML Document to a string representing an XML Document

@param xmlObj - an XML Document to be transformed into an XML string

@returns - a string representing the XML Document
```javascript
var xmlString = '<current><city id="2643743" name="London"></city></current>';
var xmlDoc = new DOMParser().parseFromString(xmlString, 'application/xml');

var xmlStringConverted = $JXON.xmlToString(xmlDoc);

xmlStringConverted === xmlString;
```
    
### #jsToXml(oObjTree)
#### #unbuild(oObjTree)
Converts a JSON Object to an XML Document

@param oObjTree - a JSON Object to be transformed to an XML Document

@return - an XML Document
```javascript
var jsonDoc = { "current": { "city": { "@name": "London", "@id": 2643743 }}};
var xmlString = '<current><city id="2643743" name="London"></city></current>';

var xml = $JXON.jsToXml(jsonDoc);

xml === new DOMParser().parseFromString(xmlString, 'application/xml');
```

### #jsToString(oObjTree)
#### #stringify(oObjTree)
Converts a JSON Object to a string representing an XML Document

@param oObjTree - a JSON Object to be transformed into an XML string

@return - a string representing the XML Document
```javascript
var jsonDoc = { "current": { "city": { "@name": "London", "@id": 2643743 }}};
var xmlString = '<current><city id="2643743" name="London"></city></current>';

var xml = $JXON.jsToString(jsonDoc);

xml === xmlString;
```

### #stringToXml(xmlString)
Converts a string representing an XML Document to an XML Document

@param xmlString - A string representing an XML Document to be converted to an XML Document

@return - an XML Document
```javascript
var xmlString = '<current><city id="2643743" name="London"></city></current>';
var xmlDoc = new DOMParser().parseFromString(xmlString, 'application/xml');

var xmlConverted = $JXON.stringToXml(xmlString);

xmlDoc === xmlConverted;

```

### #stringToJs(str)
Converts an string representing an XML Document to a JSON Object

@param str - an XML string to convert to a JSON object

@return - a JSON object
```javascript
var xmlString = '<current><city id="2643743" name="London"></city></current>';
var jsonDoc = { "current": { "city": { "@name": "London", "@id": 2643743 }}};

var stringToJSON = $JXON.stringToJs(xmlString);

stringToJSON === jsonDoc;
```

## Change Log

* v0.2.0 - Updating dependencies.
* v0.1.1 - Added missing (.babelrc). Fixed Plunkr example.
* v0.1.0 - Bumped minor version. Updated dependencies. Removed testing infastructure since dependencies no longer were being maintained. Removed Gulp in favor a standalone Webpack build.
* v0.0.1 - Initial release.