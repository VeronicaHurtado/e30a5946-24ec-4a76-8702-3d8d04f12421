require('./app');
const reporter = require('./main');
setTimeout(() => {
    reporter.init();
}, 1000);

// ToDo: Signal to stop server