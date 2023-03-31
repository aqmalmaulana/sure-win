import { Request, Response } from "express";
import { ErrorType, OrderStatuses, OrderType, RoleID } from "../../../enum";
import { Validation, Validator } from "../../../helper/validator";
import { CustomerService } from "../../../services/internal/customerService";
import { CustomerRoleService } from "../../../services/internal/customerRoleService";
import { apiRouter } from "../../../interfaces";
import { BusinessError } from "../../../helper/handleError";
import { FundService } from "../../../services/internal/fundsService";
import { OrderSerivce } from "../../../services/internal/orderService";
import { Config } from "../../../config";
import { UniqueGenerator } from "../../../helper/uniqueGenerator";
import { FundsDto } from "../../../dto/fundsDto";
import { ExternalJWTService } from "../../../services/external/externalJWTService";

const path = "/v1/customer/registration";
const method = "POST";
const auth = "guess";
const bodyValidation: Validation[] = [
    {
        name: "username",
        type: "string",
        required: true,
    },
    {
        name: "email",
        type: "string",
        isEmail: true,
        required: true,
    },
    {
        name: "address",
        type: "string",
        required: true,
    },
    {
        name: "password",
        type: "string",
        required: true,
    },
    {
        name: "confirmPassword",
        type: "string",
        required: true,
    },
];
const main = async (req: Request, res: Response) => {
    const requestBody: {
        username: string;
        email: string;
        address: string;
        password: string;
        confirmPassword: string;
    } = new Validator(req, res).process(bodyValidation, "body");
    if (!requestBody) {
        return;
    }

    if (requestBody.password !== requestBody.confirmPassword) {
        throw new BusinessError("Password and confirm password not match", ErrorType.Validation);
    }

    const customerService = new CustomerService();
    const roleService = new CustomerRoleService();

    const existCustomer = await customerService.findByEmailOrUsername(requestBody.email, requestBody.username);
    if (existCustomer) {
        throw new BusinessError("Username or email has registered", ErrorType.Duplicate);
    }

    const generateAccountNo = UniqueGenerator.accountNo(requestBody.username);
    const userRole = await roleService.findByName("user");
    const newCustomer = await customerService.create({
        email: requestBody.email,
        username: requestBody.username,
        accountNo: generateAccountNo,
        password: requestBody.password,
        authentication: false,
        address: requestBody.address,
        roleId: userRole?.id || RoleID.User,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const fundService = new FundService();
    const newFund: FundsDto = {
        cifId: newCustomer.id,
        currency: "TRX",
        balance: "0",
        updatedAt: new Date(),
    };
    const totalUser = await customerService.countUser();
    if (totalUser < parseInt(new Config().maxBonusUser.toString())) {
        const trxRefNo = await UniqueGenerator.invoice(newCustomer, OrderType.BONUS);
        const config = new Config();
        const bonus = config.bonusNewRegistration.toString();
        newFund.bonus = bonus;

        const orderService = new OrderSerivce();
        const newBonus = await orderService.create({
            cifId: newCustomer.id,
            description: "Bonus for new customer",
            trxRefNo,
            priceAmount: bonus,
            priceCurrency: "TRX",
            status: OrderStatuses.FINISHED,
            type: OrderType.BONUS,
            payAmount: bonus,
            payCurrency: "TRX",
            createdAt: new Date(),
            updatedAt: new Date(),
            amount: bonus,
        });
    }
    const createFund = await fundService.create(newFund);

    const externalJWTService = new ExternalJWTService();
    const accessToken = externalJWTService.createAccessToken({ id: newCustomer.id, rid: newCustomer.roleId });
    const refreshToken = externalJWTService.createRefreshToken({ id: newCustomer.id, rid: newCustomer.roleId });

    res.cookie("token", refreshToken, {
        httpOnly: true,
    });

    return res.status(200).send({
        id: newCustomer.id,
        accessToken,
        refreshToken,
    });
};

const postCustomerRegister: apiRouter = {
    path,
    method,
    main,
    auth,
};

export default postCustomerRegister;
