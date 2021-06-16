import { ListItem, List, Button, Input, Text, Divider, Layout, Icon } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ConsoleComponent } from '../../components/console/console.component';
import { FiltersActionType, FiltersContext } from '../../core/store/filters';
import { SyslogdContext } from '../../core/syslogd';
import {useDebounce} from '@react-hook/debounce'


const FiltersRulesList = ({rules, setFilterData}) => {

    const [ediableRules, setEdiableRules] = React.useState(rules);

    const RenderItem = ({item, index}) => (
        <ListItem
            key={`filter-rule-${index}`}
            style={{marginBottom: 10}}
        >
            <View style={{flexDirection: 'row', flex:1,  justifyContent: 'space-between', alignItems: 'center'}}>
                <Input 
                    value={item.pattern}
                    style={{width: '50%'}}
                    placeholder="Rule pattern, ex: *syslog* or *info*"
                    onChangeText={(value) => {
                        setEdiableRules(oldState => {
                            let newState = [...oldState];
                            newState[index].pattern = value;
                            return newState;
                        })
                    }}
                />
                <View style={{flexDirection: 'row'}}>
                    <Button size="small" status='primary' style={{marginRight: 10}} onPress={() => {
                        setFilterData(oldState => {
                            let newState = [...oldState];
                            newState[index] = [...ediableRules][index];
                            return newState;
                        })
                    }}>Save Rule</Button>
                    <Button size="small" status='danger' onPress={() => deleteFilter(index)}>Delete Rule</Button>
                </View>
            </View>
        </ListItem>
    )

    const ListFooter = React.useCallback( () => (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20}}>
            <Button 
                status="success" 
                onPress={() => {
                    setEdiableRules(oldState => [...oldState, { pattern: '' }]);
                }}
            >Add Rule</Button>
        </View>
    ), []);

    return React.useMemo(() => (
        <List 
            data={ediableRules} 
            ItemSeparatorComponent={Divider}
            renderItem={RenderItem}
            ListFooterComponent={ListFooter}
            style={styles.contentContainer}
        />
    ), [ediableRules]);
}


export const Filters = ({navigation}) => {

    const [filtersState, filtersDispatcher] = React.useContext(FiltersContext)

    const [filterData, setFilterData] = useDebounce([...filtersState.filters]);

    const [state, serverState, start, stop, reset] = React.useContext(SyslogdContext);

    React.useEffect(() => {
        filtersDispatcher({
            type: FiltersActionType.UPDATE,
            value: [...filterData]
        })
    }, [filterData]);

    React.useEffect(() => {
        console.log(filtersState)
        if (JSON.stringify(filterData) != JSON.stringify(filtersState.filters)) {
            setFilterData([...filtersState.filters]);
        }
    }, [filtersState]);

    const RulesList = React.useCallback( () => {
        return (
            <View style={{flex:1, width: '100%'}}>
                <FiltersRulesList 
                    rules={filterData}
                    setFilterData={setFilterData}
                />
            </View>
        )
    }, [filterData]);

    return (
        <Layout style={styles.container}>
            <RulesList />
            <View style={{flexDirection: 'row', height: 300, justifyContent: 'flex-end', alignItems: 'center', alignContent:'stretch'}} >
                <Layout style={styles.container}>
                    <ConsoleComponent 
                        style={{height: '100%'}}
                        data={state.lines}
                        hightlightRules={[...filterData].map(r => r.pattern)}
                        applyFilters={false}
                    />
                </Layout>
            </View>
        </Layout>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      contentContainer: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 0,
        flex: 1
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