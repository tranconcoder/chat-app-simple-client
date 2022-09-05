import StartPageLayout from '../components/StartPage/Layout/Layout';
import SlideOne from '../components/StartPage/SlideOne';
import SlideThree from '../components/StartPage/SlideThree';
import SlideTwo from '../components/StartPage/SlideTwo';
import { ObjectAnyKey } from '../types/common';

const startRouteConfig: ObjectAnyKey = {
	'1': <StartPageLayout bodyElement={<SlideOne />} />,
	'2': <StartPageLayout bodyElement={<SlideTwo />} />,
	'3': <StartPageLayout bodyElement={<SlideThree />} />,
};

export default startRouteConfig;
