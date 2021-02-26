import { exit } from "process";
import * as readline from 'readline';

class Reception {


	public cookingTime: number;
	public cooksKitchen: number;
	public createTime: number;
	private read: readline.Interface


	constructor() {

		this.cookingTime = parseInt(process.argv[2])
		this.cooksKitchen = parseInt(process.argv[3])
		this.createTime = parseInt(process.argv[4])
		if (this.cookingTime !== this.cookingTime) this.errorCookingTime()
		if (this.cooksKitchen !== this.cooksKitchen) this.errorCooksKitchen()
		if (this.createTime !== this.createTime) this.errorCreateTime()
		this.read = readline.createInterface({ input: process.stdin })


		console.log(`              |    |    |                 
             )_)  )_)  )_)              
            )___))___))___)\\            
           )____)____)_____)\\\\
         _____|____|____|____\\\\\\__
---------\\                   /---------
        ^^^^^^^^^^^^^^^^^^^^^`);

		this.takeOrder()
	}

	public async takeOrder() {
		console.log(`What do you want ?`)
		this.read.question('', async (order: string) => {
			switch (order.toLowerCase()) {
				case 'status':
					console.log(this.cookingTime);
					console.log(this.cooksKitchen);
					console.log(this.createTime);
					break;
				default:
					this.getOrder(order)
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
		let ordersTab: Array<string> = orders.split(';');
		let test = {}
		ordersTab.forEach((element, index) => {
			let a = element.split(' ');
			a.forEach(e => {
				if (e != '')
					test[index].push(e)
			})
		});
		console.log(test[0]);
		
	}

}

export default Reception