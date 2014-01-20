var props = [
  'StaticList',
  'DBList',
  'XString',
  'TextArea',
  'XBoolean',
  'ComputedField'
];

props.forEach(function (prop) {
    module.exports[prop] = require('./'+prop);
});
