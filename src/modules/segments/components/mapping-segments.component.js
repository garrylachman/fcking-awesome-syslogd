import React from 'react';
import { Button, IndexPath, Input, Select, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { SectionCard } from '../../../components/card';
import { SimpleTable } from '../../../components/table';

export const MappingSegments = ({mapping, onUpdate}) => {
    const [state, setState] = React.useState(mapping);
    const handle = React.useCallback(() => onUpdate(state), [state]);
    const cardStatus = React.useMemo(() => state.find(value => !value.name) ? 'danger' : 'success', [state]);
    const typeOptions = React.useMemo(() => ["String", "Int", "Float"], []);
    const tableColumns = React.useMemo(() => [
        {text: 'ID',            flex: 1},
        {text: 'Segment Name',  flex: 4},
        {text: '',              flex: 1},
        {text: 'Data Type',     flex: 3},
        {text: '',              flex: 2},
        {text: 'Sample Data',   flex: 6}
    ], []);

    const SegmentNameColumn = React.useCallback(({item, itemID}) => (
        <Input 
            placeholder="segment name"
            size="small"
            style={styles.nameInput}
            value={item.name}
            status={item.name ? 'success' : 'danger'}
            onChangeText={(value) => 
                setState(oldState => 
                    [...oldState].map((sItem, sIndex) => 
                        sIndex == itemID ? {...sItem, name: value} : sItem
                    )
                )
            }
        />
    ), []);

    const SegmentTypeColumn = React.useCallback(({item, itemID}) => (
        <Select
            style={styles.typeSelect}
            value={typeOptions[item.type]}
            size="small"
            selectedIndex={new IndexPath(item.type)}
            onSelect={(optionIndex) => 
                setState(oldState => 
                    [...oldState].map((sItem, sIndex) => 
                        sIndex == itemID ? {...sItem, type: optionIndex-1} : sItem
                    )
                )
            }>
                {typeOptions.map((sItem, sIndex) => (
                    <SelectItem title={sItem} key={`select-${itemID}-${sIndex}`}/>
                ))}
        </Select>
    ), []);

    const ColumnFactory = React.useCallback((item, rowIndex, colIndex) => (
        <>
            {colIndex == 0 && <Text>{rowIndex}</Text>}
            {colIndex == 1 && <SegmentNameColumn item={item} itemID={rowIndex} />}
            {colIndex == 2 && <View></View>}
            {colIndex == 3 && <SegmentTypeColumn item={item} itemID={rowIndex} />}
            {colIndex == 4 && <View></View>}
            {colIndex == 5 && <Text>{item.sample}</Text>}
        </>
    ), [])

    return (
        <SectionCard title="Mapping" status={cardStatus}>
            <SimpleTable
                data={state}
                columns={tableColumns}
                getItem={ColumnFactory}
            />
            <View style={styles.fotter}>
                <Button size="small" status='primary' onPress={handle} disabled={state.length == 0}>Save</Button>
            </View>
        </SectionCard>
    )
};


const styles = StyleSheet.create({
    nameInput: {
        flex:1
    },
    typeSelect: {
        flex: 1
    },
    fotter: {
        height: 35,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-end'
    }
})