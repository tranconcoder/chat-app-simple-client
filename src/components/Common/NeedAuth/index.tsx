import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

function NeedAuth(props: { children: ReactElement }) {
	const navigate = useNavigate();

	const googleId = useAppSelector((state) => state.auth.googleId);
	const userId = useAppSelector((state) => state.auth.userId);

	useEffect(() => {
		if (!googleId && !userId) navigate('/auth/login');
	}, [googleId, userId]);

	return <>{props.children}</>;
}

export default NeedAuth;
