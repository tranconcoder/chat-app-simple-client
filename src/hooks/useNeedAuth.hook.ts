import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function useNeedAuth() {
	const navigate = useNavigate();

	const userId = useAppSelector((state) => state.auth.userId);
	const googleId = useAppSelector((state) => state.auth.googleId);

	useEffect(() => {
		if (!googleId && !userId) navigate('/login');
	}, []);
}
