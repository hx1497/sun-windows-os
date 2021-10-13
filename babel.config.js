let Plugins  = []

if (process.env.NODE_ENV === 'production') {
  Plugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...Plugins
  ]
}
