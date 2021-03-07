import { DishType } from "./a/dish"
import { Kitchen } from "./kitchen"

import chalk = require('chalk');



export default class Cooker {
	public status: string = "libre"
	public parentKitchen: Kitchen
	public cookingTime: number
	public myOrders: Array<Object>
	public myPeddings: Array<Object>


	constructor(cookingTime: number, parentKitchen: Kitchen) {
		this.cookingTime = cookingTime
		this.parentKitchen = parentKitchen
	}

	public addDish(orders: Object, index: string) {
		let myOrder: Array<Object> = this.myOrders ? [...this.myOrders] : []
		myOrder.push(orders)
		this.myOrders = myOrder;
		this.makeDish(index)
	}
	public addPendding(orders: Object, index: string) {
		let myPedding: Array<Object> = this.myPeddings ? [...this.myPeddings] : []
		myPedding.push(orders)
		this.myPeddings = myPedding;
		console.log(chalk.green(`Cooker ${index} waiting ${this.myPeddings[0]['type']} ${this.myPeddings[0]['size']} ${this.myPeddings[0]['quantity']}`));
	}

	public makeDish(index: string) {
		if (this.myOrders.length > 0) {
			this.status = "Occuped"
			this.parentKitchen.takeIngredient(this.myOrders)
			console.log(chalk.blue(`Cooker ${index} preparing ${this.myOrders[0]['type']} ${this.myOrders[0]['size']} ${this.myOrders[0]['quantity']}`));
			setTimeout(() => {
				console.log(chalk.red(`Cooker ${index} finish ${this.myOrders[0]['type']} ${this.myOrders[0]['size']} ${this.myOrders[0]['quantity']}`));
				this.status = "Libre"
				if (this.myPeddings != undefined) {
					this.makePenn(index)
				}
			}, (this.parentKitchen.getTime(this.myOrders[0]['type']) * this.cookingTime))
		}
	}

	public makePenn(index: string) {
		if (this.myPeddings[0] != undefined) {
			this.status = "Occuped"
			console.log(chalk.blue(`Cooker ${index} preparing ${this.myOrders[0]['type']} ${this.myOrders[0]['size']} ${this.myOrders[0]['quantity']}`));
			setTimeout(() => {
				console.log(chalk.red(`Cooker ${index} finish ${this.myOrders[0]['type']} ${this.myOrders[0]['size']} ${this.myOrders[0]['quantity']}`));
				this.status = "Libre"
			}, (this.parentKitchen.getTime(this.myOrders[0]['type']) * this.cookingTime))
		}
	}

	public getStatus() {
		return this.status
	}


}