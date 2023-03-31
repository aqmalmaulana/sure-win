import { Request, Response } from "express";
import { GameDto } from "../../../dto/gameDto";
import { Validation, Validator } from "../../../helper/validator";
import { apiRouter } from "../../../interfaces";
import RedisService from "../../../services/external/externalRedisService";
import { GameService } from "../../../services/internal/gameService";
import { GameTypeService } from "../../../services/internal/gameTypeService";

const path = "/v1/result-game/:id";
const method = "GET";
const auth = "guess";

const paramsValidation: Validation[] = [
    {
        name: "id",
        required: true,
        type: "string",
    },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async (req: Request, res: Response) => {
    const validate = new Validator(req, res);
    const params: {
        id: string;
    } = validate.process(paramsValidation, "params");

    const redisService = new RedisService();
    const keyRedis = `result/${params.id}`;
    let result;
    let conditions = true;
    while (conditions) {
        const cached: GameDto = await redisService.getJson(keyRedis);
        console.log(cached);
        if (!cached && !cached.result.color) {
            conditions = false;
            result = cached;

            await redisService.del(keyRedis);
        }

        setTimeout(() => {}, 1000);
    }

    res.status(200).send(result);
};

const getResultGame: apiRouter = {
    path,
    method,
    main,
    auth,
};

export default getResultGame;
