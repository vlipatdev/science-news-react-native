import React, { useState } from 'react';
import { FlatList } from 'react-native';

import {
	Divider,
	Icon,
	Layout,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';

import { SubscriptionListItem } from '../components/SubscriptionListItem';

const data = [
	{
		name: 'Ars Technica',
		website: 'arstechnica.com',
		source: '&source=arstechnica',
		imagePath: require('../assets/logos/arstechnica.png'),
	},
	{
		name: 'BBC',
		website: 'bbc.com',
		source: '&source=bbc',
		imagePath: require('../assets/logos/bbc.png'),
	},
	{
		name: 'CBS News',
		website: 'cbsnews.com',
		source: '&source=cbsnews',
		imagePath: require('../assets/logos/cbsnews.png'),
	},
	{
		name: 'ESA',
		website: 'esa.int',
		source: '&source=esa',
		imagePath: require('../assets/logos/esa.png'),
	},
	{
		name: 'EurekAlert!',
		website: 'eurekalert.com',
		source: '&source=eurekalert',
		imagePath: require('../assets/logos/eurekalert.png'),
	},
	{
		name: 'Forbes',
		website: 'forbes.com',
		source: '&source=forbes',
		imagePath: require('../assets/logos/forbes.png'),
	},
	{
		name: 'Gizmodo',
		website: 'gizmodo.com',
		source: '&source=gizmodo',
		imagePath: require('../assets/logos/gizmodo.png'),
	},
	{
		name: 'HuffPost',
		website: 'huffpost.com',
		source: '&source=huffpost',
		imagePath: require('../assets/logos/huffpost.png'),
	},
	{
		name: 'Live Science',
		website: 'livescience.com',
		source: '&source=livescience',
		imagePath: require('../assets/logos/livescience.png'),
	},
	{
		name: 'NASA',
		website: 'nasa.gov',
		source: '&source=nasa',
		imagePath: require('../assets/logos/nasa.png'),
	},
	{
		name: 'Phys.org',
		website: 'phys.org',
		source: '&source=physorg',
		imagePath: require('../assets/logos/physorg.png'),
	},
	{
		name: 'Popular Science',
		website: 'popsci.com',
		source: '&source=popsci',
		imagePath: require('../assets/logos/popsci.png'),
	},
	{
		name: 'Real Clear Science',
		website: 'realclearscience.com',
		source: '&source=realclearscience',
		imagePath: require('../assets/logos/realclearscience.png'),
	},
	{
		name: 'Science Daily',
		website: 'sciencedaily.com',
		source: '&source=sciencedaily',
		imagePath: require('../assets/logos/sciencedaily.png'),
	},
	{
		name: 'Science News',
		website: 'sciencenews.org',
		source: '&source=sciencenews',
		imagePath: require('../assets/logos/sciencenews.png'),
	},
	{
		name: 'Space.com',
		website: 'space.com',
		source: '&source=spacecom',
		imagePath: require('../assets/logos/spacecom.png'),
	},
	{
		name: 'The Scientist',
		website: 'the-scientist.com',
		source: '&source=thescientist',
		imagePath: require('../assets/logos/thescientist.png'),
	},
];

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back-outline" />;

export const SubscriptionsScreen = ({ navigation }) => {
	const [hasPressedBack, setHasPressedBack] = useState(false);

	const navigateBack = () => {
		if (!hasPressedBack) {
			navigation.goBack();
		}
		setHasPressedBack(true);
	};

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	return (
		<>
			<TopNavigation
				title="Subscriptions"
				alignment="center"
				accessoryLeft={BackAction}
			/>
			<Divider />
			<Layout style={{ flex: 1 }}>
				<FlatList
					data={data}
					renderItem={({ item }) => {
						const { name, website, imagePath, source } = item;

						return (
							<SubscriptionListItem
								name={name}
								website={website}
								source={source}
								imagePath={imagePath}
							/>
						);
					}}
					keyExtractor={(item) => item.name}
				/>
			</Layout>
		</>
	);
};
