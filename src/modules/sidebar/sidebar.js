
import React from 'react';
import { View } from 'react-native';
import { Menu, MenuItem, Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { SyslogdContext } from '../../core/syslogd';
import { navigate, navigationRef } from './../../core/navigator/navigator.root';
import { Connect } from '../../components/connect';

const FiltersIcon = (props) => (
    <Icon {...props} name='funnel'/>
);

const SegmentsIcon = (props) => (
    <Icon {...props} name='bookmark'/>
);

const SegmentsDataIcon = (props) => (
    <Icon {...props} name='bookmark'/>
);

const SelectedIcon = (props) => (
    <Icon {...props} name='arrow-right-outline' />
);

export const SideBar = () => {
    const styles = useStyleSheet(themedStyles);

    const [selected, setSelected] = React.useState('');
    
    React.useLayoutEffect(() => {
        const unsubscribe = navigationRef.current?.addListener('state', (data) => {
            if (navigationRef.current?.getCurrentRoute()) {
                const route = navigationRef.current?.getCurrentRoute();
                if (route.name) {
                    setSelected(route.name)
                }
            }
        });
    
        return unsubscribe;
      }, [navigationRef, navigationRef.current]);

    return (
        <View style={{justifyContent: 'flex-start'}}>
            <Text appearance='hint' category='h6' style={styles.menuTitle}>Views</Text>
            <Menu>
                <MenuItem style={selected=='Dashboard' && styles.menuItemSelected} accessoryRight={selected=='Dashboard' && SelectedIcon} title='Dashboard' accessoryLeft={FiltersIcon} onPress={() => navigate('Dashboard') }/>
                <MenuItem style={selected=='SegmentsData' && styles.menuItemSelected} accessoryRight={selected=='SegmentsData' && SelectedIcon} title='Segments Data' accessoryLeft={SegmentsDataIcon} onPress={() => navigate('SegmentsData') }/>
            </Menu>
            <View style={{marginVertical: 20}} />
            <Text appearance='hint'  category='h6' style={styles.menuTitle}>Actions</Text>
            <Menu>
                <MenuItem style={selected=='Filters' && styles.menuItemSelected} accessoryRight={selected=='Filters' && SelectedIcon} title='Filters' accessoryLeft={FiltersIcon} onPress={() => navigate('Filters') }/>
                <MenuItem style={selected=='Segments' && styles.menuItemSelected} accessoryRight={selected=='Segments' && SelectedIcon} title='Segments' accessoryLeft={SegmentsIcon} onPress={() => navigate('Segments') }/>
            </Menu>
            <View style={{marginVertical: 20}} />
            <Text appearance='hint'  category='h6' style={styles.menuTitle}>Syslog Daemon</Text>
            <Connect />
        </View>
    );
}

const themedStyles = StyleService.create({
    menuTitle: {
        marginLeft: 15,
        marginVertical: 5
    },
    menuItemSelected: {
        backgroundColor: 'color-control-active',
        borderLeftColor: 'color-basic-active-border',
        borderLeftWidth: 2,
    },
    container: {
        flex: 1,
      },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 0,
        marginVertical: 0
    },
    item: {
        height: 'auto',
        marginVertical: 0,
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center'
    },
});