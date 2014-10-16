var props = [
  'StaticList',
  'DBList',
  'XString',
  'TextArea',
  'XBoolean',
  'ComputedField',
  'XNumber',
  'Users',
  'XDate'
];

props.forEach(function (prop) {
    module.exports[prop] = require('./'+prop);
});
