var props = [
  'StaticList',
  'DBList',
  'XString',
  'TextArea',
  'XBoolean',
  'ComputedField',
  'XNumber',
  'Users'
];

props.forEach(function (prop) {
    module.exports[prop] = require('./'+prop);
});
