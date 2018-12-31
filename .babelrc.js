const presets = [];
const plugins = [];

if (process.env.BABEL_ENV === 'commonjs') {
    presets.push([
        '@babel/preset-env',
        {
            targets: { node: '7.6.0' }
        }
    ]);

    plugins.push('@babel/plugin-transform-modules-commonjs');

} else {
    presets.push([
        '@babel/preset-env',
        {
            modules: false,
            targets: { esmodules: true }
        }
    ]);
}

module.exports = {presets, plugins};
