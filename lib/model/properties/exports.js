var props = [
  'StaticList',
  'DBList',
  'DBTreeList',
  'XPage',
  'XString',
  'Timezone',
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
