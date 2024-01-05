import { Collection } from "@discordjs/collection"

export async function mapValuesAsyncSettled<
	TCollectionKey,
	TCollectionValue,
	TReturn,
>(
	collection: Collection<TCollectionKey, TCollectionValue>,
	mapFn: (
		value: TCollectionValue,
		key: TCollectionKey,
		collection: Collection<TCollectionKey, TCollectionValue>
	) => Promise<TReturn>
) {
	const fulfilled = new Collection<TCollectionKey, TReturn>()
	const rejected = new Collection<TCollectionKey, Error>()

	await Promise.allSettled(
		collection.map((value, key, collection) =>
			mapFn(value, key, collection)
		)
	).then((settled) => {
		settled.forEach((result, i) => {
			const key = collection.keyAt(i)!

			if (isRejectedResult(result)) {
				rejected.set(key, result.reason)
				return
			}
			fulfilled.set(key, result.value)
		})
	})

	return {
		fulfilled,
		rejected,
	}
}
export async function mapValuesAsync<TCollection, TCollectionValue, TReturn>(
	collection: Collection<TCollection, TCollectionValue>,
	mapFn: (
		value: TCollectionValue,
		key: TCollection,
		collection: Collection<TCollection, TCollectionValue>
	) => Promise<TReturn>
) {
	const results = await Promise.all(
		collection.map(async (value, key, collection) => {
			return [key, await mapFn(value, key, collection)] as const
		})
	)

	return new Collection(results)
}
export function isRejectedResult<T>(
	result: PromiseSettledResult<T>
): result is PromiseRejectedResult {
	return result.status === "rejected"
}
