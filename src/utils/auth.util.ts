export const handleLogin = async (): Promise<
	[accessToken: string, refreshToken: string]
> =>
	new Promise((resolve) => {
		window.removeEventListener('message', handleListenMessage);

		const loginUrl = 'http://localhost:3000/auth/google';
		const loginWindow = window.open(loginUrl);

		function handleListenMessage(e: MessageEvent<any>) {
			loginWindow?.close();

			console.log(e.data);
			resolve(e.data);

			window.removeEventListener('message', handleListenMessage);
		}

		window.addEventListener('message', handleListenMessage);
	});
