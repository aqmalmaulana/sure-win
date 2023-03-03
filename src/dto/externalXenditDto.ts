export class CreateCustomerXenditExternal {
    accountNo: string; 
    name: string; 
    mobileNumber: number; 
    description?: string;
}

export class UpdateCustomerXenditExternal {
    xenditId: string; 
    name: string; 
    mobileNumber: number; 
    description?: string;
}

export class CreateInvoiceExternal {
    trxRefNo: string; 
    amount: number; 
    accountNo?: string; 
    description?: string;
    payer_email: string;
    currency: string;
    customer?: {
        given_name: string;
        surname?: string;
        email: string;
        mobile_number: string;
    };
    items: [{
        name: string,
        quantity: number,
        price: number
    }]
    payment_methods: string[];
}