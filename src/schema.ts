import {object, string, ObjectSchema} from "yup";

export type RegistrationFormFields = {
	name: string;
	email: string;
	password: string;
	nickName: string;
}

export const RegistrationFormFieldsSchema: ObjectSchema<RegistrationFormFields> = object({
	name: string().min(3).required(),
	email: string().email().required(),
	password: string().min(8).matches(/[A-Z]+/, { excludeEmptyString: true }).required(),
	nickName: string().min(3).required(),
}).required();
