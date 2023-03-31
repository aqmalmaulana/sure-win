import Big from "big.js";
import { Request, Response } from "express";
import { ErrorType } from "../../../enum";
import { BusinessError } from "../../../helper/handleError";
import { Validation, Validator } from "../../../helper/validator";
import { apiRouter } from "../../../interfaces";
import { CustomerService } from "../../../services/internal/customerService";
import { InvoiceService } from "../../../services/internal/invoiceService";
import { OrderSerivce } from "../../../services/internal/orderService";

const path = "/v1/order/transaction-history/:id";
const method = "GET";
const auth = "user";

const paramsValidation: Validation[] = [
    {
        name: "id",
        required: true,
        type: "string",
    },
];

const queryValidation: Validation[] = [
    {
        name: "page",
        required: false,
        type: "string",
        default: "1",
    },
    {
        name: "size",
        required: false,
        type: "string",
        default: "10",
    },
    {
        name: "type",
        required: false,
        type: "string",
        default: "all",
    },
];

const main = async (req: Request, res: Response) => {
    const validate = new Validator(req, res);
    const params: {
        id: string;
    } = validate.process(paramsValidation, "params");
    const query: {
        page: string;
        size: string;
        type: string;
    } = validate.process(queryValidation, "query");

    const customerService = new CustomerService();
    let customer = await customerService.findById(params.id);
    if (!customer) {
        throw new BusinessError("Invalid User", ErrorType.NotFound);
    }

    const orderService = new OrderSerivce();
    const transactions = await orderService.findAllByCifId(
        customer.id,
        parseInt(query.page),
        parseInt(query.size),
        query.type,
    );

    res.status(200).send({
        page: query.page,
        totalPage: Math.ceil(transactions.count / parseInt(query.size)),
        size: query.size,
        type: query.type,
        data: transactions.transactions,
        totalData: transactions.count,
    });
};

const getTransactions: apiRouter = {
    path,
    method,
    main,
    auth,
};

export default getTransactions;
