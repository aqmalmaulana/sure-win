export enum ErrorStatus {
    JWTInvalidToken = "ERR200",
    JWTTokenNotFound = "ERR201",
    
    InvalidQuery = "ERR001",
    
    CustomerAlreadyExisst = "ERR100",
    CustomerNotFound = "ERR101",
    CustomerCannotAccess = "ERR105"
}

export enum RoleID {
    Admin = "71af2f12-eaa3-4e36-850f-174b52167eb0",
    User = "949cbaf5-7d0c-4d9d-99f4-9c2f03dd0fd0",
}

export enum InvoiceStatuses {
    PENDING = "1"
}