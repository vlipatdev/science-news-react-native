import React, { useState, useEffect } from 'react';
import {
	Dimensions,
	TouchableOpacity,
	ScrollView,
	Linking,
	ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Image from 'react-native-scalable-image';

import {
	Divider,
	Icon,
	Layout,
	Text,
	TopNavigation,
	TopNavigationAction,
	Button,
} from '@ui-kitten/components';

// import { AdMobBannerComponent } from '../components/AdMobBannerComponent';

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back-outline" />;
const BookmarkIcon = (props) => <Icon {...props} name="bookmark-outline" />;
const UnbookmarkIcon = (props) => <Icon {...props} name="bookmark" />;

export const ReaderScreen = ({ route, navigation }) => {
	const { id, title, link, website, date, imageUrl } = route.params;
	let { description } = route.params;
	if (description.length === 0) {
		description = '[no summary]';
	}

	const [isBookmarked, setIsBookmarked] = useState(false);
	const [hasPressedBack, setHasPressedBack] = useState(false);
	const [useBrowser, setUseBrowser] = useState(false);
	const [bookmarks, setBookmarks] = useState([]);

	const getPreferences = async () => {
		try {
			const value = await AsyncStorage.getItem('useBrowser');
			if (value !== null) {
				setUseBrowser(JSON.parse(value));
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getPreferences();
	}, []);

	const articleObject = {
		id,
		title,
		link,
		website,
		date,
		imageUrl,
		description,
	};

	const data = [
		{
			name: 'Ars Technica',
			source: '&source=arstechnica',
			imagePath: require('../assets/logos/arstechnica.png'),
		},
		{
			name: 'BBC',
			source: '&source=bbc',
			imagePath: require('../assets/logos/bbc.png'),
		},
		{
			name: 'CBS News',
			source: '&source=cbsnews',
			imagePath: require('../assets/logos/cbsnews.png'),
		},
		{
			name: 'ESA',
			source: '&source=esa',
			imagePath: require('../assets/logos/esa.png'),
		},
		{
			name: 'EurekAlert!',
			source: '&source=eurekalert',
			imagePath: require('../assets/logos/eurekalert.png'),
		},
		{
			name: 'Forbes',
			source: '&source=forbes',
			imagePath: require('../assets/logos/forbes.png'),
		},
		{
			name: 'Gizmodo',
			source: '&source=gizmodo',
			imagePath: require('../assets/logos/gizmodo.png'),
		},
		{
			name: 'HuffPost',
			source: '&source=huffpost',
			imagePath: require('../assets/logos/huffpost.png'),
		},
		{
			name: 'Live Science',
			source: '&source=livescience',
			imagePath: require('../assets/logos/livescience.png'),
		},
		{
			name: 'NASA',
			source: '&source=nasa',
			imagePath: require('../assets/logos/nasa.png'),
		},
		{
			name: 'Phys.org',
			source: '&source=physorg',
			imagePath: require('../assets/logos/physorg.png'),
		},
		{
			name: 'Popular Science',
			source: '&source=popsci',
			imagePath: require('../assets/logos/popsci.png'),
		},
		{
			name: 'Real Clear Science',
			source: '&source=realclearscience',
			imagePath: require('../assets/logos/realclearscience.png'),
		},
		{
			name: 'Science Daily',
			source: '&source=sciencedaily',
			imagePath: require('../assets/logos/sciencedaily.png'),
		},
		{
			name: 'Science News',
			source: '&source=sciencenews',
			imagePath: require('../assets/logos/sciencenews.png'),
		},
		{
			name: 'Space.com',
			source: '&source=spacecom',
			imagePath: require('../assets/logos/spacecom.png'),
		},
		{
			name: 'The Scientist',
			source: '&source=thescientist',
			imagePath: require('../assets/logos/thescientist.png'),
		},
	];

	let imagePath = '';

	switch (website) {
		case 'Ars Technica':
			imagePath = data[0].imagePath;
			break;
		case 'BBC':
			imagePath = data[1].imagePath;
			break;
		case 'CBS News':
			imagePath = data[2].imagePath;
			break;
		case 'ESA':
			imagePath = data[3].imagePath;
			break;
		case 'EurekAlert!':
			imagePath = data[4].imagePath;
			break;
		case 'Forbes':
			imagePath = data[5].imagePath;
			break;
		case 'Gizmodo':
			imagePath = data[6].imagePath;
			break;
		case 'HuffPost':
			imagePath = data[7].imagePath;
			break;
		case 'Live Science':
			imagePath = data[8].imagePath;
			break;
		case 'NASA':
			imagePath = data[9].imagePath;
			break;
		case 'Phys.org':
			imagePath = data[10].imagePath;
			break;
		case 'Popular Science':
			imagePath = data[11].imagePath;
			break;
		case 'Real Clear Science':
			imagePath = data[12].imagePath;
			break;
		case 'Science Daily':
			imagePath = data[13].imagePath;
			break;
		case 'Science News':
			imagePath = data[14].imagePath;
			break;
		case 'Space.com':
			imagePath = data[15].imagePath;
			break;
		case 'The Scientist':
			imagePath = data[16].imagePath;
			break;
		default:
			imagePath = require('../assets/logos/placeholder.png');
	}

	const getBookmarks = async () => {
		try {
			const value = await AsyncStorage.getItem('bookmarks');
			if (value !== null) {
				setBookmarks(JSON.parse(value));
			} else {
			}
		} catch (e) {
			console.log(e);
		}
	};

	const saveBookmarks = async (array) => {
		try {
			await AsyncStorage.setItem('bookmarks', JSON.stringify(array));
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getBookmarks();
		console.log('Current id: ', id);
	}, []);

	useEffect(() => {
		if (bookmarks.some((article) => article.id === articleObject.id)) {
			setIsBookmarked(true);
		} else {
			setIsBookmarked(false);
		}
	}, [bookmarks]);

	useEffect(() => {
		BookmarkAction();
	}, [isBookmarked]);

	const toggleBookmark = () => {
		if (bookmarks.some((article) => article.id === articleObject.id)) {
			setBookmarks(
				bookmarks.filter((el) => {
					return el.id !== articleObject.id;
				})
			);
			saveBookmarks(
				bookmarks.filter((el) => {
					return el.id !== articleObject.id;
				})
			);
		} else {
			setBookmarks([articleObject, ...bookmarks]);
			saveBookmarks([articleObject, ...bookmarks]);
			ToastAndroid.show('Added to bookmarks', ToastAndroid.SHORT);
		}
	};

	const openLink = (url) => {
		Linking.openURL(url);
	};

	const navigateBack = () => {
		if (!hasPressedBack) {
			navigation.goBack();
		}
		setHasPressedBack(true);
	};
	const navigateWeb = () => {
		navigation.navigate('Web', { link, title });
	};
	// const navigateProfile = () => {
	// 	navigation.navigate('Profile', { website });
	// };

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const BookmarkAction = () =>
		isBookmarked ? (
			<TopNavigationAction icon={UnbookmarkIcon} onPress={toggleBookmark} />
		) : (
			<TopNavigationAction icon={BookmarkIcon} onPress={toggleBookmark} />
		);

	return (
		<>
			<TopNavigation
				accessoryLeft={BackAction}
				accessoryRight={BookmarkAction}
			/>
			<Divider />
			<Layout
				style={{
					flex: 1,
				}}
			>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Layout
						style={{
							flex: 1,
						}}
						level="2"
					>
						<Layout style={{ flex: 1, marginHorizontal: 16 }} level="2">
							<Text
								category="h4"
								style={{
									marginVertical: 16,
									marginBottom: 8,
									lineHeight: 30,
								}}
							>
								{title}
							</Text>
							<Layout
								style={{
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center',
								}}
								level="2"
							>
								<Layout
									style={{
										borderColor: 'rgba(143, 155, 179, 0.16)',
										borderWidth: 1,
										borderRadius: 100,
										overflow: 'hidden',
										alignSelf: 'center',
										marginRight: 12,
									}}
								>
									<Image
										style={{
											resizeMode: 'contain',
										}}
										width={30}
										source={imagePath}
									/>
								</Layout>
								<Layout level="2">
									<TouchableOpacity>
										<Text
											category="s2"
											// appearance="hint"
											// onPress={navigateProfile}
											// style={{
											// 	color: '#7289DA',
											// }}
										>
											{website}
										</Text>
									</TouchableOpacity>

									<Text category="s2" appearance="hint">
										{date}
									</Text>
								</Layout>
							</Layout>

							{imageUrl === '' ? null : (
								<Layout
									style={{
										borderRadius: 10,
										overflow: 'hidden',
										marginTop: 24,
										alignItems: 'flex-start',
									}}
								>
									<Image
										source={{ uri: imageUrl }}
										width={Dimensions.get('window').width - 32}
										style={{
											resizeMode: 'contain',
										}}
									/>
								</Layout>
							)}

							<Text style={{ marginVertical: 16, lineHeight: 25 }}>
								{description}
							</Text>
							<Layout level="2">
								<Button
									appearance="outline"
									onPress={
										useBrowser
											? () => {
													openLink(link);
											  }
											: navigateWeb
									}
									style={{
										// borderWidth: 1,
										borderRadius: 10,
										// borderColor: 'rgba(143, 155, 179, 0.16)',
										width: Dimensions.get('window').width - 32,
										height: 50,
										marginTop: 16,
										marginBottom: 64,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{/* <Text
										style={{
											padding: 16,
											textAlign: 'center',
											color: '#7289DA',
										}}
									> */}
									Visit Website
									{/* </Text> */}
								</Button>
							</Layout>
						</Layout>
					</Layout>
				</ScrollView>
			</Layout>
		</>
	);
};
