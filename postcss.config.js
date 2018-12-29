const precss = require('precss');
const stylelint = require('stylelint');

module.exports = {
    plugins: [
        precss(),
        stylelint()
    ]
};
