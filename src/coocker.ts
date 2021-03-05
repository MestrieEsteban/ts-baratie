export default class Cooker {
	public status: string = "libre"
	private createTime: number

	constructor(createTime: number) {
		this.createTime = createTime
	}

	public getStatus() {
		return this.status
	}

	
}