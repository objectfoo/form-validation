/*global EventUtil, _*/
(function (_, EventUtil) {
  'use strict';
  var submit,
    inputs     = _.toArray(document.forms[0].elements),

    // input type predicates
    isText     = newTypePredicate('text'),
    isPassword = newTypePredicate('password'),
    isRequired = newTypePredicate(['password', 'text']);

  // predicate: input value not empty
  function allInputsNonEmpty(memo, input) {
    return memo && input.value.length > 0;
  }

  // predicate: character is valid input char, delete && a-zA-Z && symbols
  function isValidChar(c) {
    return c === 8 || c < 128 && c > 31;
  }

  // accept string or array return false or elements matching type
  function newTypePredicate(types) {
    types = _.isArray(types) ? types : [types];
    return function (elem) {
      return _.contains(types, elem.type) && elem;
    };
  }

  // TODO: accept array of predicates return reduction of results
  function textHandler(elem) {
    EventUtil.addHandler(elem, 'keyup', function (e) {
      var evt = EventUtil.getEvent(e);

      return isValidChar(evt.keyCode) && fieldUpdated();
    });
  }

  // a field was updated
  function fieldUpdated() {
    submit.disabled = !_.reduce(_.filter(inputs, isRequired),
        allInputsNonEmpty, true);
  }

  submit = _.chain(inputs).filter(newTypePredicate('submit')).first().value();
  submit.disabled = true;

  _.each([
    { predicate: isText, handler: textHandler },
    { predicate: isPassword, handler: textHandler }
  ], function (item) {
    _.each(_.filter(inputs, item.predicate), item.handler);
  });

})(_, EventUtil);
