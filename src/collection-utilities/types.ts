import { type Collection } from "@discordjs/collection"

export type CollectionValueTypes<T> = T extends Collection<any, infer V>[]
	? V
	: never
export type CollectionKeyTypes<T> = T extends Collection<infer K, any>[]
	? K
	: never
