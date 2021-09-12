import React from 'react';
import { Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Text, Divider, Layout, TopNavigation } from '@ui-kitten/components';

import Image from 'react-native-scalable-image';

import { ExploreCardItem } from '../ExploreCardItem';

const data = [
	{
		name: 'Ars Technica',
		source: '&source=arstechnica',
		imagePath: require('../../assets/logos/arstechnica.png'),
	},
	{
		name: 'BBC',
		source: '&source=bbc',
		imagePath: require('../../assets/logos/bbc.png'),
	},
	{
		name: 'CBS News',
		source: '&source=cbsnews',
		imagePath: require('../../assets/logos/cbsnews.png'),
	},
	{
		name: 'ESA',
		source: '&source=esa',
		imagePath: require('../../assets/logos/esa.png'),
	},
	{
		name: 'EurekAlert!',
		source: '&source=eurekalert',
		imagePath: require('../../assets/logos/eurekalert.png'),
	},
	{
		name: 'Forbes',
		source: '&source=forbes',
		imagePath: require('../../assets/logos/forbes.png'),
	},
	{
		name: 'Gizmodo',
		source: '&source=gizmodo',
		imagePath: require('../../assets/logos/gizmodo.png'),
	},
	{
		name: 'HuffPost',
		source: '&source=huffpost',
		imagePath: require('../../assets/logos/huffpost.png'),
	},
	{
		name: 'Live Science',
		source: '&source=livescience',
		imagePath: require('../../assets/logos/livescience.png'),
	},
	{
		name: 'NASA',
		source: '&source=nasa',
		imagePath: require('../../assets/logos/nasa.png'),
	},
	{
		name: 'Phys.org',
		source: '&source=physorg',
		imagePath: require('../../assets/logos/physorg.png'),
	},
	{
		name: 'Popular Science',
		source: '&source=popsci',
		imagePath: require('../../assets/logos/popsci.png'),
	},
	{
		name: 'Real Clear Science',
		source: '&source=realclearscience',
		imagePath: require('../../assets/logos/realclearscience.png'),
	},
	{
		name: 'Science Daily',
		source: '&source=sciencedaily',
		imagePath: require('../../assets/logos/sciencedaily.png'),
	},
	{
		name: 'Science News',
		source: '&source=sciencenews',
		imagePath: require('../../assets/logos/sciencenews.png'),
	},
	{
		name: 'Space.com',
		source: '&source=spacecom',
		imagePath: require('../../assets/logos/spacecom.png'),
	},
	{
		name: 'The Scientist',
		source: '&source=thescientist',
		imagePath: require('../../assets/logos/thescientist.png'),
	},
];

const topics = [
	{
		title: 'Astronomy & Space',
		imagePath: require('../../assets/topics/astronomy.jpg'),
	},
	{
		title: 'Biology',
		imagePath: require('../../assets/topics/biology.jpg'),
	},
	{
		title: 'Chemistry',
		imagePath: require('../../assets/topics/chemistry.jpg'),
	},
	{
		title: 'Physics',
		imagePath: require('../../assets/topics/physics.jpg'),
	},
	{
		title: 'Earth Science',
		imagePath: require('../../assets/topics/earth.jpg'),
	},
	{
		title: 'Environment',
		imagePath: require('../../assets/topics/environment.jpg'),
	},
	{
		title: 'Artificial Intelligence',
		imagePath: require('../../assets/topics/ai.jpg'),
	},
	{
		title: 'Health',
		imagePath: require('../../assets/topics/health.jpg'),
	},
];

export const ExplorePage = ({ navigation }) => {
	return (
		<>
			<TopNavigation title="Explore" alignment="center" />
			<Divider />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Layout level="2" style={{ paddingTop: 12 }}>
					<Text category="h5" style={{ marginHorizontal: 12 }}>
						Topics
					</Text>
					<Layout
						style={{
							flexWrap: 'wrap',
							flexDirection: 'row',
							marginBottom: 24,
						}}
						level="2"
					>
						{topics.map((topic, idx) => {
							return (
								<Layout
									level="2"
									style={{
										marginLeft: 12,
										marginTop: 12,
									}}
									key={idx}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Profile', {
												website: topic.title,
											});
										}}
									>
										<Image
											source={topic.imagePath}
											width={(Dimensions.get('window').width - 48) / 3}
											style={{
												backgroundColor: 'rgba(143, 155, 179, 0.16)',
												borderRadius: 10,
											}}
										/>
										<Text
											numberOfLines={2}
											category="c1"
											style={{
												color: 'white',
												position: 'absolute',
												top: 12,
												alignSelf: 'center',
												textAlign: 'center',
												marginHorizontal: 12,
											}}
										>
											{topic.title}
										</Text>
									</TouchableOpacity>
								</Layout>
							);
						})}
					</Layout>

					<Text category="h5" style={{ marginHorizontal: 12 }}>
						Sources
					</Text>
					<Layout
						style={{
							flexWrap: 'wrap',
							paddingBottom: 12,
							flexDirection: 'row',
						}}
						level="2"
					>
						{data.map((el, idx) => {
							return (
								<TouchableOpacity
									onPress={() => {
										navigation.navigate('Profile', {
											website: el.name,
										});
									}}
									style={{
										width: (Dimensions.get('window').width - 48) / 3,
										marginLeft: 12,
										marginTop: 12,
									}}
									key={idx}
								>
									<ExploreCardItem name={el.name} imagePath={el.imagePath} />
								</TouchableOpacity>
							);
						})}
					</Layout>
				</Layout>
			</ScrollView>
		</>
	);
};
