import { useAppSelector } from '../redux/hooks';

export function useCheckMyId() {
	const userId = useAppSelector((state) => state.auth.userId);
	const googleId = useAppSelector((state) => state.auth.googleId);

	return (id: string) => id === userId || id === googleId;
}
