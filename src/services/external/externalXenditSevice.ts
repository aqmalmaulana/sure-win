import { Config } from "../../config";

export class ExternalXenditService {
    private apiKey: string;
    private baseUrl: string;
    constructor() {
        const config = new Config()
        this.apiKey = config.xenditApiKey
        this.baseUrl = config.xenditApiUrl
    }

    public async postCustomer(data: {accountNo: string; name: string; mobileNumber: number; description?: string}): Promise<any> {
        console.log(`POST NEW CUSTOMER XENDIT`)
        console.log(data)
        return await this.request("POST", "customers", {
            reference_id: data.accountNo,
            type: "INDIVIDUAL",
            individual_detail: {
                given_names: data.name
            },
            mobile_number: "+62" + data.mobileNumber,
            description: data.description
        })
    }

    public async updateCustomer(data: {xenditId: string; name: string; mobileNumber: number; description?: string}): Promise<any> {
        return await this.request("PATCH", `customers/${data.xenditId}`, {
            type: "INDIVIDUAL",
            individual_detail: {
                given_names: data.name
            },
            mobile_number: "+62" + data.mobileNumber,
            description: data.description
        })
    }

    public async createInvoice(data: {trxRefNo: string; amount: number, accountNo: string}): Promise<any> {
        return await this.request("POST", "v2/invoices", {
            external_id: data.trxRefNo,
            amount: data.amount,
            description: "New Deposit for account " + data.accountNo,
            payment_methods: ["BCA", "BNI", "BRI", "QRIS", "OVO", "DANA", "SHOPEEPAY"],
            items: [{
                name: "Topup",
                quantity: 1,
                price: data.amount
            }]
        })
    }

    private async request(method: "POST" | "GET" | "PATCH" | "DELETE", path: string, data?: any): Promise<any> {
        const config: RequestInit = {
          method,
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        };

        if(!config['body'] && data) {
            console.log("Request Body to Xendit : " + JSON.stringify(data))
            config['body'] = JSON.stringify(data)
        }
    
        try {
            const response = await fetch(`${this.baseUrl}/${path}`, config);
            const res = await response.json()
            console.log("Response Body from Xendit : " + JSON.stringify(res))
            return res
        } catch (error) {
            const message = `An error occurred: ${error.message}`;
            throw new Error(message);
        }
    }
}

interface IAddress {
    country: string;
    streetLine1?: string;
    streetLine2?: string;
    city?: string;
    province?: string;
    state?: string;
    postalCode?: string;
}

interface ICreateCustomer {
    referenceID: string;
    mobileNumber?: string;
    email?: string;
    givenNames: string;
    middleName?: string;
    surname?: string;
    description?: string;
    phoneNumber?: string;
    nationality?: string;
    addresses?: IAddress[];
    dateOfBirth?: string;
    metadata?: object;
    apiVersion?: string;
}