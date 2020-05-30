import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { VideoRoomPage } from './pages';

const Routes = () => (
	<Router>
		<div className='main_bg'>
			<Route exact path='/' component={VideoRoomPage} />
		</div>
	</Router>
);

export default Routes;
