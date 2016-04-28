"use strict";

var phoneNumber = require("libphonenumber");

function What() {

}

/**
 * [function description]
 * @param  {[any]} what [input any type]
 * @return {[String]}      [returns the string of type]
 */
What.prototype.type = function(what) {
  var type = Object.prototype.toString.call(what).slice(8, -1);
  var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var url = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  if (type === "String") {
    if (email.test(what)) {
      return 'Email';
    }
    if (url.test(what)) {
      return 'Url';
    }
    try {
      if (phoneNumber.validate(what) === true) {
        return 'Phone';
      }
    } catch (e) {
      return 'String';
    }
  }
  if (type === "Number") {
    if (this.isNaN(what)) {
      return 'NaN';
    } else if (what % 1 !== 0 &&
              what !== Infinity &&
              what !== -Infinity) {
      return 'Float';
    } else if (what % 1 === 0) {
      return 'Int';
    } else {
      return 'Number';
    }
  }
  return type;
};

/**
 * [function description]
 * @param  {[any]} what [description]
 * @return {[type]}      [description]
 */
What.prototype.isNaN = function(what) {
  if (what !== what) {
    return true;
  }
  return false;
};

/**
 * [function description]
 * @param  {[any]} what [description]
 * @return {[type]}      [description]
 */
What.prototype.isFalsey = function(what) {
  if (this.trim(what)) {
    if (this.type(what) === "Object" &&
        JSON.stringify(what) === "{}") {
        return true;
    }
    if (this.type(what) === "Array" &&
        this.trim(what).length === 0) {
          return true;
    }
    return false;
  }
  return true;
};

/**
 * [function description]
 * @param  {[type]} what [description]
 * @return {[type]}      [description]
 */
What.prototype.isEmpty = function(what) {
  if (this.trim(what) ||
      this.trim(what) === false ||
      this.trim(what) === 0) {
    if (this.type(what) === "Object" &&
        JSON.stringify(what) === "{}") {
        return true;
    }
    if (this.type(what) === "Array" &&
        what.length === 0) {
      return true;
    }
    return false;
  }
  return true;
};

/**
 * [function description]
 * @param  {[type]} what [description]
 * @return {[type]}      [description]
 */
What.prototype.trim = function(what) {
  if (this.type(what) === "String") {
    return what.trim();
  }
  if (this.type(what) === "Array") {
    return what.filter(Boolean);
  }
  return what;
};

/**
 * [function description]
 * @param  {[type]} what  [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
What.prototype.prefixInArray = function(what, query) {
  var type = this.type(what),
      matches;
  if (this.type(query) === "String" && type === "Array") {
    matches = what.filter(function(whatValue) {
      if (whatValue) {
        return (whatValue.substring(0, query.length) === query);
      }
    });
  }

  return what;
};

/**
 * [function description]
 * @param  {[type]} what  [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
What.prototype.sufixInArray = function(what, query) {
  var type = this.type(what),
      matches;
  if (this.type(query) === "String" && type === "Array") {
    matches = what.filter(function(whatValue) {
      if (whatValue) {
        let valueLength = whatValue.length;
        return (whatValue.substring(valueLength - query.length, valueLength) === query);
      }
    });
  }

  return what;
};

module.exports = new What();
