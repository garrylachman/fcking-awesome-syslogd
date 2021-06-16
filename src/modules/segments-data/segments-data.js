import React from 'react';
import { View } from 'react-native';
import { Layout, useStyleSheet, StyleService } from '@ui-kitten/components';
import { SyslogdContext } from '../../core/syslogd';
import { TableView, Search } from './components';
import { InteractionManager } from 'react-native';
import { SegmentsContext } from '../../core/store/segments';


export const SegmentsData = ({navigation}) => {
    const [state, serverState, start, stop, reset, segmentData] = React.useContext(SyslogdContext);
    const [segmentsState, segmentsDispatcher, matchRegex, extractRegex] = React.useContext(SegmentsContext);

    const [searchState, setSearchState] = React.useState(null);
    const [dataIndex, setDataIndex] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingText, setLoadingText] = React.useState("Loading...");
    const [filteredData, setFilteredData] = React.useState([]);
    const [flexArrState, setFlexArrState] = React.useState([]);
	
    const columns = React.useMemo(() => {
        return segmentsState.mapping.map((value, index) => ({
            'dataKey': value.name,
            'title': value.name,
            flex: flexArrState[index] || 1
        }))
    }, [segmentsState.mapping, flexArrState])

    React.useEffect(() => {
        if (flexArrState.length == 0 && segmentData.length > 0)    {
            const firstRow = segmentData[0];
            let totalLength = 0;
            for (let [k,v] of Object.entries(firstRow)) {
                totalLength += Math.max(v.length,k.length);
            }
            const colPrecent = 100/totalLength;
            const flexArr = Object.entries(firstRow).map(([k,v]) => Math.max(v.length,k.length) * colPrecent);
            setFlexArrState(flexArr);
        }
        const chunkForIndex = segmentData.slice(dataIndex.length).map(obj => Object.values(obj).join(","));
        setDataIndex(oldState => [...oldState, ...chunkForIndex]);
    }, [segmentData])

    React.useEffect(() => {
        if (searchState == null || searchState == '')  {
            setFilteredData(segmentData);
            return;
        }
        
        InteractionManager.runAfterInteractions(() => {
            if (searchState == null || searchState == '')  {
                setFilteredData(segmentData);
            }
            let matchedIndexes = [];
            for (i in dataIndex) {
                if (dataIndex[i].includes(searchState)) {
                    matchedIndexes.push(i);
                }
            }
            const results = matchedIndexes.map((i) => segmentData[i]);
            setFilteredData(results);
        })
        .done(() => setIsLoading(false))
      

    }, [searchState, segmentData])


    const handleSearch = React.useCallback((value) => {
        setSearchState(value)
    }, []);
    const styles = useStyleSheet(themedStyles);

    return (
        <Layout style={styles.container} level="2">
            <View style={{height: 120, marginBottom: 10}}>
            <Search
                doSearch={handleSearch}
            />
            </View>
            <View style={{flex: 1}}>
                <TableView
                    columns={columns}
                    data={filteredData}
                    isLoading={isLoading}
                    loadingText={loadingText}
                />
            </View>
        </Layout>
    )
}

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 10
      },
      tableRowHeader: {
          backgroundColor: 'background-basic-color-3',
          maxHeight: 30,
          minHeight: 30
      },
      tableRowHeaderText: {
        fontWeight: "bold"
      }
});