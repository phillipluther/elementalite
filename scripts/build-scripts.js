const path = require('path');
const fs = require('fs-extra');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const babel = require('@babel/core');
const {dirs, runBuildTask} = require('./utils');

async function transpile(srcFile, destFile, babelOpts = {}) {
    try {
        babelOpts.filename = destFile;
        let {code, map} = await babel.transformFileAsync(srcFile, babelOpts);

        await fs.ensureDir(path.dirname(destFile));
        await fs.writeFile(destFile, code);

        if (map) {
            await fs.writeFile(destFile, map);
        }

    } catch(err) {
        throw err;
    }
}

async function buildJS() {
    try {
        let files = await glob('src/**/!(*index).js');
        let i, n;

        await fs.remove(dirs.es);
        await fs.remove(dirs.commonjs);
        await fs.remove(dirs.umd);

        for (i = 0, n = files.length; i < n; i++) {
            let srcFile = files[i];
            let filename = path.basename(srcFile);

            await Promise.all([
                transpile(srcFile, path.join(dirs.es, filename)),
                transpile(srcFile, path.join(dirs.commonjs, filename), {
                    presets: [ [
                        '@babel/preset-env',
                        { targets: { node: '8' }}
                    ]],
                    plugins: ['@babel/plugin-transform-modules-commonjs']
                }),
                transpile(srcFile, path.join(dirs.umd, filename), {
                    presets: [
                        [
                            '@babel/preset-env',
                            { targets: '> 1%, not dead' }
                        ],
                        'minify'
                    ],
                    plugins: ['@babel/plugin-transform-modules-umd']
                })
            ]);
        }

    } catch(err) {
        // log.error(err);
        throw(err);
    }
}

runBuildTask('Build Scripts', buildJS);
