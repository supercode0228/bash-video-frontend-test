import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import { RoomComponent, VideoItemComponent } from '../components/App/VideoRoom';
import { BFCButton } from '../components/Elements';
import '../assets/css/videoRoom.css';
import fakeData from '../constant/fakeRoomData.json';

const styles = {
	circleButton: {
		borderRadius: '50%',
	},
};

class VideoRoomPage extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			selectedRoom: {},
			videoSize: {
				width: '',
				height: '',
			},
		};
	}
	componentDidMount() {
		this.setState(
			{
				data: fakeData,
				selectedRoom: fakeData.length > 0 ? fakeData[0] : {},
			},
			() => {
				this.setVideoImageSize();
			}
		);

		window.addEventListener('resize', this.setVideoImageSize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.setVideoImageSize);
	}

	setVideoImageSize = () => {
		const { selectedRoom } = this.state;
		const count = selectedRoom ? selectedRoom.members.length : 0;

		if (count <= 1) this.resetVideoSize(1, 1);
		else if (count <= 2) this.resetVideoSize(2, 1);
		else if (count <= 4) this.resetVideoSize(2, 2);
		else if (count <= 6) this.resetVideoSize(3, 2);
		else if (count <= 9) this.resetVideoSize(3, 3);
		else if (count <= 12) this.resetVideoSize(4, 3);
		else this.resetVideoSize(4, 4);
	};

	resetVideoSize = (rowCount, columnCount) => {
		const layoutWidth =
			document.getElementById('videoRoom').clientWidth - columnCount * 3 - 30;
		const layoutHeight =
			document.getElementById('videoRoom').clientHeight - rowCount * 3 - 150;

		this.setState({
			videoSize: {
				width: layoutWidth / rowCount,
				height: layoutHeight / columnCount,
			},
		});
	};

	handleRoomSelect = (room) => {
		this.setState(
			{
				selectedRoom: room,
			},
			() => {
				this.setVideoImageSize();
			}
		);
	};

	handleMemberRemove = (member) => {
		const { selectedRoom } = this.state;
		const filteredMembers = selectedRoom.members.filter(
			(item) => item !== member
		);
		selectedRoom.members = filteredMembers;
		let data = this.state.data.map((item) => {
			if (item.id === selectedRoom.id) item = selectedRoom;
			return item;
		});

		this.setState(
			{
				selectedRoom,
				data,
			},
			() => {
				this.setVideoImageSize();
			}
		);
	};

	handleMemberAdd = () => {
		const { selectedRoom } = this.state;
		if (selectedRoom.members.length > 15)
			window.alert('Room roster should be 1 - 16 users.');
		else {
			selectedRoom.members.push({
				name: 'New Partner' + (selectedRoom.members.length + 1),
				avatar:
					'https://www.msudenver.edu/media/content/marketingandcommunications/images/Nguyen,-Mai-Linh_7944_160330-8x5.5cc.jpg',
			});

			let data = this.state.data.map((item) => {
				if (item.id === selectedRoom.id) item = selectedRoom;
				return item;
			});

			this.setState(
				{
					selectedRoom,
					data,
				},
				() => {
					this.setVideoImageSize();
				}
			);
		}
	};

	render() {
		const { data, selectedRoom, videoSize } = this.state;
		return (
			<div className='p-3'>
				<Row>
					<Col md='8' lg='9'>
						<div className='card-bg'>
							<div className='vidoe_area_header'>
								<h4>{selectedRoom.name}</h4>
								<BFCButton
									size='sm'
									name='ADD'
									color='primary'
									onClick={this.handleMemberAdd}
								/>
							</div>
							<div className='video_area_bg' id='videoRoom'>
								{!isEmpty(selectedRoom) ? (
									selectedRoom.members.map((item) => {
										return (
											<VideoItemComponent
												data={item}
												key={item.name}
												width={videoSize.width && videoSize.width}
												height={videoSize.height && videoSize.height}
												onRemoveMembmer={this.handleMemberRemove}
											/>
										);
									})
								) : (
									<h3>No Video</h3>
								)}
							</div>
						</div>
					</Col>
					<Col md='4' lg='3'>
						<div className='card-bg room_area_bg'>
							<div className='room_header'>
								<h5>Rooms</h5>
								<BFCButton
									size='sm'
									color='primary'
									name=''
									icon='fa fa-plus'
									style={styles.circleButton}
								/>
							</div>
							<div>
								{data.map((item) => {
									return (
										<RoomComponent
											data={item}
											key={item.id}
											isSelected={item === selectedRoom}
											onClick={this.handleRoomSelect}
										/>
									);
								})}
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default VideoRoomPage;
