export enum ErrorType {
    Authentication = "AuthenticationError",
    Authorization = "AuthorizationError",
    Validation = "ValidationError",
    NotFound = "NotFoundError",
    Internal = "InternalServerError",
    Duplicate = "DuplicateError"
}

export enum ErrorStatusCode {
    Authentication = 401,
    Authorization = 403,
    Validation = 422,
    NotFound = 404,
    Internal = 500,
    Duplicate = 409
}

export enum RoleID {
    Admin = "71af2f12-eaa3-4e36-850f-174b52167eb0",
    User = "949cbaf5-7d0c-4d9d-99f4-9c2f03dd0fd0",
}

export enum OrderStatuses {
    PENDING = "1",
    PROCESSING = "2",
    COMPLETED = "3",
    REJECTED = "4",
    FAILED = "5"
}

export enum InvoiceStatuses {
    PENDING = "1",
    PROCESSING = "2",
    COMPLETED = "3",
    REJECTED = "4",
    FAILED = "5",
    PAID = "6"
}