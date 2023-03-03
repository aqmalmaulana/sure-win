import { CustomerDto } from "../dto/customerDto"
import { CustomerService } from "../services/internal/customerService"
import { OrderSerivce } from "../services/internal/orderService";

export class UniqueGenerator {
  private static generateDate() {
    const date = new Date();
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return { date, year, month, day };
  }

  static async accountNo(): Promise<any> {
    const customerService = new CustomerService();
    const lastId = await customerService.getLastIdCustomer();
    let lastNum = 1;
    if (lastId) {
      const lastIdMonth = lastId?.accountNo.slice(6, 8);
      const currentMonth = new Date().getMonth() + 1;
      if (+lastIdMonth === currentMonth) {
        lastNum = +lastId?.accountNo.slice(10) + 1;
      }
    }

    const dates = UniqueGenerator.generateDate();
    const result = `TST-${dates.year.slice(-2).padStart(2, "0")}${dates.month}${dates.day}${lastNum.toString().padStart(6, "0")}`;

    return result;
  }

  static async invoice(data: CustomerDto): Promise<any> {
    const orderService = new OrderSerivce();
    const latestOrder = await orderService.findLatestTrxRefNoByAccountNo(data.accountNo)
    let lastNum = 1;
    if (latestOrder) {
      const getNum = latestOrder.trxRefNo.split("/");
      const currentMonth = new Date().getMonth() + 1;
      if (+getNum[3] === currentMonth) {
        lastNum = +getNum[4] + 1;
      }
    }

    const dates = UniqueGenerator.generateDate();
    const result = `INV/${data.accountNo}/${dates.year}/${dates.month}/${lastNum.toString().padStart(3, "0")}`;
    return result
  }
}
