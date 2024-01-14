const server = require('./src/server');
const port = process.env.PORT || 3000;

// const reporter = require('./src/app');
// setTimeout(() => {
//     reporter.init();
// }, 1000);

// ToDo: Signal to stop server
server.listen(port, () => console.log(`Listening on port ${port}...`));