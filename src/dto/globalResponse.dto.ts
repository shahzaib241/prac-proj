export class ErrorResponse<T> {
    statusCode: number;
    message: T;
}

export class SuccessResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}