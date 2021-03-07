import * as cluster from 'cluster'
import { Ingredients } from './a/ingedients';
import Cooker from './coocker';

import chalk = require('chalk');

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
			console.log(chalk.yellow(`Kitchen ${kitchen.id} aborad !`))
			Kitchen.kitchens.push({ this: kitchen, cooks: [], pending: [], cooking: [] })
			let forkedKitchen = Kitchen.kitchens.find(kitc => kitc.this === kitchen)

			forkedKitchen.this.process.send({ create: { 'cooksKitchen': this.cooksKitchen, 'createTime': this.createTime, 'foo': forkedKitchen } })
			forkedKitchen.this.process.on('message', (message: { cookers: string }) => {
				if (message.cookers) {
					// console.log(message);
					//forkedKitchen.cooks.push(message.cookers)
					forkedKitchen.cooks.push(this.addCooks(this.cookingTime, this))
				}
			})
		} else {
			console.log('hello');
		}
	}

	// todo worker
	static addCooks(createTime: number) {
		//return new Cooker(createTime)

	}
	public addCooks(cookingTime: number, kitchen: Kitchen) {
		return new Cooker(cookingTime, kitchen)
	}

	public ordersKitchen(orders: Array<Object>) {
		if (orders.length > Kitchen.kitchens.length * (this.cooksKitchen * 2)) {
			console.log(chalk.yellow('Création des cuisines..'));
			this.createKitchen()
		}
		setTimeout(() => {
			Kitchen.kitchens.forEach((kitchen, a) => {
				kitchen.cooks.forEach((cooker: Cooker, index: number) => {
					if (cooker.getStatus() == 'libre') {
						if (orders.length > 0) {
							let id: string = (a + 1) + ':' + (index + 1)
							let poped = orders.pop()
							cooker.addDish(poped, id)
							let Npoped = orders.pop()
							if(Npoped != undefined)
								cooker.addPendding(Npoped, id)
							this.ordersKitchen(orders)
						}
					}
				})
			});
		}, (2000))
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

	// Tout les ingrédients 
	public getIngredients() {
		return this.ingredients
	}

	// Un type d'ingredients 
	public getIngredient(ingredient: string) {
		if (ingredient != "")
			return this.ingredients[ingredient]
	}

	// Ajouter 
	public removeIngredient(ingredient: string, nb: number) {
		if (ingredient != "" && nb > 0)
			this.ingredients[ingredient] = this.ingredients[ingredient] - nb
	}

	// Supprimer
	public addIngredient(ingredient: string, nb: number) {
		if (ingredient != "" && nb > 0)
			this.ingredients[ingredient] = this.ingredients[ingredient] + nb
	}

	public takeIngredient(orders: Array<Object>) {
		orders.forEach((element, index) => {
			switch (element['type']) {
				case 'Takoyaki':
					this.removeIngredient('octopus', 1);
					this.removeIngredient('soja', 1);
					break;
				case 'Katsudon':
					this.removeIngredient('rice', 1);
					this.removeIngredient('pork', 1);
					this.removeIngredient('eggs', 1);
					break;
				case 'Udon':
					this.removeIngredient('noodle', 1);
					this.removeIngredient('pork', 1);
					this.removeIngredient('eggs', 1);
					break;
				case 'Ramen':
					this.removeIngredient('noodle', 1);
					this.removeIngredient('chicken', 1);
					this.removeIngredient('eggs', 1);
					break;
				case 'MatchaCookie':
					this.removeIngredient('dought', 1);
					this.removeIngredient('matcha', 1);
					this.removeIngredient('chocolate', 1);
					this.removeIngredient('love', 1);
					break;
			}
		})
		this.generateIngredient();
	}
	public generateIngredient() {
		setInterval(() => {
			this.addIngredient('octopus', 1);
			this.addIngredient('soja', 1);
			this.addIngredient('rice', 1);
			this.addIngredient('eggs', 1);
			this.addIngredient('noodle', 1);
			this.addIngredient('chicken', 1);
			this.addIngredient('dought', 1);
			this.addIngredient('matcha', 1);
			this.addIngredient('chocolate', 1);
			this.addIngredient('love', 1);			
		}, this.createTime);
	}
	public getTime(name: string) {
		switch (name) {
			case 'Takoyaki':
				return 1000
			case 'Katsudon':
				return 2000
			case 'Udon':
				return 2000
			case 'Ramen':
				return 2000
			case 'MatchaCookie':
				return 4000
		}
	}
}