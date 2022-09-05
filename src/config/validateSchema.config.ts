import * as Yup from 'yup';
import {
	confirmPasswordSchema, emailSchema,
	firstNameSchema,
	genderSchema,
	lastNameSchema,
	passwordSchema,
	usernameSchema
} from './yupFieldStore.config';

export const loginValidationSchema = Yup.object({
	username: usernameSchema,
	password: passwordSchema,
});

export const registerValidationSchema = Yup.object({
	username: usernameSchema,
	password: passwordSchema,
	confirmPassword: confirmPasswordSchema,
	email: emailSchema,
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	gender: genderSchema,
});
