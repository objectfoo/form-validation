(function (_) {

  function validator(message, fun) {
    function f(/* args */) {
      return fun.apply(fun, arguments);
    }
    f.message = message;
    return f;
  }

  function checker(/* validators */) {
    var validators = _.toArray(arguments);

    return function (obj) {
      return _.reduce(validators, function (errs, check) {
        if (!check(obj))
          errs.push(check.message);
        return errs;
      }, []);
    };
  }

  var checkMap = checker(validator('must be a Map', function (obj) { return _.isObject(obj); }));

  console.log(checkMap({})); //=> []
  console.log(checkMap({'yo': 'ho'})); //=> []
  console.log(checkMap('asdf')); //=>['must be a Map']

  var checkName = checker(
      validator('want name!',
          function (o) { return o && o.length && o.length > 0; }),
      validator('more than 3 chars!',
          function (o) { return o && o.length && o.length > 3; }));

  console.log(checkName()); //=> ['want name!', 'more than 3 chars!']
  console.log(checkName('Hai')); //=> ['more than 3 chars!']
  console.log(checkName('ohai!')); //=>[]
})(_);
