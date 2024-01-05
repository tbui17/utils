export class SwapBuilder<T extends Record<string, any>> {
	private clone
	constructor(obj: T) {
		this.clone = { ...obj }
	}

	swap<K extends keyof T>(key1: K, key2: K) {
		const temp = this.clone[key1]
		this.clone[key1] = this.clone[key2]
		this.clone[key2] = temp
		return this
	}

	build() {
		return this.clone
	}
}
