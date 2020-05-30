import React from 'react';

import { BFCButton } from '../../Elements';

const VideoItemComponent = ({ data, width, height, onRemoveMembmer }) => {
	let radius = width;
	const styles = {
		videoDiv: {
			width: radius,
			height: radius,
		},
		circleButton: {
			borderRadius: '50%',
			position: 'absolute',
			display: 'none',
			zIndex: '1',
		},
	};
	return (
		<div style={styles.videoDiv} className='video_item_div'>
			<BFCButton
				size='lg'
				color='secondary'
				icon='fa fa-trash'
				className='video_item_remove_btn'
				style={styles.circleButton}
				onClick={() => onRemoveMembmer(data)}
			/>
			<img className='video_item_img' src={data.avatar} alt='' />
		</div>
	);
};

export default VideoItemComponent;
