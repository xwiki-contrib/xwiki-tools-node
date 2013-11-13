var props = [
  'StaticList',
  'DBList',
  'XString',
  'TextArea',
  'XBoolean',
  'ComputedField'
];

if (typeof(define) === 'function' && define.amd) {
  define(props.map(function(p) { return './'+p; }), function() {
    var out = {};
    for (var i = 0; i < arguments.length; i++) {
      out[props[i]] = arguments[i];
    }
    out.props = props;
    return out;
  });
} else {
  module.exports.props = props;
}
