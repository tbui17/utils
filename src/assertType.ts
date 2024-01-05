export function assertType<T extends { type: string }, TType extends T["type"]>(
	s: T,
	type: TType
): asserts s is Extract<T, { type: TType }> {
	if (s.type !== type) {
		throw new Error(`expected ${type} but got ${s.type}`)
	}
}
