const {promisify} = require('util');
const glob = promisify(require('glob'));
const path = require('path');
const fs = require('fs-extra');
const postcss = require('postcss');
const precss = require('precss');
const stylelint = require('stylelint');
const cssnano = require('cssnano');
const {dirs, runBuildTask} = require('./utils');


async function process(srcFile, min = false) {
    try {
        let destFile = min ?
            path.join(dirs.css, 'min', path.basename(srcFile)) :
            path.join(dirs.css, path.basename(srcFile));

        let plugins = [precss, stylelint];
        let fileContents = await fs.readFile(srcFile, 'utf8');

        if (min) {
            plugins.push(cssnano);
        }

        let {css, map} = await postcss(plugins).process(fileContents, {
            from: srcFile,
            to: destFile,
            map: { inline: false }
        });

        await fs.ensureDir(path.dirname(destFile));
        await fs.writeFile(destFile, css);
        await fs.writeFile(destFile + '.map', map);

    } catch(err) {
        throw err;
    }
}

async function buildCSS() {
    try {
        await fs.remove(dirs.css);

        let files = await glob('src/**/*.css');
        let i, n;

        for (i = 0, n = files.length; i < n; i++) {
            let srcFile = files[i];

            // build both a minified and uncompressed version
            await process(srcFile);
            await process(srcFile, true);
        }

    } catch(err) {
        throw err;
    }
}

runBuildTask('Build Styles', buildCSS);
