import React from 'react';
import { Image } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

export const ArticleListItem = ({
	title,
	website,
	date,
	imageUrl,
	imagePath,
}) => {
	return (
		<Layout
			style={{
				marginHorizontal: 12,
				marginTop: 12,
				padding: 16,
				flexDirection: 'row',
				borderRadius: 10,
			}}
		>
			<Layout style={{ flex: 1 }}>
				<Text style={{ marginBottom: 8, lineHeight: 20 }}>{title}</Text>
				<Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Layout
						style={{
							borderColor: 'rgba(143, 155, 179, 0.16)',
							borderWidth: 1,
							borderRadius: 20,
							overflow: 'hidden',
							alignSelf: 'center',
							marginRight: 8,
						}}
					>
						<Image
							style={{
								height: 15,
								width: 15,
								resizeMode: 'contain',
							}}
							source={imagePath}
						/>
					</Layout>
					<Text category="c1" appearance="hint">
						{website}
					</Text>
					<Text category="c1" appearance="hint" style={{ marginHorizontal: 8 }}>
						/
					</Text>
					<Text category="c1" appearance="hint">
						{date}
					</Text>
				</Layout>
			</Layout>
			{imageUrl === '' ? null : (
				<Layout
					style={{
						borderRadius: 10,
						overflow: 'hidden',
						marginLeft: 16,
						height: 80,
						width: 120,
					}}
				>
					<Image
						source={{ uri: imageUrl }}
						style={{
							height: '100%',
							width: '100%',
							backgroundColor: 'rgba(143, 155, 179, 0.16)',
						}}
					/>
				</Layout>
			)}
		</Layout>
	);
};
