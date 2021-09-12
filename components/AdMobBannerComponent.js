import React from 'react';

// import { AdMobBanner } from 'expo-ads-admob';

import { Layout } from '@ui-kitten/components';

export const AdMobBannerComponent = React.memo(({ size }) => {
	console.log('Rendering AdMob Banner...');
	return (
		<Layout
			style={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* <AdMobBanner
				bannerSize={size}
				adUnitID="ca-app-pub-7459960426696151/9315497484"
				servePersonalizedAds={true}
			/> */}
		</Layout>
	);
});
