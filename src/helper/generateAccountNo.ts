import { CustomerService } from "../services/internal/customerService"

export const generateAccountNo = async() => {
    const customerService = new CustomerService()
    const lastId: any = await customerService.getLastIdCustomer()
    let lastNum = 1
    if(lastId) {
        const lastIdMonth = lastId?.accountNo.slice(4, 6);
        const currentMonth = new Date().getMonth() + 1;
        if (+lastIdMonth === currentMonth) {
          lastNum = +lastId?.accountNo.slice(8) + 1
        }
    }

    const date = new Date();
    const year = date.getFullYear().toString().slice(-2).padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const result =  `XD${year}${month}${day}${lastNum.toString().padStart(5, "0")}`;
    
    return result
}