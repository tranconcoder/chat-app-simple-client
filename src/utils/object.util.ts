import { ObjectAnyKey } from '../types/common';

export const copyFieldValueObj = (
	obj: ObjectAnyKey,
	objToCopy: ObjectAnyKey
) => {
	Object.keys(obj).forEach((key) => {
		obj[key] = objToCopy[key] || obj[key];
	});
};
