import { type ConditionalPick, type ConditionalExcept } from "type-fest"
import pickBy from "lodash/pickBy"

export function removeUndefinedKeys<T extends Record<string, unknown>>(obj: T) {
	return pickBy(obj, (v) => v !== undefined) as ConditionalExcept<
		T,
		undefined
	> &
		Partial<ConditionalPick<T, undefined>>
}
