import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Icon, Layout, Text } from '@ui-kitten/components';

const SubscribeIcon = (props) => (
	<Icon
		{...props}
		style={{
			height: 24,
			width: 24,
			marginRight: 8,
		}}
		fill="#8F9BB3"
		name="plus-outline"
	/>
);
const UnsubscribeIcon = (props) => (
	<Icon
		{...props}
		style={{
			height: 24,
			width: 24,
			marginRight: 8,
		}}
		fill="#8F9BB3"
		name="checkmark-outline"
	/>
);

export const SubscriptionListItem = ({ name, website, source, imagePath }) => {
	const [hasLoaded, setHasLoaded] = useState(false);
	const [subscriptions, setSubscriptions] = useState([
		'&source=arstechnica',
		'&source=bbc',
		'&source=cbsnews',
		'&source=esa',
		'&source=eurekalert',
		'&source=forbes',
		'&source=gizmodo',
		'&source=huffpost',
		'&source=livescience',
		'&source=nasa',
		'&source=physorg',
		'&source=popsci',
		'&source=realclearscience',
		'&source=reuters',
		'&source=sciencedaily',
		'&source=sciencenews',
		'&source=spacecom',
		'&source=thescientist',
	]);
	const [isSubscribed, setIsSubscribed] = useState(false);

	const getPreferences = async () => {
		try {
			const value = await AsyncStorage.getItem('subscriptions');
			if (value !== null) {
				setSubscriptions(JSON.parse(value));
			}
			setHasLoaded(true);
		} catch (e) {
			console.log(e);
		}
	};

	const savePreferences = async (source) => {
		let updatedSubscriptions = [];
		if (subscriptions.includes(source)) {
			updatedSubscriptions = subscriptions.filter((el) => el !== source);
		} else {
			updatedSubscriptions = [...subscriptions, source];
		}
		await AsyncStorage.setItem(
			'subscriptions',
			JSON.stringify(updatedSubscriptions)
		);
		setSubscriptions(updatedSubscriptions);
	};

	useEffect(() => {
		if (subscriptions.includes(source)) {
			setIsSubscribed(true);
		} else {
			setIsSubscribed(false);
		}
	}, [subscriptions]);

	useEffect(() => {
		getPreferences();
	}, []);

	return hasLoaded ? (
		<Layout
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginHorizontal: 16,
				height: 60,
			}}
		>
			<Layout
				style={{
					borderRadius: 30,
					overflow: 'hidden',
					borderWidth: 1,
					borderColor: 'rgba(143, 155, 179, 0.16)',
					marginVertical: 16,
					marginRight: 16,
				}}
			>
				<Image
					style={{
						height: 28,
						width: 28,
						resizeMode: 'contain',
					}}
					source={imagePath}
				/>
			</Layout>
			<Layout style={{ flex: 1 }}>
				<Text category="s1">{name}</Text>
				<Text category="c1" appearance="hint">
					{website}
				</Text>
			</Layout>
			<TouchableOpacity
				onPress={() => {
					savePreferences(source);
				}}
			>
				{isSubscribed ? UnsubscribeIcon() : SubscribeIcon()}
			</TouchableOpacity>
		</Layout>
	) : null;
};
