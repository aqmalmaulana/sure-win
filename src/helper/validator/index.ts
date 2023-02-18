import { Request, Response } from "express";
import validator from "validator"
import { ErrorStatus } from "../../enum";

export interface Validation {
    name?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    type?: "string" | "number" | "boolean" | "array" | "object";
}

export class Validator {
    protected request: Request;
    protected response: Response
    constructor(req: Request, res: Response) {
        this.request = req
        this.response = res
    }

    public query(schema: Validation[]): any {
        const result = this.checking(schema, 'query')
        if(!result.success) {
            this.response.status(400).send({
                error: ErrorStatus.InvalidQuery,
                message: result.message
            })
            return
        }
        return {
            ...this.request['query']
        }
    }

    protected checking(schemas: Validation[], type) {
        const req: any = this.request[type]
        const result: {
            success: boolean;
            message: string
        } = {success: false, message: ""}

        for(const field in req) {
            if(!schemas.find(schema => schema.name === field)) {
                result.message = `Field ${field} is not supported`
                return result
            }
        }

        for(const schema of schemas) {
            const value = req[schema.name]?.trim()
            console.log(!value)
            
            if((schema.required && validator.isEmpty(value)) || (schema.required && !req[schema.name])) {
                result.message = `Field ${schema.name} is required`
                return result
            } else if(!schema.required && !value) {
                continue;
            } else {
                switch (schema.type) {
                    case 'string':
                        if(typeof value !== "string") {
                            result.message = `Field ${schema.name} must be a string`
                            return result
                        } else if (schema.minLength && value.length < schema.minLength) {
                            result.message = `Field ${schema.name} must be at least ${schema.minLength} characters`
                            return result
                        } else if (schema.maxLength && value.length > schema.maxLength) {
                            result.message = `Field ${schema.name} must be at most ${schema.maxLength} characters`
                            return result
                        }
                        break;
                    
                    case 'number':
                        if(!validator.isNumeric(value)) {
                            result.message = `Field ${schema.name} must be number`
                            return result
                        }
                        break;
                    
                    case 'number':
                        if(!validator.isNumeric(value)) {
                            result.message = `Field ${schema.name} must be number`
                            return result
                        }
                        break;
                    
                    case 'number':
                        if(!validator.isNumeric(value)) {
                            result.message = `Field ${schema.name} must be number`
                            return result
                        }
                        break;

                    case 'array':
                        if (!Array.isArray(value)) {
                            result.message =`Field ${schema.name} should be an array`;
                            return result
                        }
                        break;

                    case 'object':
                        if (typeof value !== 'object') {
                            result.message = `Field ${schema.name} should be an object`;
                            return result
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        result.success = true
        result.message = "No have any error validation"
        return result
    }
}