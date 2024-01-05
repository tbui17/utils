import { type Collection } from "@discordjs/collection"

type CollectionValueIterator<K, V extends any[], R> = (
	value: V[number],
	key: K,
	collection: Collection<K, V>
) => R

export function eachCollectionValues<K, V extends any[]>(
	collection: Collection<K, V>,
	fn: CollectionValueIterator<K, V, void>
) {
	collection.each((v, k, c) => {
		v.forEach((v2) => {
			fn(v2, k, c)
		})
	})
	return collection
}

export function mapCollectionValues<K, V extends any[], R>(
	collection: Collection<K, V>,
	fn: CollectionValueIterator<K, V, R>
) {
	return collection.mapValues((v, k, c) => {
		return v.map((v2) => {
			return fn(v2, k, c)
		})
	})
}
