import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import constants from './src/utils/constants';

import { HomeScreen, DetailsScreen, CastAndCrew, ProfileScreen } from './src/screens';

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator
			initialRouteName={constants.SCREEN.HOME}
			screenOptions={{
				headerStyle: {
					backgroundColor: constants.COLORS.LIGHT_GRAY,
				}
			}}
		>
			<HomeStack.Screen
				name={constants.SCREEN.HOME}
				component={HomeScreen}
				options={{
					title: 'MOVIES',
					headerShown: false,
				}}
			/>
			<HomeStack.Screen
				name={constants.SCREEN.DETAILS}
				component={DetailsScreen}
				options={{
					title: '',
					headerBackTitleVisible: false,
					headerTransparent: true,
				}}
			/>
			<HomeStack.Screen name={constants.SCREEN.CASTANDCREW} component={CastAndCrew} />
		</HomeStack.Navigator>
	);
};

const Router = () => (
	<NavigationContainer>
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === constants.SCREEN.MAIN) {
						iconName = focused ? 'movie' : 'movie-outline';
					} else if (route.name === constants.SCREEN.PROFILE) {
						iconName = 'face-profile';
					}

					return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: constants.COLORS.WARNING,
				inactiveTintColor: constants.COLORS.LIGHT_GRAY,
				showLabel: false,
				keyboardHidesTabBar: true,
				tabStyle: {
					backgroundColor: 'rgba(0,0,0,0)',
				},
				style: {
					backgroundColor: constants.COLORS.LIGHT,
					borderTopLeftRadius: 35,
					borderTopRightRadius: 35,

					position: 'absolute',
					bottom: 0,
					width: '100%',
					height: 80,
					zIndex: 10,
					padding: 10,
				},
			}}
		>
			<Tab.Screen name={constants.SCREEN.MAIN} component={HomeStackScreen} />
			<Tab.Screen name={constants.SCREEN.PROFILE} component={ProfileScreen} />
		</Tab.Navigator>
	</NavigationContainer>
);

export default Router;
