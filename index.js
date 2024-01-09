require('./src/server');
const reporter = require('./src/app');
setTimeout(() => {
    reporter.init();
}, 1000);

// ToDo: Signal to stop server