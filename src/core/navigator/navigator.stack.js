import React from 'react';

import { enableScreens } from 'react-native-screens';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { BackButton, LazyLoader } from '../../components/navigation';

const Dashboard = React.lazy(() => import('../../modules/dashboard'));
const SegmentsData = React.lazy(() => import('../../modules/segments-data'));
const Segments = React.lazy(() => import('../../modules/segments'));
const Filters = React.lazy(() => import('../../modules/filters'));

const LazyDashboard = (props) => (<LazyLoader><Dashboard {...props} /></LazyLoader>)
const LazySegmentsData = (props) => (<LazyLoader><SegmentsData {...props} /></LazyLoader>)
const LazySegments = (props) => (<LazyLoader><Segments {...props} /></LazyLoader>)
const LazyFilters = (props) => (<LazyLoader><Filters {...props} /></LazyLoader>)

enableScreens(true);
const Stack = createNativeStackNavigator();

export const NavigatorStack = () => {
    return (
    <Stack.Navigator screenOptions={{stackAnimation: 'flip', stackPresentation: 'containedModal', headerShown: true}} >
        <Stack.Screen name="Dashboard" component={LazyDashboard} />
        <Stack.Screen name="SegmentsData" component={LazySegmentsData} options={({ navigation }) => ({ title: 'Segments Data', headerLeft: ()=>(<BackButton onPress={() => navigation.goBack()} />) })} />
        <Stack.Screen name="Filters" component={LazyFilters} options={({ navigation }) => ({ title: 'Filters', headerLeft: ()=>(<BackButton onPress={() => navigation.goBack()} />) })} />
        <Stack.Screen name="Segments" component={LazySegments} options={({ navigation }) => ({ title: 'Segments', headerLeft: ()=>(<BackButton onPress={() => navigation.goBack()} />) })} />
      </Stack.Navigator>
    )
}

