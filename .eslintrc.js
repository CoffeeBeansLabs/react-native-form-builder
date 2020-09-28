module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-props-no-spreading': 'off',
    'no-eval': 'off',
    'global-require': 'off',
    'react/destructuring-assignment': 'off', //TODO: Check this rule later.
    'react/state-in-constructor': 'off' 
 },
  'globals': {
    "fetch": false
  }
}
