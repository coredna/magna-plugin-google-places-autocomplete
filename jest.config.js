module.exports = {
  name: 'my-plugin',
  transformIgnorePatterns: [
    'node_modules/(?!(magna|rambda|query-string)/)'
  ]
}
