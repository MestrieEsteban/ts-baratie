import { exit } from "process";
import * as readline from 'readline';

import { Kitchen } from './kitchen'
import { DishType, DishSize } from './a/dish'
import chalk = require("chalk");




class Reception {


	public cookingTime: number;
	public cooksKitchen: number;
	public createTime: number;
	public orders: Array<any>;
	public kitchen: Kitchen
	private read: readline.Interface;


	constructor() {

		this.cookingTime = parseInt(process.argv[2])
		this.cooksKitchen = parseInt(process.argv[3])
		this.createTime = parseInt(process.argv[4])
		if (this.cookingTime !== this.cookingTime) this.errorCookingTime()
		if (this.cooksKitchen !== this.cooksKitchen) this.errorCooksKitchen()
		if (this.createTime !== this.createTime) this.errorCreateTime()
		this.read = readline.createInterface({ input: process.stdin })

		console.log(chalk.cyan(`
              |    |    |                 
             )_)  )_)  )_)              
            )___))___))___)           
           )____)____)_____)
        ______|____|____|_____
~~~~~~~~\\                   /~~~~~~~~
        ^^^^^^^^^^^^^^^^^^^^^
		`));
		this.kitchen = new Kitchen(this.cookingTime, this.cooksKitchen, this.createTime)

		this.takeOrder()
	}

	public async takeOrder() {
		console.log(chalk.cyan(`Welcome aboard, what do you want to order ?`))
		this.read.question('', async (order: string) => {
			switch (order.toLowerCase()) {
				case 'status':
					console.log(this.cookingTime);
					console.log(this.cooksKitchen);
					console.log(this.createTime);
					break;
				case 'good bye':
					process.exit(0)
				case 'orders':
					console.log(this.orders);
				default:
					this.getOrder(order)
					this.kitchen.ordersKitchen(this.orders)
					break;
			}
			this.takeOrder()
		})
	}

	public errorCookingTime(): void {
		console.log('No cooking time defined');
		process.exit(0)
	}
	public errorCooksKitchen(): void {
		console.log('No cooks kitchen defined');
		process.exit(0)
	}
	public errorCreateTime(): void {
		console.log('No time defined');
		process.exit(0)
	}

	public getOrder(orders: string) {
		let parsedOrder: Array<Object> = []
		let ordersTab: Array<string> = orders.split(';');
		ordersTab.forEach((element, index) => {
			var type: string, size: string, quantity: number
			element.trim().split(' ', 3).forEach((one, i) => {
				if (one != '') {
					i === 0 ? type = one : ''
					i === 1 ? size = one : ''
					i === 2 ? quantity = parseInt(one.replace(/x/g, "")) : ''
				}
			})
			if (type === undefined || size === undefined || quantity === undefined) {
				console.log('Error');
			} else
				parsedOrder.push({ type, size, quantity })
		});
		this.orders = parsedOrder
		return;

	}

}

export default Reception