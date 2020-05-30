import React from 'react';
import { Button } from 'react-bootstrap';
const BFCButton = ({ name, type, size, color, icon, style, onClick }) => {
	return (
		<Button
			className='mx-1'
			type={type}
			size={size}
			variant={color}
			style={style}
			onClick={onClick}
		>
			{icon && <i className={icon} />}
			<span>{name}</span>
		</Button>
	);
};

export default BFCButton;
