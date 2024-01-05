import { type z } from "zod"

export function zodGuard<T extends z.ZodType<any>>(
	schema: T,
	value: unknown
): value is z.infer<T> {
	return schema.safeParse(value).success
}
