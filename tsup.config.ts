export default {
  entry: ['index.js', 'notifiers/*.js'],
  format: ['cjs'],
  target: 'node20',
  bundle: true,
  splitting: true,
}
