import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
	Divider,
	Layout,
	Button,
	Text,
	Icon,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';

import { ArticleListItem } from '../ArticleListItem';
import { ArticleCardItem } from '../ArticleCardItem';

const clearIcon = (props) => (
	<Icon
		{...props}
		name="trash-outline"
		fill="#000"
		style={{ width: 20, height: 20 }}
	/>
);

export const BookmarksPage = ({ navigation }) => {
	const [bookmarks, setBookmarks] = useState([]);
	const [isEmpty, setIsEmpty] = useState(true);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isCardView, setIsCardView] = useState(false);
	const [skipSummary, setSkipSummary] = useState(false);
	const [useBrowser, setUseBrowser] = useState(false);

	const refRBSheet = useRef();

	const getPreferences = async () => {
		try {
			const value1 = await AsyncStorage.getItem('useCardView');
			if (value1 !== null) {
				setIsCardView(JSON.parse(value1));
			}
			const value2 = await AsyncStorage.getItem('skipSummary');
			if (value2 !== null) {
				setSkipSummary(JSON.parse(value2));
			}
			const value3 = await AsyncStorage.getItem('useBrowser');
			if (value3 !== null) {
				setUseBrowser(JSON.parse(value3));
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getBookmarks = async () => {
		try {
			const value = await AsyncStorage.getItem('bookmarks');
			if (value !== null) {
				if (JSON.parse(value).length !== 0) {
					setBookmarks(JSON.parse(value));
					setIsEmpty(false);
				} else {
					setIsEmpty(true);
				}
			}
			setHasLoaded(true);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getPreferences();
		navigation.addListener('focus', () => {
			getBookmarks();
		});
	}, []);

	const clearBookmarks = async () => {
		try {
			await AsyncStorage.setItem('bookmarks', '');
			setBookmarks([]);
			setIsEmpty(true);
			refRBSheet.current.close();
		} catch (e) {
			console.log(e);
		}
	};

	const openLink = (url) => {
		Linking.openURL(url);
	};

	const ClearAction = () => (
		<TopNavigationAction
			icon={clearIcon}
			onPress={() => refRBSheet.current.open()}
		/>
	);

	const renderContent = () => {
		if (hasLoaded) {
			if (isEmpty) {
				return (
					<Layout
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Layout
							style={{
								marginBottom: 24,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Image
								source={require('../../assets/illustrations/no_bookmarks.png')}
								style={{
									height: 250,
									width: 250,
									resizeMode: 'contain',
								}}
							/>
							<Text category="h6" style={{ marginBottom: 8 }}>
								No bookmarks
							</Text>
							<Text
								appearance="hint"
								style={{ marginHorizontal: 32, textAlign: 'center' }}
							>
								You haven't saved any articles yet.
							</Text>
						</Layout>
					</Layout>
				);
			} else {
				return (
					<FlatList
						data={bookmarks}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				);
			}
		} else {
			return null;
		}
	};

	const renderItem = ({ item }) => {
		const { id, title, description, date, link, website, imageUrl } = item;

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
				imagePath = require('../../assets/logos/placeholder.png');
		}

		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					{
						skipSummary
							? useBrowser
								? openLink(link)
								: navigation.navigate('Web', { link, title })
							: navigation.navigate('Reader', {
									id,
									title,
									description,
									link,
									website,
									date,
									imageUrl,
							  });
					}
				}}
			>
				{isCardView ? (
					<ArticleCardItem
						id={id}
						title={title}
						website={website}
						date={date}
						imageUrl={imageUrl}
						imagePath={imagePath}
					/>
				) : (
					<ArticleListItem
						id={id}
						title={title}
						website={website}
						date={date}
						imageUrl={imageUrl}
						imagePath={imagePath}
					/>
				)}
			</TouchableOpacity>
		);
	};

	return (
		<>
			<TopNavigation
				title="Bookmarks"
				alignment="center"
				accessoryRight={ClearAction}
			/>
			<Divider />
			<Layout style={{ flex: 1 }} level="2">
				<RBSheet
					ref={refRBSheet}
					closeOnDragDown={true}
					closeOnPressMask={true}
					height={216}
					keyboardAvoidingViewEnabled={false}
					customStyles={{
						wrapper: {
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
						},
						draggableIcon: {
							backgroundColor: '#FFF',
						},
					}}
				>
					<Layout
						style={{
							margin: 16,
							marginTop: 0,
						}}
					>
						<Layout
							style={{
								marginBottom: 24,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text category="h6" style={{ marginBottom: 8 }}>
								Clear bookmarks?
							</Text>
							<Text
								appearance="hint"
								style={{ marginHorizontal: 32, textAlign: 'center' }}
							>
								This can't be undone and you'll remove all your bookmarks.
							</Text>
						</Layout>
						<Layout
							style={{
								flexDirection: 'row',
								height: 50,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Button
								status="basic"
								style={{ flex: 1, borderRadius: 100, marginHorizontal: 16 }}
								onPress={() => refRBSheet.current.close()}
							>
								Cancel
							</Button>
							<Button
								style={{ flex: 1, borderRadius: 100, marginHorizontal: 16 }}
								onPress={() => {
									clearBookmarks();
								}}
							>
								Clear
							</Button>
						</Layout>
					</Layout>
				</RBSheet>
				{renderContent()}
			</Layout>
		</>
	);
};
