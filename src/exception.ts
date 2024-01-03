

export class Exception<const TMessage extends string = string, TData = any> extends Error {
    constructor(public message: TMessage, public data?: TData) {
        super(message)
    }
}