import React from 'react';
import { Layout, Button, Text } from '@ui-kitten/components';

import { Image, Linking } from 'react-native';

export const UpdateScreen = () => {
	const update = () => {
		Linking.openURL(
			'https://play.google.com/store/apps/details?id=com.iridiumlab.sciencenews'
		);
	};

	return (
		<>
			<Layout
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
			>
				<Image
					source={require('../assets/illustrations/update.png')}
					style={{
						height: 300,
						width: 300,
						resizeMode: 'contain',
					}}
				/>
				<Text category="h5">New Version Available</Text>
				<Text
					category="s1"
					appearance="hint"
					style={{
						marginTop: 8,
						marginBottom: 16,
						marginHorizontal: 48,
						textAlign: 'center',
					}}
				>
					To continue using the app, please upgrade to the latest version.
				</Text>
				<Button
					onPress={update}
					size="large"
					style={{
						marginTop: 16,
					}}
				>
					UPDATE NOW
				</Button>
			</Layout>
		</>
	);
};
