import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
	Divider,
	Icon,
	Layout,
	TopNavigation,
	TopNavigationAction,
	Spinner,
	Text,
	Button,
} from '@ui-kitten/components';

import { iridiumlab } from '../api/iridiumlab';

import { ArticleListItem } from '../components/ArticleListItem';
import { ArticleCardItem } from '../components/ArticleCardItem';

// import { AdMobBannerComponent } from '../components/AdMobBannerComponent';

const BackIcon = (props) => <Icon {...props} name="arrow-ios-back-outline" />;
const SubscribeIcon = (props) => <Icon {...props} name="plus-outline" />;
const UnsubscribeIcon = (props) => <Icon {...props} name="checkmark-outline" />;

const WebIcon = (props) => <Icon {...props} name="globe" />;

export const ProfileScreen = ({ route, navigation }) => {
	const [isSubscribed, setIsSubscribed] = React.useState(true);
	const [articles, setArticles] = useState([]);
	const [articleCount, setArticleCount] = useState('');
	const [isLoading, setIsLoading] = useState([true]);
	const [page, setPage] = useState(1);
	const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
	const [hasPressedBack, setHasPressedBack] = useState(false);
	const [haveReachedEnd, setHaveReachedEnd] = useState(false);
	const [isCardView, setIsCardView] = useState(false);
	const [skipSummary, setSkipSummary] = useState(false);
	const [useBrowser, setUseBrowser] = useState(false);

	const refRBSheetConnection = useRef();

	const { website } = route.params;

	let source = '';
	let subtitle = '';
	let isTopic = false;

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

	switch (website) {
		case 'Ars Technica':
			source = '&source=arstechnica';
			subtitle = 'www.arstechnica.com';
			break;
		case 'BBC':
			source = '&source=bbc';
			subtitle = 'www.bbc.com';
			break;
		case 'CBS News':
			source = '&source=cbsnews';
			subtitle = 'www.cbsnews.com';
			break;
		case 'ESA':
			source = '&source=esa';
			subtitle = 'www.esa.int';
			break;
		case 'EurekAlert!':
			source = '&source=eurekalert';
			subtitle = 'www.eurekalert.org';
			break;
		case 'Forbes':
			source = '&source=forbes';
			subtitle = 'www.forbes.com';
			break;
		case 'Gizmodo':
			source = '&source=gizmodo';
			subtitle = 'www.gizmodo.com';
			break;
		case 'HuffPost':
			source = '&source=huffpost';
			subtitle = 'www.huffpost.com';
			break;
		case 'Live Science':
			source = '&source=livescience';
			subtitle = 'www.livescience.com';
			break;
		case 'NASA':
			source = '&source=nasa';
			subtitle = 'www.nasa.gov';
			break;
		case 'Phys.org':
			source = '&source=physorg';
			subtitle = 'www.phys.org';
			break;
		case 'Popular Science':
			source = '&source=popsci';
			subtitle = 'www.popsci.com';
			break;
		case 'Real Clear Science':
			source = '&source=realclearscience';
			subtitle = 'www.realclearscience.com';
			break;
		case 'Reuters':
			source = '&source=reuters';
			subtitle = 'www.reuters.com';
			break;
		case 'Science Daily':
			source = '&source=sciencedaily';
			subtitle = 'www.sciencedaily.com';
			break;
		case 'Science News':
			source = '&source=sciencenews';
			subtitle = 'www.sciencenews.org';
			break;
		case 'Space.com':
			source = '&source=spacecom';
			subtitle = 'www.space.com';
			break;
		case 'The Scientist':
			source = '&source=thescientist';
			subtitle = 'www.the-scientist.com';
			break;
		case 'Astronomy & Space':
			source = '&source=astronomy';
			subtitle = '';
			isTopic = true;
			break;
		case 'Biology':
			source = '&source=biology';
			subtitle = '';
			isTopic = true;
			break;
		case 'Chemistry':
			source = '&source=chemistry';
			subtitle = '';
			isTopic = true;
			break;
		case 'Physics':
			source = '&source=physics';
			isTopic = true;
			subtitle = '';
			break;
		case 'Artificial Intelligence':
			source = '&source=artificialintelligence';
			isTopic = true;
			subtitle = '';
			break;
		case 'Earth Science':
			source = '&source=earthscience';
			isTopic = true;
			subtitle = '';
			break;
		case 'Health':
			source = '&source=health';
			isTopic = true;
			subtitle = '';
			break;
		case 'Environment':
			source = '&source=environment';
			isTopic = true;
			subtitle = '';
			break;
		default:
			source = '';
			subtitle = '';
			break;
	}

	const fetchAPI = async () => {
		try {
			const response = await iridiumlab.get(`/?${source}&page=${page}`);
			setArticles([...articles, ...response.data.data]);
			setArticleCount(response.data.meta.articles);
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
		console.log('current page: ', page);
	}, [page]);

	const toggleIsSubscribed = () => {
		setIsSubscribed(!isSubscribed);
	};

	const navigateBack = () => {
		if (!hasPressedBack) {
			navigation.goBack();
		}
		setHasPressedBack(true);
	};

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	const SubscribeAction = () =>
		isSubscribed ? (
			<TopNavigationAction
				icon={UnsubscribeIcon}
				onPress={toggleIsSubscribed}
			/>
		) : (
			<TopNavigationAction icon={SubscribeIcon} onPress={toggleIsSubscribed} />
		);

	const data = [
		{
			name: 'Ars Technica',
			source: '&source=arstechnica',
			imagePath: require('../assets/logos/arstechnica.png'),
			description:
				'Ars Technica is a website covering news and opinions in technology, science, politics, and society, created by Ken Fisher and Jon Stokes in 1998. It publishes news, reviews, and guides on issues such as computer hardware and software, science, technology policy, and video games.',
		},
		{
			name: 'BBC',
			source: '&source=bbc',
			imagePath: require('../assets/logos/bbc.png'),
			description:
				'BBC News is an operational business division of the British Broadcasting Corporation responsible for the gathering and broadcasting of news and current affairs.',
		},
		{
			name: 'CBS News',
			source: '&source=cbsnews',
			imagePath: require('../assets/logos/cbsnews.png'),
			description:
				'CBS News is the news division of the American television and radio service CBS. CBS News television programs include the CBS Evening News, CBS This Morning, news magazine programs CBS News Sunday Morning, 60 Minutes, and 48 Hours, and Sunday morning political affairs program Face the Nation.',
		},
		{
			name: 'ESA',
			source: '&source=esa',
			imagePath: require('../assets/logos/esa.png'),
			description:
				'The European Space Agency is an intergovernmental organisation of 22 member states dedicated to the exploration of space. Established in 1975 and headquartered in Paris, ESA has a worldwide staff of about 2,200 in 2018 and an annual budget of about €6.68 billion in 2020.',
		},
		{
			name: 'EurekAlert!',
			source: '&source=eurekalert',
			imagePath: require('../assets/logos/eurekalert.png'),
			description:
				'EurekAlert! is an online science news service featuring health, medicine, science and technology news from leading research institutions and universities.',
		},
		{
			name: 'Forbes',
			source: '&source=forbes',
			imagePath: require('../assets/logos/forbes.png'),
			description:
				'Forbes is an American business magazine owned by Integrated Whale Media Investments and the Forbes family. Published eight times a year, it features original articles on finance, industry, investing, and marketing topics.',
		},
		{
			name: 'Gizmodo',
			source: '&source=gizmodo',
			imagePath: require('../assets/logos/gizmodo.png'),
			description:
				'Gizmodo is a design, technology, science and science fiction website. It was originally launched as part of the Gawker Media network run by Nick Denton, and runs on the Kinja platform. Gizmodo also includes the subsite io9, which focuses on science fiction and futurism.',
		},
		{
			name: 'HuffPost',
			source: '&source=huffpost',
			imagePath: require('../assets/logos/huffpost.png'),
			description:
				'HuffPost is an American news aggregator and blog, with localized and international editions.',
		},
		{
			name: 'Live Science',
			source: '&source=livescience',
			imagePath: require('../assets/logos/livescience.png'),
			description:
				'Live Science is a science news website run by Future via Purch, which it purchased from Imaginova in 2009. Stories and editorial commentary are typically syndicated to major news outlets, such as Yahoo!, MSNBC, AOL, and Fox News.',
		},
		{
			name: 'NASA',
			source: '&source=nasa',
			imagePath: require('../assets/logos/nasa.png'),
			description:
				'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research. NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics.',
		},
		{
			name: 'Phys.org',
			source: '&source=physorg',
			imagePath: require('../assets/logos/physorg.png'),
			description:
				'Phys.org is a UK-based science, research and technology news aggregator offering briefs from press releases and news agencies. It also summarizes journal reports and produces its own science journalism.',
		},
		{
			name: 'Popular Science',
			source: '&source=popsci',
			imagePath: require('../assets/logos/popsci.png'),
			description:
				'Popular Science is an American quarterly magazine carrying popular science content, which refers to articles for the general reader on science and technology subjects.',
		},
		{
			name: 'Real Clear Science',
			source: '&source=realclearscience',
			imagePath: require('../assets/logos/realclearscience.png'),
			description:
				'RealClearScience (RCS) is the portal to the best, most relevant science stories from around the globe. Readers find everything from small talk fodder for around the dinner table to the latest significant findings on the frontier of discovery.',
		},
		{
			name: 'Science Daily',
			source: '&source=sciencedaily',
			imagePath: require('../assets/logos/sciencedaily.png'),
			description:
				'Science Daily is an American website that aggregates press releases and publishes lightly edited press releases about science, similar to Phys.org and EurekAlert!',
		},
		{
			name: 'Science News',
			source: '&source=sciencenews',
			imagePath: require('../assets/logos/sciencenews.png'),
			description:
				'Science News is an American bi-weekly magazine devoted to short articles about new scientific and technical developments, typically gleaned from recent scientific and technical journals.',
		},
		{
			name: 'Space.com',
			source: '&source=spacecom',
			imagePath: require('../assets/logos/spacecom.png'),
			description:
				'Space.com is a space and astronomy news website owned by Future. Its stories are often syndicated to other media outlets, including CNN, MSNBC, Yahoo!, and USA Today. Space.com was founded by former CNN anchor Lou Dobbs and Rich Zahradnik, in July 1999',
		},
		{
			name: 'The Scientist',
			source: '&source=thescientist',
			imagePath: require('../assets/logos/thescientist.png'),
			description:
				'The Scientist is a professional magazine intended for life scientists. Coverage includes articles on recently published research papers, current research, techniques, important career news, profiles of established and up and coming scientists, publishing, research integrity and best practices, as well as other columns and reports of interest to its readers.',
		},
	];

	let imagePath = '';
	let description = '';

	switch (website) {
		case 'Ars Technica':
			imagePath = data[0].imagePath;
			description = data[0].description;
			break;
		case 'BBC':
			imagePath = data[1].imagePath;
			description = data[1].description;
			break;
		case 'CBS News':
			imagePath = data[2].imagePath;
			description = data[2].description;
			break;
		case 'ESA':
			imagePath = data[3].imagePath;
			description = data[3].description;
			break;
		case 'EurekAlert!':
			imagePath = data[4].imagePath;
			description = data[4].description;
			break;
		case 'Forbes':
			imagePath = data[5].imagePath;
			description = data[5].description;
			break;
		case 'Gizmodo':
			imagePath = data[6].imagePath;
			description = data[6].description;
			break;
		case 'HuffPost':
			imagePath = data[7].imagePath;
			description = data[7].description;
			break;
		case 'Live Science':
			imagePath = data[8].imagePath;
			description = data[8].description;
			break;
		case 'NASA':
			imagePath = data[9].imagePath;
			description = data[9].description;
			break;
		case 'Phys.org':
			imagePath = data[10].imagePath;
			description = data[10].description;
			break;
		case 'Popular Science':
			imagePath = data[11].imagePath;
			description = data[11].description;
			break;
		case 'Real Clear Science':
			imagePath = data[12].imagePath;
			description = data[12].description;
			break;
		case 'Science Daily':
			imagePath = data[13].imagePath;
			description = data[13].description;
			break;
		case 'Science News':
			imagePath = data[14].imagePath;
			description = data[14].description;
			break;
		case 'Space.com':
			imagePath = data[15].imagePath;
			description = data[15].description;
			break;
		case 'The Scientist':
			imagePath = data[16].imagePath;
			description = data[16].description;
			break;
		default:
			imagePath = require('../assets/logos/placeholder.png');
			description = '';
	}

	const renderItem = ({ item }) => {
		const { id, title, description, date, link, website, imageUrl } = item;

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

	const loadNextPage = () => {
		if (!haveReachedEnd) {
			setIsLoadingNextPage(true);
			setPage(page + 1);
		}
	};

	const renderFlatlist = () => {
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
						if (!isTopic) {
							return (
								<Layout
									style={{
										paddingVertical: 24,
									}}
								>
									<Layout
										style={{
											flex: 1,
											alignItems: 'center',
											justifyContent: 'space-between',
											flexDirection: 'row',
											marginBottom: 18,
										}}
									>
										<Layout
											style={{
												flex: 2,
												flexDirection: 'row',
												marginLeft: 12,
												alignItems: 'center',
											}}
										>
											<Image
												source={imagePath}
												style={{
													height: 40,
													width: 40,
													marginRight: 12,
													marginLeft: 12,
												}}
											/>
											<Layout>
												<Text category="h5">{website}</Text>
												<Text category="s2" appearance="hint" style={{}}>
													{subtitle}
												</Text>
											</Layout>
										</Layout>
										<Layout style={{ flex: 1, alignItems: 'center' }}>
											<Text category="h5">
												{articleCount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
											</Text>
											<Text category="s2" appearance="hint">
												Articles
											</Text>
										</Layout>
									</Layout>
									<Layout style={{ paddingHorizontal: 24, marginBottom: 18 }}>
										<Button
											size="small"
											onPress={() => openLink(`https://${subtitle}/`)}
											style={{ borderRadius: 10, height: 40 }}
											accessoryLeft={WebIcon}
										>
											Go to Website
										</Button>
									</Layout>
									<Layout style={{ paddingHorizontal: 24 }}>
										<Text category="c1" appearance="hint">
											{description}
										</Text>
									</Layout>
								</Layout>
							);
						} else return null;
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
				title={website}
				// subtitle={subtitle}
				alignment="center"
				accessoryLeft={BackAction}
				// accessoryRight={SubscribeAction}
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
							source={require('../assets/illustrations/no_connection.png')}
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
			<Layout style={{ flex: 1 }} level="2">
				{isLoading ? (
					<Layout
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
					>
						<Spinner size="giant" status="basic" />
						<Text appearance="hint" category="c1" style={{ marginTop: 8 }}>
							Loading...
						</Text>
					</Layout>
				) : (
					renderFlatlist()
				)}
			</Layout>
			{/* <AdMobBannerComponent size="banner" /> */}
		</>
	);
};
