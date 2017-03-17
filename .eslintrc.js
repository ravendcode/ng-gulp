module.exports = {
  'plugins': [
    'promise',
    'angular',
  ],
  'globals': {
    'io': true,
    'moment': true,
    'Mustache': true,
    'angular': true,
  },
  'env': {
    'node': true,
    'mocha': true,
    'browser': true,
    'jquery': true,
  },
  'extends': ["eslint:recommended", "google", 'angular'],
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'parser': 'babel-eslint',
  'rules': {
    'space-before-function-paren': 0,
    'jsx-quotes': 0,
    'max-len': 0,
    'object-curly-spacing': 0,
    'no-console': 0,
    'require-jsdoc': 0,
    'arrow-parens': 0,
    'no-invalid-this': 0,
    'angular/window-service': 0,
    'angular/log': 0,
    'angular/module-setter': 2,
    'angular/no-private-call': 0,
  }
}
