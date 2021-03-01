import * as cluster from 'cluster'
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
			const kitchen = cluster.fork()
			console.log(`New kitchen ${kitchen.id} aborad !`)
			Kitchen.kitchens.push({ this: kitchen, cooks: [], pending: [], cooking: [] })
			let forkedKitchen = Kitchen.kitchens.find(k => k.this === kitchen)
			console.log(forkedKitchen);
			 


		} else {
		}
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