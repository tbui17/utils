import { type Collection } from "@discordjs/collection"

export function innerJoinCollections<K, V, V2, R>(
	collectionA: Collection<K, V>,
	collectionB: Collection<K, V2>,
	select: (value: V, valueOther: V2, key: K) => R
): Collection<K, R>

export function innerJoinCollections<K, V, V2, R>(
	collectionA: Collection<K, V>,
	collectionB: Collection<K, V2>
): Collection<K, [V, V2]>

export function innerJoinCollections<K, V, V2, R>(
	collectionA: Collection<K, V>,
	collectionB: Collection<K, V2>,
	select?: (value: V, valueOther: V2, key: K) => R
) {
	return collectionA.merge(
		collectionB,
		() => ({ keep: false }),
		() => ({ keep: false }),
		(v1, v2, k) => ({
			keep: true,
			value: select ? select(v1, v2, k) : ([v1, v2] as const),
		})
	)
}
