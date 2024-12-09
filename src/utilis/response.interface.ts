export interface RequestResponse<T> {
    message: string,
    statusCode: number,
    data: T
}