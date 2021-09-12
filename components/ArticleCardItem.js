import React from 'react';
import { Image } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

export const ArticleCardItem = ({
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
				height: 'auto',
				borderRadius: 10,
			}}
		>
			{imageUrl === '' ? null : (
				<Layout
					style={{
						borderTopRightRadius: 10,
						borderTopLeftRadius: 10,
						overflow: 'hidden',
					}}
				>
					<Image
						source={{ uri: imageUrl }}
						style={{
							height: 200,
							width: '100%',
							backgroundColor: 'rgba(143, 155, 179, 0.16)',
						}}
					/>
				</Layout>
			)}
			<Layout style={{ padding: 16, borderRadius: 10 }}>
				<Text style={{ marginBottom: 4, lineHeight: 20, marginBottom: 8 }}>
					{title}
				</Text>
				<Layout
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
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
					<Text category="s2" appearance="hint">
						{website}
					</Text>
					<Text category="s2" appearance="hint" style={{ marginHorizontal: 8 }}>
						/
					</Text>
					<Text category="s2" appearance="hint">
						{date}
					</Text>
				</Layout>
			</Layout>
		</Layout>
	);
};
