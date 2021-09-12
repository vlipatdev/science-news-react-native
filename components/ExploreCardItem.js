import React from 'react';
import { Image } from 'react-native';

import { Text, Layout } from '@ui-kitten/components';

export const ExploreCardItem = ({ name, imagePath }) => {
	return (
		<Layout
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 10,
				padding: 8,
				aspectRatio: 1,
			}}
		>
			<Layout
				style={{
					borderColor: 'rgba(143, 155, 179, 0.16)',
					borderWidth: 1,
					marginBottom: 8,
					borderRadius: 20,
					overflow: 'hidden',
					alignSelf: 'center',
				}}
			>
				<Image
					style={{
						height: 35,
						width: 35,
						resizeMode: 'contain',
					}}
					source={imagePath}
				/>
			</Layout>
			<Text numberOfLines={1} category="c1" style={{ textAlign: 'center' }}>
				{name}
			</Text>
		</Layout>
	);
};
