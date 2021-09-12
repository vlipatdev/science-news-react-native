import React, { useState, useEffect } from 'react';
import { Linking, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as MailComposer from 'expo-mail-composer';

import {
	Divider,
	Layout,
	TopNavigation,
	TopNavigationAction,
	Icon,
	Text,
} from '@ui-kitten/components';

import { SettingsListItem } from '../components/SettingsListItem';

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back-outline" />;

export const SettingsScreen = ({ navigation }) => {
	const [hasPressedBack, setHasPressedBack] = useState(false);
	const [useCardView, setUseCardView] = useState(false);
	const [useBrowser, setUseBrowser] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [skipSummary, setSkipSummary] = useState(false);

	const getPreferences = async () => {
		try {
			const value1 = await AsyncStorage.getItem('useCardView');
			if (value1 !== null) {
				setUseCardView(JSON.parse(value1));
				console.log('usingCardView: ', JSON.parse(value1));
			} else {
			}
			const value2 = await AsyncStorage.getItem('useBrowser');
			if (value2 !== null) {
				setUseBrowser(JSON.parse(value2));
				console.log('usingBrowser: ', JSON.parse(value2));
			} else {
			}
			const value3 = await AsyncStorage.getItem('skipSummary');
			if (value3 !== null) {
				setSkipSummary(JSON.parse(value3));
				console.log('skippingSummary: ', JSON.parse(value3));
			} else {
			}
			setHasLoaded(true);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getPreferences();
	}, []);

	const navigateBack = () => {
		if (!hasPressedBack) {
			navigation.goBack();
		}
		setHasPressedBack(true);
	};

	// const navigateSubscriptions = () => {
	// 	navigation.navigate('Subscriptions');
	// };

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const rate = () => {
		Linking.openURL(
			'https://play.google.com/store/apps/details?id=com.iridiumlab.sciencenews'
		);
	};

	const openPrivacyPolicy = () => {
		Linking.openURL(
			'https://github.com/iridiumlab/science-news-privacy-policy/blob/master/privacy_policy.md'
		);
	};

	const sendEmail = () => {
		MailComposer.composeAsync({
			recipients: ['iridiumlabdev@gmail.com'],
			subject: 'Science News App',
		});
	};

	const updateUseCardView = async () => {
		setUseCardView(!useCardView);
		await AsyncStorage.setItem('useCardView', JSON.stringify(!useCardView));
		console.log('updated card', !useCardView);
		ToastAndroid.show('Restart app to apply changes', ToastAndroid.LONG);
	};

	const updateUseBrowser = async () => {
		setUseBrowser(!useBrowser);
		await AsyncStorage.setItem('useBrowser', JSON.stringify(!useBrowser));
		console.log('updated browser', !useBrowser);
		ToastAndroid.show('Restart app to apply changes', ToastAndroid.LONG);
	};

	const updateSkipSummary = async () => {
		setSkipSummary(!skipSummary);
		await AsyncStorage.setItem('skipSummary', JSON.stringify(!skipSummary));
		console.log('updated skip summary', !skipSummary);
		ToastAndroid.show('Restart app to apply changes', ToastAndroid.LONG);
	};

	const renderContent = () => (
		<>
			<TouchableOpacity activeOpacity={1} onPress={updateUseCardView}>
				<SettingsListItem
					name="Card view"
					icon="square"
					hasToggle={true}
					isToggled={useCardView}
				/>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={1} onPress={updateSkipSummary}>
				<SettingsListItem
					name="Skip news summary"
					icon="skip"
					hasToggle={true}
					isToggled={skipSummary}
				/>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={1} onPress={updateUseBrowser}>
				<SettingsListItem
					name="Use external browser"
					icon="globe"
					hasToggle={true}
					isToggled={useBrowser}
				/>
			</TouchableOpacity>
			{/* <TouchableOpacity onPress={navigateSubscriptions}>
				<SettingsListItem name="Edit subscriptions" icon="edit" />
			</TouchableOpacity> */}
			<Divider style={{ marginVertical: 12.5 }} />
			<TouchableOpacity onPress={rate}>
				<SettingsListItem name="Rate this app" icon="star" />
			</TouchableOpacity>
			<TouchableOpacity onPress={sendEmail}>
				<SettingsListItem name="Contact us" icon="message" />
			</TouchableOpacity>
			<TouchableOpacity onPress={openPrivacyPolicy}>
				<SettingsListItem name="Privacy Policy" icon="shield" />
			</TouchableOpacity>
			<Text
				appearance="hint"
				category="c1"
				style={{
					alignSelf: 'center',
					marginTop: 'auto',
					marginHorizontal: 16,
					textAlign: 'center',
				}}
			>
				Email us with any questions or suggestions:
			</Text>
			<Text
				// appearance="hint"
				category="c1"
				style={{
					alignSelf: 'center',
					marginTop: 4,
					marginBottom: 24,
					marginHorizontal: 16,
					textAlign: 'center',
				}}
			>
				iridiumlabdev@gmail.com
			</Text>
			{/* <Text
				appearance="hint"
				category="c1"
				style={{
					alignSelf: 'center',
					marginBottom: 16,
					marginTop: 4,
					marginHorizontal: 16,
				}}
			></Text> */}
		</>
	);

	return (
		<>
			<TopNavigation
				title="Settings"
				alignment="center"
				accessoryLeft={BackAction}
			/>
			<Divider />
			<Layout style={{ flex: 1 }}>{hasLoaded ? renderContent() : null}</Layout>
		</>
	);
};
