import * as cluster from 'cluster'
import Cooker from './coocker';
export class Kitchen {
	public static kitchens = []
	public cookingTime: number;
	public cooksKitchen: number;
	public createTime: number;


	constructor(cookingTime: number, cooksKitchen: number, createTime: number) {
		this.cookingTime = cookingTime
		this.cooksKitchen = cooksKitchen
		this.createTime = createTime
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
			forkedKitchen.this.process.on('message', message => {
				if (message.cookers) {
					forkedKitchen.cooks.push(message)
					if (forkedKitchen.cooks.length === this.cooksKitchen)
						console.log(forkedKitchen.cooks);
				}
			})
		} else {
		}
	}

	// todo worker
	static addCooks(createTime: number) {
		return new Cooker(createTime)
	}

	public ordersKitchen(orders) {
		if (Kitchen.kitchens.length == 0)
			this.createKitchen()
		console.log(orders);
	}

	public getKitchen() {
		console.log(Kitchen.kitchens)
	}
}