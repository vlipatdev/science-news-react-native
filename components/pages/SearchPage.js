import React, { useState, useEffect } from 'react';
import { Image, FlatList, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
	Icon,
	Layout,
	Input,
	Divider,
	Text,
	Spinner,
} from '@ui-kitten/components';

import { iridiumlab } from '../../api/iridiumlab';

import { ArticleListItem } from '../ArticleListItem';
import { ArticleCardItem } from '../ArticleCardItem';

// import { AdMobBannerComponent } from '../AdMobBannerComponent';

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

export const SearchPage = ({ navigation }) => {
	const [articles, setArticles] = useState([]);
	const [articleCount, setArticleCount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [hasNoResults, setHasNoResults] = useState(false);
	const [isCardView, setIsCardView] = useState(false);
	const [haveReachedEnd, setHaveReachedEnd] = useState(false);
	const [skipSummary, setSkipSummary] = useState(false);
	const [useBrowser, setUseBrowser] = useState(false);

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

	const fetchAPI = async () => {
		try {
			setHaveReachedEnd(false);
			setHasNoResults(false);
			const response = await iridiumlab.get(`/?search=${query}&page=${page}`);
			if (response.data.data.length === 0 && page === 1) {
				setHasNoResults(true);
			} else if (response.data.data.length === 0 && page !== 1) {
				setHaveReachedEnd(true);
			} else if (
				response.data.data.length !== 0 &&
				response.data.data.length !== 20 &&
				page === 1
			) {
				setHaveReachedEnd(true);
			}
			setArticles([...articles, ...response.data.data]);
			if (response.data.meta) {
				setArticleCount(response.data.meta.articles);
			}
			setIsLoading(false);
			setIsLoadingNextPage(false);
		} catch (e) {
			console.log(e);
			setIsLoading(false);
			setHaveReachedEnd(true);
			alert('Something went wrong. Please try again later.');
		}
	};

	useEffect(() => {
		if (hasSearched && page !== 1) {
			fetchAPI();
		}
	}, [page]);

	const submit = () => {
		if (query === '') {
			return;
		}
		setPage(1);
		setHasSearched(true);
		setArticles((articles.length = 0));
		fetchAPI();
		setIsLoading(true);
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

	const renderFlatList = () => {
		if (hasSearched) {
			if (hasNoResults) {
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
								source={require('../../assets/illustrations/no_results.png')}
								style={{
									height: 250,
									width: 250,
									resizeMode: 'contain',
								}}
							/>
							<Text category="h6" style={{ marginBottom: 8 }}>
								No results found
							</Text>
							<Text
								appearance="hint"
								style={{ marginHorizontal: 32, textAlign: 'center' }}
							>
								Try searching for related keywords.
							</Text>
						</Layout>
					</Layout>
				);
			} else {
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
									<Layout
										style={{ paddingVertical: 8, backgroundColor: '#7289DA' }}
									>
										<Text
											category="c1"
											style={{
												marginLeft: 12,
												color: 'white',
											}}
										>
											Found {articleCount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
											results
										</Text>
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
								ListHeaderComponent={() => {
									return (
										<Layout
											style={{ paddingVertical: 8, backgroundColor: '#7289DA' }}
										>
											<Text
												category="c1"
												style={{
													marginLeft: 12,
													color: 'white',
												}}
											>
												Found{' '}
												{articleCount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
												results
											</Text>
										</Layout>
									);
								}}
							/>
						</>
					);
				}
			}
		} else {
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
							source={require('../../assets/illustrations/search.png')}
							style={{
								height: 250,
								width: 250,
								resizeMode: 'contain',
							}}
						/>
						<Text category="h6" style={{ marginBottom: 8 }}>
							Looking for something?
						</Text>
						<Text
							appearance="hint"
							style={{ marginHorizontal: 32, textAlign: 'center' }}
						>
							Search 50,000+ science news articles.
						</Text>
					</Layout>
				</Layout>
			);
		}
	};

	const loadNextPage = () => {
		if (!haveReachedEnd) {
			setIsLoadingNextPage(true);
			setPage(page + 1);
		}
	};

	return (
		<>
			<Layout style={{ flex: 1 }}>
				<Input
					autoFocus={true}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Search for articles"
					accessoryLeft={SearchIcon}
					onChangeText={(value) => setQuery(value)}
					onSubmitEditing={() => {
						submit();
					}}
					style={{
						marginTop: 8,
						marginBottom: 4,
						marginHorizontal: 16,
						borderRadius: 10,
					}}
				/>
				<Divider />
				<Layout style={{ flex: 1 }} level="2">
					{isLoading ? (
						<Layout
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Spinner size="giant" status="basic" />
							<Text appearance="hint" category="c1" style={{ marginTop: 8 }}>
								Loading...
							</Text>
						</Layout>
					) : (
						renderFlatList()
					)}
				</Layout>
			</Layout>
			{/* <AdMobBannerComponent size="banner" /> */}
		</>
	);
};
