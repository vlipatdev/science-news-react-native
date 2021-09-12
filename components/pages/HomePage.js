import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import NetInfo from '@react-native-community/netinfo';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
	Divider,
	Layout,
	Spinner,
	TopNavigation,
	TopNavigationAction,
	Text,
	Icon,
	Button,
} from '@ui-kitten/components';

import { iridiumlab } from '../../api/iridiumlab';

import { ArticleListItem } from '../ArticleListItem';
import { ArticleCardItem } from '../ArticleCardItem';

// import { AdMobBannerComponent } from '../AdMobBannerComponent';

const moreIcon = (props) => (
	<Icon
		{...props}
		name="more-vertical-outline"
		fill="#000"
		style={{ width: 20, height: 20 }}
	/>
);

const settingsIcon = (props) => (
	<Icon
		{...props}
		name="settings-outline"
		fill="#000"
		style={{ width: 20, height: 20 }}
	/>
);

export const HomePage = ({ navigation }) => {
	const [articles, setArticles] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState([true]);
	const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
	const [haveReachedEnd, setHaveReachedEnd] = useState(false);
	const [isCardView, setIsCardView] = useState(false);
	const [skipSummary, setSkipSummary] = useState(false);
	const [useBrowser, setUseBrowser] = useState(false);

	const refRBSheetRate = useRef();
	const refRBSheetConnection = useRef();

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

	useEffect(() => {
		getPreferences();
	}, []);

	const openLink = (url) => {
		Linking.openURL(url);
	};

	let src = '';

	const fetchAPI = async () => {
		try {
			const value = await AsyncStorage.getItem('subscriptions');
			if (value !== null) {
				src = JSON.parse(value).join('');
			} else {
				src = '';
			}
			const response = await iridiumlab.get(`/?${src}&page=${page}`);
			setArticles([...articles, ...response.data.data]);
			if (response.data.data.length === 0) {
				setHaveReachedEnd(true);
			}
			setIsLoading(false);
			setIsLoadingNextPage(false);
		} catch (e) {
			setIsLoading(false);
			setHaveReachedEnd(true);
			alert('Something went wrong. Please try again later.');
		}
	};

	useEffect(() => {
		NetInfo.fetch().then((state) => {
			if (state.isConnected) {
				fetchAPI();
			} else {
				refRBSheetConnection.current.open();
			}
		});
	}, [page]);

	const RateAction = () => (
		<TopNavigationAction
			icon={moreIcon}
			onPress={() => refRBSheetRate.current.open()}
		/>
	);

	const SettingsAction = () => (
		<TopNavigationAction
			icon={settingsIcon}
			onPress={() => {
				navigation.navigate('Settings');
			}}
		/>
	);

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

		const navigateWeb = () => {
			useBrowser ? openLink(link) : navigation.navigate('Web', { link, title });
		};

		const navigateReader = () => {
			navigation.navigate('Reader', {
				id,
				title,
				description,
				link,
				website,
				date,
				imageUrl,
			});
		};

		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					{
						skipSummary ? navigateWeb() : navigateReader();
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

	const loadNextPage = () => {
		if (!haveReachedEnd) {
			setIsLoadingNextPage(true);
			setPage(page + 1);
		}
	};

	const renderLoading = () => (
		<Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Spinner size="giant" status="basic" />
			<Text appearance="hint" category="c1" style={{ marginTop: 8 }}>
				Loading...
			</Text>
		</Layout>
	);

	const renderFlatList = () => {
		if (!haveReachedEnd) {
			return (
				<FlatList
					data={articles}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					onEndReachedThreshold={0.5}
					windowSize={10}
					onEndReached={() => {
						if (!isLoadingNextPage) {
							loadNextPage();
						}
					}}
					ListHeaderComponent={() => {
						return (
							<Layout style={{ paddingVertical: 18 }}>
								<ScrollView
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									style={{ paddingHorizontal: 12 }}
								>
									{data.map((el, idx) => {
										let margin = 0;

										if (idx == 16) margin = 24;

										return (
											<TouchableOpacity
												onPress={() => {
													navigation.navigate('Profile', {
														website: el.name,
													});
												}}
												key={idx}
												style={{
													width: 75,
													padding: 4,
													marginRight: margin,
												}}
											>
												<Layout
													style={{
														borderColor: 'rgba(143, 155, 179, 0.16)',
														borderWidth: 1,
														borderRadius: 25,
														overflow: 'hidden',
														alignSelf: 'center',
														marginBottom: 8,
													}}
												>
													<Image
														source={el.imagePath}
														style={{ height: 45, width: 45 }}
													/>
												</Layout>
												<Text
													numberOfLines={1}
													category="c2"
													style={{ textAlign: 'center' }}
												>
													{el.name}
												</Text>
											</TouchableOpacity>
										);
									})}
								</ScrollView>
							</Layout>
						);
					}}
					ListFooterComponent={() => (
						<Layout
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
								margin: 24,
							}}
							level="2"
						>
							<Text category="c1" appearance="hint">
								Loading articles...
							</Text>
						</Layout>
					)}
				/>
			);
		} else {
			return (
				<>
					<FlatList
						data={articles}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						onEndReachedThreshold={0.5}
						windowSize={10}
					/>
				</>
			);
		}
	};

	return (
		<>
			<TopNavigation
				alignment="center"
				title="Science News"
				accessoryRight={RateAction}
				accessoryLeft={SettingsAction}
			/>
			<Divider />
			<RBSheet
				ref={refRBSheetConnection}
				height={456}
				keyboardAvoidingViewEnabled={false}
				closeOnPressMask={false}
				closeOnPressBack={false}
				customStyles={{
					wrapper: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
					draggableIcon: {
						backgroundColor: '#fff',
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
						<Image
							source={require('../../assets/illustrations/no_connection.png')}
							style={{
								height: 250,
								width: 250,
								resizeMode: 'contain',
							}}
						/>
						<Text category="h6" style={{ marginBottom: 8 }}>
							Ooops!
						</Text>
						<Text
							appearance="hint"
							style={{ marginHorizontal: 32, textAlign: 'center' }}
						>
							No Internet connection detected. Check your network settings and
							try again.
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
							style={{ width: 200, borderRadius: 100, marginHorizontal: 16 }}
							onPress={() => {
								NetInfo.fetch().then((state) => {
									if (state.isConnected) {
										fetchAPI();
										refRBSheetConnection.current.close();
									}
								});
							}}
						>
							Retry
						</Button>
					</Layout>
				</Layout>
			</RBSheet>
			<RBSheet
				ref={refRBSheetRate}
				closeOnDragDown={true}
				closeOnPressMask={true}
				height={456}
				keyboardAvoidingViewEnabled={false}
				customStyles={{
					wrapper: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
					draggableIcon: {
						backgroundColor: 'rgba(143, 155, 179, 0.32)',
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
						<Image
							source={require('../../assets/illustrations/rate.png')}
							style={{
								height: 250,
								width: 250,
								resizeMode: 'contain',
							}}
						/>
						<Text category="h6" style={{ marginBottom: 8 }}>
							Like this app?
						</Text>
						<Text
							appearance="hint"
							style={{ marginHorizontal: 32, textAlign: 'center' }}
						>
							Help us by leaving a positive review.
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
							onPress={() => refRBSheetRate.current.close()}
						>
							No, thanks
						</Button>
						<Button
							style={{ flex: 1, borderRadius: 100, marginHorizontal: 16 }}
							onPress={() => {
								Linking.openURL(
									'https://play.google.com/store/apps/details?id=com.iridiumlab.sciencenews'
								);
								refRBSheetRate.current.close();
							}}
						>
							Rate
						</Button>
					</Layout>
				</Layout>
			</RBSheet>
			<Layout
				style={{
					flex: 1,
				}}
				level="2"
			>
				{isLoading ? renderLoading() : renderFlatList()}
				{/* <AdMobBannerComponent size="banner" /> */}
			</Layout>
		</>
	);
};
