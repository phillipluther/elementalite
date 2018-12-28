const ENV = process.env['BABEL_ENV'];

const presets = [];
const plugins = [];

if (ENV === 'umd') {
    presets.push([
        '@babel/preset-env',
        {
            targets: "> 1%, not dead"
        }
    ]);

    presets.push('minify');
    plugins.push('@babel/plugin-transform-modules-umd');
}

if (ENV === 'cjs') {
    presets.push([
        '@babel/preset-env',
        {
            targets: {
                node: "8"
            }
        }
    ]);

    plugins.push('@babel/plugin-transform-modules-commonjs');
}

module.exports = {presets, plugins};
