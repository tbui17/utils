import { type Collection } from "@discordjs/collection"

/**
 * The new collection stores the reference to the original collections instead of only the values. Use map as usual to get the values.
 */

export function crossJoinCollections<K, V, K2, V2>(
	collectionA: Collection<K, V>,
	collectionB: Collection<K2, V2>
): Collection<K, [A: typeof collectionA, B: typeof collectionB]> {
	return collectionA.mapValues((_v, _k, coll) => {
		return [coll, collectionB]
	})
}
