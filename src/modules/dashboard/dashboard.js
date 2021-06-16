import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { SyslogdContext } from '../../core/syslogd';
import { ConsoleComponent } from '../../components/console/console.component';
import { FiltersContext } from '../../core/store/filters';


export const Dashboard = ({navigation}) => {

    const [state, serverState, start, stop, reset] = React.useContext(SyslogdContext);
    const [filtersState, filtersDispatcher] = React.useContext(FiltersContext);

    return (
        <Layout style={styles.container}>
            <ConsoleComponent 
                data={state.lines}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      }
});