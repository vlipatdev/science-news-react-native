import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './HomeScreen';
import { ReaderScreen } from './ReaderScreen';
// import { SubscriptionsScreen } from './SubscriptionsScreen';
// import { UpdateScreen } from './UpdateScreen';
import { WebScreen } from './WebScreen';
import { ProfileScreen } from './ProfileScreen';
import { SettingsScreen } from './SettingsScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
	<Navigator headerMode="none">
		<Screen name="Home" component={HomeScreen} />
		<Screen name="Reader" component={ReaderScreen} />
		{/* <Screen name="Subscriptions" component={SubscriptionsScreen} /> */}
		{/* <Screen name="Update" component={UpdateScreen} /> */}
		<Screen name="Web" component={WebScreen} />
		<Screen name="Profile" component={ProfileScreen} />
		<Screen name="Settings" component={SettingsScreen} />
	</Navigator>
);

export const AppNavigator = () => (
	<NavigationContainer>
		<HomeNavigator />
	</NavigationContainer>
);
