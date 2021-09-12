import React from 'react';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as theme } from './themes/light-theme.json';
import { AppNavigator } from './screens/navigation';
import { StatusBarSpacer } from './components/StatusBarSpacer';

const App = () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
				<StatusBarSpacer />
				<AppNavigator />
			</ApplicationProvider>
		</>
	);
};

export default App;
