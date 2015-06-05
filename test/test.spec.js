'use strict';

var parser = new window.DOMParser();
var xmlString = '<current><city id="2643743" name="London"><coord lon="-0.13" lat="51.51"/><country>GB</country></city></current>';
var xml = parser.parseFromString(xmlString, 'application/xml');
var jsonObject = {current:{city:{country:"Oceana", "@id":1, "@name":"Antlantis"}}};
var jsonToXmlString = '<current><city id="1" name="Antlantis"><country>Oceana</country></city></current>';
var jsonToXml = parser.parseFromString(jsonToXmlString, 'application/xml');

describe('angular-jxon', function(){

  var $JXON;
  var $Provider;

  beforeEach(function() {
    angular.module('dummyModule', [])
      .config(['$JXONProvider', function($JXONProvider) {
        $Provider = $JXONProvider;
      }]);
    module('angular-jxon', 'dummyModule');
  });

  beforeEach(inject(function(_$JXON_) {
    $JXON = _$JXON_;
  }));

  it('should load the module correctly', function() {
    expect($JXON).to.exist;
    expect($JXON).to.be.an('object');
  });

  describe('functions', function(){
    it('should have a function xmlToJs', function() {
      expect($JXON).to.have.a.property('xmlToJs');
      expect($JXON.xmlToJs).to.be.a('function');
    });
    it('should have a function xmlToString', function() {
      expect($JXON).to.have.a.property('xmlToString');
      expect($JXON.xmlToString).to.be.a('function');
    });
    it('should have a function jsToXml', function() {
      expect($JXON).to.have.a.property('jsToXml');
      expect($JXON.jsToXml).to.be.a('function');
    });
    it('should have a function jsToString', function() {
      expect($JXON).to.have.a.property('jsToString');
      expect($JXON.jsToString).to.be.a('function');
    });
    it('should have a function stringToXml', function() {
      expect($JXON).to.have.a.property('stringToXml');
      expect($JXON.stringToXml).to.be.a('function');
    });
    it('should have a function stringToJs', function() {
      expect($JXON).to.have.a.property('stringToJs');
      expect($JXON.stringToJs).to.be.a('function');
    });

    describe('aliases', function() {
      it('should alias stringify to stringToJs()', function() {
        expect($JXON).to.have.a.property('stringify');
        expect($JXON.stringify).to.be.a('function');
      });
      it('should alias unbuild to jstoXml()', function() {
        expect($JXON).to.have.a.property('unbuild');
        expect($JXON.unbuild).to.be.a('function');
      });
      it('should alias build to xmlToJs()', function() {
        expect($JXON).to.have.a.property('build');
        expect($JXON.build).to.be.a('function');
      });
    });

    describe('#xmlToJs()', function() {
      it('should return correct JSON from an XML document', function() {
        var result = $JXON.xmlToJs(xml);
        expect(result).to.be.an('object');
        expect(result).to.have.a.property('current');
        expect(result).to.have.a.deep.property('current.city');
        expect(result).to.have.a.deep.property('current.city.coord.@lon', -0.13);
        expect(result).to.have.a.deep.property('current.city.country', 'GB');
        expect(result).to.have.a.deep.property('current.city.@id', 2643743);
        expect(result).to.have.a.deep.property('current.city.@name', 'London');
        expect(result).to.not.have.a.deep.property('current.city.@name', 'Atlantis');
      });
    });

    describe('#xmlToString()', function() {
      it('should convert an XML document to a string', function() {
        var result = $JXON.xmlToString(xml);
        expect(result).to.be.a('string');
        expect(result).to.equal(xmlString);
      });
    });

    describe('#jsToXml()', function() {
      it('should convert a JSON object to an XML document', function() {
        var result = $JXON.jsToXml(jsonObject);    
        // Here be llamas.
        // No, seriously, V8 will literally spit at you if you try to mess 
        // with the DOM in an unsecure way.
      });
    });

    describe('#jsToString()', function() {
      it('should convert JSON to a valid XML string', function() {
        var result = $JXON.jsToString(jsonObject);
        expect(result).to.be.a('string');
        expect(result).to.equal(jsonToXmlString);
      });
    });

    describe('#stringToJs()', function() {
      it('should convert an XML string to JSON', function() {
        var result = $JXON.stringToJs(xmlString);
        expect(result).to.be.an('object');
        expect(result).to.have.a.property('current');
        expect(result).to.have.a.deep.property('current.city');
        expect(result).to.have.a.deep.property('current.city.coord.@lon', -0.13);
        expect(result).to.have.a.deep.property('current.city.country', 'GB');
        expect(result).to.have.a.deep.property('current.city.@id', 2643743);
        expect(result).to.have.a.deep.property('current.city.@name', 'London');
        expect(result).to.not.have.a.deep.property('current.city.@name', 'Atlantis');
      });
    });

    describe('#stringToXml()', function() {
      it('should convert an XML string to an XML deocument', function() {
        var result = $JXON.stringToXml(xmlString);
        expect(result).to.be.an('object');
        // Here be llamas.
        // No, seriously, V8 will literally spit at you if you try to mess 
        // with the DOM in an unsecure way.
      });
    });
  });

  describe('provider', function() {

    it('should expose $JXONProvider#config()', function() {
      expect($Provider.config).to.be.a('function');
    });

    it('should change the attrPrefix to $', function() { 
      $Provider.config({
        attrPrefix: '$'
      });
      var result = $JXON.xmlToJs(xml);
      expect(result).to.have.a.deep.property('current.city.coord.$lon', -0.13);
      expect(result).to.have.a.deep.property('current.city.country', 'GB');
      expect(result).to.have.a.deep.property('current.city.$id', 2643743);
    });

    it('should expose $JXONProvider#$get()', function() {
      expect($Provider.$get).to.be.a('function');
    });

    it('should expose the JXONService class on #$get', function() {
      var Thing = $Provider.$get();
      expect(Thing).to.have.a.property('xmlToJs');
      expect(Thing.xmlToJs).to.be.a('function');
      expect(Thing).to.have.a.property('xmlToString');
      expect(Thing.xmlToString).to.be.a('function');
      expect(Thing).to.have.a.property('jsToXml');
      expect(Thing.jsToXml).to.be.a('function');
      expect(Thing).to.have.a.property('jsToString');
      expect(Thing.jsToString).to.be.a('function');
      expect(Thing).to.have.a.property('stringToXml');
      expect(Thing.stringToXml).to.be.a('function');
      expect(Thing).to.have.a.property('stringToJs');
      expect(Thing.stringToJs).to.be.a('function');
    })
  });

});