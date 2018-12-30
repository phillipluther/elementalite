const path = require('path');
const colors = require('colors/safe');


// common directories, pathed and resolved
module.exports.dirs = {
    css: path.resolve('css'),
    js: path.resolve('js'),
    src: path.resolve('src')
};

// standardized logging util providing some pretty(ish) formatting and colors
module.exports.log = {
    divider: () => {
        console.log(`\n${colors.gray('-----')}\n`); // eslint-disable-line
        return module.exports.log;
    },
    error: err => {
        /* eslint-disable */
        console.log(colors.red.bold('\nERROR'));
        console.log(colors.red('-----'));
        console.error(err);
        console.log('\n');
        /* eslint-enable */

        return module.exports.log;
    },
    out: message => {
        console.log(message); // eslint-disable-line
        return module.exports.log;
    },
    success: message => {
        console.log(colors.green.bold('SUCCESS:'), message, '\n'); // eslint-disable-line
        return module.exports.log;
    }
};

// removes the root/cwd from a given file path
module.exports.removeRoot = function(filePath) {
    return filePath
        .replace(process.cwd(), '')
        .replace(new RegExp(`^${path.sep}`), '');
};

// a convenient wrapper that provides simple formatting and time elapsed when running an async build
// task
module.exports.runBuildTask = async (taskName, action) => {
    let log = module.exports.log;

    log.out(`\nStarting: ${taskName}`).divider();

    let timeStart = Date.now();

    try {
        await action();

        let duration = Date.now() - timeStart;
        let durationText = duration > 999 ? duration / 1000 + 's' : duration + 'ms';

        log.divider().success(taskName + ' ' + colors.gray('(' + durationText + ')'));

    } catch(err) {
        log.error(err).out(colors.red.bold('FAILED: ') + taskName + '\n');
    }
};
