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

    public async deleteCustomer(id: string): Promise<any> {
      return await this.request("DELETE", `customers/${id}`)
    }

    private async request(method: "POST" | "GET" | "PUT" | "DELETE", path: string, data?: any): Promise<any> {
        const config: RequestInit = {
          method,
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        };

        if(!config['body'] && data) {
          config['body'] = JSON.stringify(data)
        }

        console.log(config)
    
        try {
            const response = await fetch(`${this.baseUrl}/${path}`, config);
            return response.json();
        } catch (error) {
            const message = `An error occurred: ${error.message}`;
            throw new Error(message);
        }
    }
}