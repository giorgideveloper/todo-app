import React from 'react';
import ContentLoader from 'react-content-loader';

const Loading = props => (
	<ContentLoader
		speed={2}
		width='100%'
		height={150}
		viewBox='0 0 400 150'
		backgroundColor='#d9d9d9'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='387' cy='61' r='11' />
		<rect x='36' y='48' rx='5' ry='5' width='328' height='27' />
		<rect x='3' y='50' rx='0' ry='0' width='20' height='19' />
		<circle cx='388' cy='94' r='11' />
		<rect x='36' y='81' rx='5' ry='5' width='328' height='27' />
		<rect x='3' y='85' rx='0' ry='0' width='20' height='19' />
		<circle cx='388' cy='128' r='11' />
		<rect x='36' y='115' rx='5' ry='5' width='328' height='27' />
		<rect x='3' y='120' rx='0' ry='0' width='20' height='19' />
	</ContentLoader>
);

export default Loading;
