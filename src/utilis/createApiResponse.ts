export const createErrorResponse = (statusCode: number, message: string) => {
    return {
        statusCode,
        message,
    };
};

export const createSuccessResponse = <T>(statusCode: number, message: string, data: T) => {
    return {
        statusCode,
        message,
        data
    };
};