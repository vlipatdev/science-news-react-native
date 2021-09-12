import React from 'react';
import { Toggle, Layout } from '@ui-kitten/components';

export const ToggleComponent = ({ isToggled }) => {
	return (
		<Layout pointerEvents="none">
			<Toggle checked={isToggled} />
		</Layout>
	);
};
