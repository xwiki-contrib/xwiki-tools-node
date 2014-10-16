var props = [
  'StaticList',
  'DBList',
  'XString',
  'TextArea',
  'XBoolean',
  'ComputedField',
  'XNumber'
];

props.forEach(function (prop) {
    module.exports[prop] = require('./'+prop);
});
