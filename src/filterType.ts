export function filterType<T extends { type: string }, TType extends T["type"]>(
	s: T,
	type: TType
): s is Extract<T, { type: TType }> {
	return s.type === type
}
