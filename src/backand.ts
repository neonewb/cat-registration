import {RegistrationFormFields} from './schema'

const sleep1Sec = () => new Promise((resolve) => setTimeout(resolve, 1000))

let isError = true

export const createCat = async (data: RegistrationFormFields) => {
	await sleep1Sec()

	if (isError) {
		isError = false
		return false
	}

	return true
}