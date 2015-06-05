# Angular-jxon

[![npm version](https://badge.fury.io/js/angular-jxon.svg)](http://badge.fury.io/js/angular-jxon) [![Dependency Status](https://www.versioneye.com/user/projects/556c90a06365320026fc4600/badge.svg?style=flat)](https://www.versioneye.com/user/projects/556c90a06365320026fc4600) 

[![Bower version](https://badge.fury.io/bo/angular-jxon.svg)](http://badge.fury.io/bo/angular-jxon) [![Dependency Status](https://www.versioneye.com/user/projects/556c909f636532001a3b4800/badge.svg?style=flat)](https://www.versioneye.com/user/projects/556c909f636532001a3b4800)

An AngularJS provider for Mozilla's JXON library (as implemented by [https://github.com/tyrasd](https://github.com/tyrasd/jxon))

## Install

### NPM
```bash
npm install --save angular-jxon
```

### Bower
```bash
bower install --save angular-jxon
```
Note - installing via Bower will not install xmldom since Bower does not allow for optional dependencies. If you wish to use xmldom in your project, you must install it seperately.

### Git
```bash
git clone https://bitbucket.org/illuser/angular-jxon.git
```


## Example

```javascript

'use strict';

var MyApp = angular.module('myApp', ['angularJXON']);


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

MyApp.controller('xmlCtrl', ['$scope', '$JXON', function($scope, $JXON) {


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
#### Alias - #build(oXMLParent)
Param oXMLParent - an XML Document to be transformed to JSON
Returns - a JSON object
```javascript
var xmlString = '<current><city id="2643743" name="London"></city></current>';
var xmlDoc = new DOMParser().parseFromString(xmlString, 'application/xml');

var json = $JXON.xmlToJs(xmlDoc);

json === {
  current:
    city:
      "@name": "London",
      "@id": 2643743
}
```

### #xmlToString(xmlObj)
```javascript
```
    
### jsToXml(oObjTree)
#### Alias - #unbuild(oObjTree)
Param oObjTree - a JSON Object to be transformed to an XML Document
Return - an XML Document
```javascript
var jsonDoc = { "current": { "city": { "@name": "London", "@id": 2643743 }}};
var xmlString = '<current><city id="2643743" name="London"></city></current>';

var xml = $JXON.jsToXml(jsonDoc);

xml === new DOMParser().parseFromString(xmlString, 'application/xml');
```

### jsToString(oObjTree)
#### Alias - #stringify(oObjTree)
```javascript
```

### stringToXml(xmlString)
```javascript
```

### stringToJs(str)
```javascript
```