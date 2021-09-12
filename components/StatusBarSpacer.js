import React from 'react';
import { StatusBar } from 'react-native';

import { Layout } from '@ui-kitten/components';

export const StatusBarSpacer = () => {
	return <Layout style={{ height: StatusBar.currentHeight }} />;
};
