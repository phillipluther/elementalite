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
        console.log(`\n${colors.gray('----------')}\n`); // eslint-disable-line
    },
    error: err => {
        /* eslint-disable */
        console.log(colors.red.bold('\nERROR'));
        console.log(colors.red('-----'));
        console.error(err);
        console.log('\n');
        /* eslint-enable */
    },
    out: message => {
        console.log(message); // eslint-disable-line
    },
    success: message => {
        console.log(colors.green.bold('SUCCESS:'), message, '\n'); // eslint-disable-line
    }
};

// a convenient wrapper that provides simple formatting and time elapsed when running an async build
// task
module.exports.runBuildTask = async (taskName, action) => {
    let log = module.exports.log;

    log.divider();
    log.out(`Starting: ${taskName}`);

    let timeStart = Date.now();

    try {
        await action();

        let duration = Date.now() - timeStart;
        let durationText = duration > 999 ? duration / 1000 + 's' : duration + 'ms';

        log.success(taskName + ' ' + colors.gray('(' + durationText + ')'));

    } catch(err) {
        log.error(err);
        log.out(colors.red.bold('FAILED: ') + taskName + '\n');
    }
};
