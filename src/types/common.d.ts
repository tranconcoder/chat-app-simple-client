export interface ObjectAnyKey extends Object {
	[key: string]: any;
}

export interface Profile {
	googleId: string;
	firstName?: string;
	lastName?: string;
	displayName: string;
	email?: string;
	avatar?: string;
}
