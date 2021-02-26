import Reception from "./recpetion";

const cluster = require('cluster');

if (cluster.isMaster) new Reception()

