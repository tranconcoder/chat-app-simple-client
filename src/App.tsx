import { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NeedAuth from './components/Common/NeedAuth';
import HandleLogin from './components/HandleLogin';
import MessageStore from './components/MessageStore';
import SlideOne from './components/StartPage/SlideOne';
import ToastMessage from './components/ToastMessage';
import startRouteConfig from './config/startRoute.config';
import ChatPage from './pages/Chat';
import ChatMenuPage from './pages/ChatMenu';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import socket from './services/socket/index.socket';

function App() {
	useEffect(() => {
		// socket.connect();
	}, []);

	return (
		<Fragment>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route path="/" element={<SlideOne />} />

						{Object.entries(startRouteConfig).map(
							([key, value], index) => {
								return (
									<Route
										key={index}
										path={key}
										element={value}
									/>
								);
							}
						)}
					</Route>

					<Route path="/auth">
						<Route
							path="login"
							element={
								<NeedAuth>
									<LoginPage />
								</NeedAuth>
							}
						/>
						<Route
							path="register"
							element={
								<NeedAuth>
									<RegisterPage />
								</NeedAuth>
							}
						/>
					</Route>

					<Route
						path="/chat"
						element={
							<NeedAuth>
								<ChatMenuPage />
							</NeedAuth>
						}
					/>

					<Route
						path="/chat/:id"
						element={
							<NeedAuth>
								<ChatPage />
							</NeedAuth>
						}
					/>
				</Routes>
			</BrowserRouter>

			<HandleLogin />
			<ToastMessage />
			<MessageStore />
		</Fragment>
	);
}

export default App;
