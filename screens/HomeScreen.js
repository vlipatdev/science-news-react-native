import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	Divider,
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

import { HomePage } from '../components/pages/HomePage';
import { ExplorePage } from '../components/pages/ExplorePage';
import { BookmarksPage } from '../components/pages/BookmarksPage';
import { SearchPage } from '../components/pages/SearchPage';

const HomeIcon = (props) => <Icon {...props} name="activity" />;
const ExploreIcon = (props) => <Icon {...props} name="compass-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const BookmarkIcon = (props) => <Icon {...props} name="bookmark-outline" />;

const BottomTabBar = ({ navigation, state }) => (
	<>
		<Divider />
		<BottomNavigation
			appearance="noIndicator"
			selectedIndex={state.index}
			onSelect={(index) => navigation.navigate(state.routeNames[index])}
		>
			<BottomNavigationTab icon={HomeIcon} />
			<BottomNavigationTab icon={ExploreIcon} />
			<BottomNavigationTab icon={SearchIcon} />
			<BottomNavigationTab icon={BookmarkIcon} />
		</BottomNavigation>
	</>
);

const TabNavigator = () => (
	<Navigator tabBar={(props) => <BottomTabBar {...props} />}>
		<Screen name="Home" component={HomePage} />
		<Screen name="Explore" component={ExplorePage} />
		<Screen name="Search" component={SearchPage} />
		<Screen name="Bookmarks" component={BookmarksPage} />
	</Navigator>
);

export const HomeScreen = () => <TabNavigator />;
