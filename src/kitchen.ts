import * as cluster from 'cluster'
import { Ingredients } from './a/ingedients';
import Cooker from './coocker';
export class Kitchen {
	public static kitchens = []
	public cookingTime: number;
	public cooksKitchen: number;
	public createTime: number;
	public ingredients: Ingredients


	constructor(cookingTime: number, cooksKitchen: number, createTime: number) {
		this.cookingTime = cookingTime
		this.cooksKitchen = cooksKitchen
		this.createTime = createTime
		this.createKitchen()
		this.stockIngredients()		
	}

	public createKitchen(): void {
		if (cluster.isMaster) {
			const kitchen = cluster.fork({
				cookingTime: this.cookingTime,
				cooksKitchen: this.cooksKitchen,
				createTime: this.createTime,
			})
			console.log(`Kitchen ${kitchen.id} aborad !`)
			Kitchen.kitchens.push({ this: kitchen, cooks: [], pending: [], cooking: [] })
			let forkedKitchen = Kitchen.kitchens.find(kitc => kitc.this === kitchen)
			forkedKitchen.this.process.send({ create: { 'cooksKitchen': this.cooksKitchen, 'createTime': this.createTime } })
			forkedKitchen.this.process.on('message', (message: { cookers: Cooker }) => {
				if (message.cookers) {
					// console.log(message);
					//forkedKitchen.cooks.push(message.cookers)
					forkedKitchen.cooks.push(this.addCooks(this.createTime))

				}
			})
		} else {
			console.log('hello');

		}
	}

	// todo worker
	static addCooks(createTime: number) {
		return new Cooker(createTime)

	}
	public addCooks(createTime: number) {
		return new Cooker(createTime)
	}

	public ordersKitchen(orders: Array<Object>) {
		if (orders.length > this.cooksKitchen * 2) {
			this.createKitchen()
		}
		Kitchen.kitchens.forEach(kitchen => {
			kitchen.cooks.forEach((cooker) => {
				// if (cooker.getStatus() == 'libre') {
				// 	console.log(orders);
				// 	orders.pop()
				// 	console.log(orders);
				// }

				console.log(cooker.getStatus());


			})


		});
	}

	public getKitchen() {
		console.log(Kitchen.kitchens)
	}

	public stockIngredients() {
		this.ingredients = {
			octopus: 5,
			soja: 5,
			rice: 5,
			pork: 5,
			eggs: 5,
			noodle: 5,
			chicken: 5,
			dought: 5,
			matcha: 5,
			chocolate: 5,
			love: 5,
		}
	}

	public getIngredients() {
		return this.ingredients
	}

	public getIngredient(ingredient: string) {
		return this.ingredients[ingredient]
	}

	public removeIngredient(ingredient: string, nb: number) {
		this.ingredients[ingredient] = this.ingredients[ingredient] - nb
	}

	public addIngredient(ingredient: string, nb: number) {
		this.ingredients[ingredient] = this.ingredients[ingredient] + nb
	}
}