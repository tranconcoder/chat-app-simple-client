export interface RegisterInitValues
	extends Pick<
		AuthStore,
		'firstName' | 'lastName' | 'gender' | 'email'
	> {
	username: string;
	password: string;
	confirmPassword: string;
}
