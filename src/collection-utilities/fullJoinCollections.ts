import { Collection } from "@discordjs/collection"

import { type CollectionKeyTypes, type CollectionValueTypes } from "./types"

export function fullJoinCollections<K, V, V2>(
	collectionA: Collection<K, V>,
	collectionB: Collection<K, V2>
) {
	return collectionA.merge(
		collectionB,
		(v) => ({
			keep: true,
			value: [v as V | null, null as V2 | null] as const,
		}),

		(v) => ({ keep: true, value: [null, v] as const }),
		(v1, v2, _) => ({
			keep: true,
			value: [v1, v2] as const,
		})
	) as Collection<K, FullJoinResult<V, V2>>
}
export type FullJoinResult<V, V2> = [V, null] | [null, V2] | [V, V2]

export function groupCollections<T extends Collection<any, any>[]>(
	collections: T
) {
	const aggregateCollection = new Collection<
		CollectionKeyTypes<T>,
		CollectionValueTypes<T>[]
	>()

	for (const collection of collections) {
		for (const [k, v] of collection) {
			aggregateCollection.ensure(k, () => []).push(v)
		}
	}
	return aggregateCollection
}
