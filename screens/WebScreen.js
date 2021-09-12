import React, { useState, useEffect } from 'react';
import { Share, Dimensions, ProgressBarAndroid, AppState } from 'react-native';
import { WebView } from 'react-native-webview';

import {
	Divider,
	Icon,
	Layout,
	TopNavigation,
	TopNavigationAction,
	Text,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back-outline" />;
const ShareIcon = (props) => <Icon {...props} name="share-outline" />;

export const WebScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasPressedBack, setHasPressedBack] = useState(false);
	const [appState, setAppState] = useState(AppState.currentState);

	const { link, title } = route.params;

	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange);
		return () => {
			AppState.removeEventListener('change', handleAppStateChange);
		};
	}, []);

	const handleAppStateChange = (nextState) => {
		setAppState(nextState);
	};

	const shareLink = () => {
		Share.share({
			message: link,
		});
	};

	const ShareAction = () => (
		<TopNavigationAction icon={ShareIcon} onPress={shareLink} />
	);

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const navigateBack = () => {
		if (!hasPressedBack) {
			navigation.goBack();
		}
		setHasPressedBack(true);
	};

	const renderTitle = () => (
		<Layout
			style={{
				width: Dimensions.get('window').width - 112,
			}}
		>
			<Text numberOfLines={1}>{title}</Text>
			<Text numberOfLines={1} category="c1" appearance="hint">
				{link}
			</Text>
		</Layout>
	);

	return (
		<>
			<TopNavigation
				title={renderTitle}
				alignment="center"
				accessoryLeft={BackAction}
				accessoryRight={ShareAction}
			/>
			{isLoading ? (
				<ProgressBarAndroid
					styleAttr="Horizontal"
					indeterminate={true}
					style={{
						color: '#7289DA',
						marginTop: -4,
						height: 10,
						backgroundColor: '#FFFFFF',
					}}
				/>
			) : (
				<Divider style={{ marginBottom: 5 }} />
			)}
			<Layout
				style={[
					{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: -5,
					},
				]}
			>
				{appState === 'active' && (
					<WebView
						onLoadEnd={() => {
							setIsLoading(false);
						}}
						source={{
							uri: link,
						}}
						allowsFullscreenVideo={true}
						style={{
							height: Dimensions.get('window').height,
							width: Dimensions.get('window').width,
						}}
					/>
				)}
			</Layout>
		</>
	);
};
