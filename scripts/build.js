const path = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const {rollup} = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const {dirs, log, runBuildTask} = require('./utils');
const precss = require('precss');

async function rollupFile(srcFile) {
    log.out(`Building ${srcFile}`);

    try {
        let bundle = await rollup({
            input: path.join(srcFile),
            plugins: [
                nodeResolve(),
                postcss({
                    extract: path.join(dirs.css, path.basename(srcFile).replace(/\.js$/, '.css')),
                    plugins: [
                        precss()
                    ]
                })
            ]
        });

        bundle.write({
            file: path.join(dirs.js, path.basename(srcFile)),
            format: 'es'
        });

    } catch(err) {
        throw err;
    }
}

async function build() {
    try {
        let files = await glob('src/**/!(*index).js');
        let i, n;

        for (i = 0, n = files.length; i < n; i++) {
            rollupFile(files[i]);
        }

    } catch(err) {
        throw err;
    }
}

runBuildTask('Build Components', build);
