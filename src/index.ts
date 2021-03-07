import Reception from "./recpetion";

import cluster = require('cluster');
import { Kitchen } from "./kitchen";

if (cluster.isMaster)
	new Reception()

if (cluster.isWorker) {
	process.on('message', message => {
		if (message.create) {
			for (let i = 0; i < message.create.cooksKitchen; i++) {
				//const cook = Kitchen.addCooks(message.create.createTime, message.create.foo)
				process.send({ cookers: 'cook' })
			}
		}
	})
}