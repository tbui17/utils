export function isNonNullableObject<T extends Record<string, any>>(
	value: T,
	fn: (value: T) => boolean
): value is { [K in keyof T]: NonNullable<T[K]> } {
	return fn(value)
}

export function assertNonNullableObject<T extends Record<string, any>>(
	value: T,
	fn: (value: T) => boolean,
	message = `${JSON.stringify(value)} is not a non-nullable object`
): asserts value is { [K in keyof T]: NonNullable<T[K]> } {
	if (!fn(value)) {
		throw new Error(message)
	}
}
