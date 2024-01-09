type RenameKeys<
	T extends Record<string, unknown>,
	T2 extends Partial<Record<keyof T, string>>,
> = Omit<T, keyof T2> & {
	[K in keyof T2 as K extends keyof T
		? T2[K] extends string
			? T2[K]
			: never
		: never]: K extends keyof T ? T[K] : never
}

export function renameKeys<
	T extends Record<string, unknown>,
	T2 extends Partial<Record<keyof T, string>>,
>(obj: T, mappings: T2) {
	const result = {} as Record<string, unknown>
	for (const key in obj) {
		const newKey = mappings[key] ?? key
		result[newKey] = obj[key]
	}

	return result as RenameKeys<T, T2>
}
