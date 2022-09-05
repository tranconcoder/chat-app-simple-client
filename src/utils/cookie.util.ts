export function setCookie(cname: string, cvalue: string, expTimes: number) {
	const date = new Date();
	date.setTime(date.getTime() + expTimes);

	let expires = 'expires=' + date.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname: string) {
	const name = cname + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];

		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}

		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}

	return '';
}

export function removeCookie(cname: string) {
	setCookie(cname, '', -60000);
}
