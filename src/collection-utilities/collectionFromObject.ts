import { Collection } from "@discordjs/collection"

export function collectionFromObject<T extends Record<string, any>>(obj: T) {
	return new Collection(Object.entries(obj)) as Collection<
		keyof T,
		T[keyof T]
	>
}

export function collectionFromArray<T extends any[]>(
	arr: T
): Collection<T[number], number> {
	return new Collection(arr.map((v, i) => [v, i]))
}
