var props = [
  'StaticList',
  'DBList',
  'XString',
  'TextArea',
  'XBoolean',
  'ComputedField',
  'XNumber',
  'Users',
  'XDate',
  'Password',
  'Groups',
  'Levels',
  'Email'
];

props.forEach(function (prop) {
    module.exports[prop] = require('./'+prop);
});
