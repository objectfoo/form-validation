/*global EventUtil, _, console*/
(function (_, EVT) {
  'use strict';

  var submit,
    inputs = _.toArray(document.forms[0].elements),
    isText = newPredicate('text'),
    isPassword = newPredicate('password');

  // take string or array for strings
  // return false or element matching type
  function newPredicate(types) {
    types = (_.isArray(types)) ? types : [types];
    return function (el) {
      return _.contains(types, el.type) && el;
    };
  }

  function textHandler(el) {
    EVT.addHandler(el, 'keypress', function (evt) {
      evt = EVT.getEvent(evt);
      console.log(evt);
      // if value is valid trigger something...
    });
  }

  submit = _.chain(inputs).filter(newPredicate('submit')).first().value();
  submit.disabled = true;

  _.each([
    { predicate: isText, handler: textHandler },
    { predicate: isPassword, handler: textHandler }
  ], function (item) {
    _.chain(inputs).filter(item.predicate).each(item.handler);
  });
})(_, EventUtil);
