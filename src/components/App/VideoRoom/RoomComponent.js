import React from 'react';

import { BFCButton } from '../../Elements';

const RoomComponent = ({ data, onClick, isSelected }) => {
	return (
		<div
			className={`room_roster_bg ${isSelected && 'room_roster_bg_selected'}`}
			onClick={() => onClick(data)}
		>
			<div className='room_roster_header'>
				<h6>{data.name}</h6>
				<div className='d-flex'>
					{!data.isJoin && <BFCButton size='sm' color='success' name='JOIN' />}
				</div>
			</div>
			<div>
				{data.members.map((item) => {
					return (
						<div className='room_member' key={item.name}>
							<img className='room_member_avatar' src={item.avatar} alt='' />
							<span>&nbsp;&nbsp;{item.name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RoomComponent;
