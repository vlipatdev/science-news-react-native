import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Layout, Text } from '@ui-kitten/components';

import { ToggleComponent } from './ToggleComponent';

export const SettingsListItem = ({ name, icon, hasToggle, isToggled }) => {
	const renderIcon = () => {
		switch (icon) {
			case 'info':
				return (
					<Icon fill="#8F9BB3" name={'info-outline'} style={styles.icon} />
				);
			case 'star':
				return (
					<Icon fill="#8F9BB3" name={'star-outline'} style={styles.icon} />
				);
			case 'edit':
				return (
					<Icon fill="#8F9BB3" name={'edit-2-outline'} style={styles.icon} />
				);
			case 'message':
				return (
					<Icon
						fill="#8F9BB3"
						name={'message-square-outline'}
						style={styles.icon}
					/>
				);
			case 'moon':
				return (
					<Icon fill="#8F9BB3" name={'moon-outline'} style={styles.icon} />
				);
			case 'text':
				return (
					<Icon fill="#8F9BB3" name={'text-outline'} style={styles.icon} />
				);
			case 'slash':
				return (
					<Icon fill="#8F9BB3" name={'slash-outline'} style={styles.icon} />
				);
			case 'square':
				return (
					<Icon fill="#8F9BB3" name={'square-outline'} style={styles.icon} />
				);
			case 'globe':
				return (
					<Icon fill="#8F9BB3" name={'globe-2-outline'} style={styles.icon} />
				);
			case 'skip':
				return (
					<Icon
						fill="#8F9BB3"
						name={'arrowhead-right-outline'}
						style={styles.icon}
					/>
				);
			case 'shield':
				return (
					<Icon fill="#8F9BB3" name={'shield-outline'} style={styles.icon} />
				);
		}
	};

	return (
		<Layout
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginHorizontal: 16,
				height: 50,
			}}
		>
			<Layout
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{renderIcon()}
				<Text>{name}</Text>
			</Layout>

			{hasToggle ? <ToggleComponent name={name} isToggled={isToggled} /> : null}
			{hasToggle ? null : (
				<Icon
					fill="#8F9BB3"
					name={'chevron-right-outline'}
					style={{
						height: 24,
						width: 24,
						marginRight: -8,
					}}
				/>
			)}
		</Layout>
	);
};

const styles = StyleSheet.create({
	icon: {
		height: 20,
		width: 20,
		marginRight: 16,
	},
});
