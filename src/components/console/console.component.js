import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from '@ui-kitten/components';

export const ConsoleComponent = ({data, hightlightRules, applyFilters = true}) => {

    const scrollViewRef = React.useRef();
    const [scrollingState, setScrollingState] = React.useState(false);
    const filteredData = React.useMemo(() => applyFilters ? data.filter(i => !i.isFiltered) : data, [data, applyFilters]);

    const hightlightRegexs = React.useMemo(() => hightlightRules ? hightlightRules.map(r => new RegExp(r)) : [], [hightlightRules]);

    const hightlightComposedRegex = React.useMemo(() => {
        if (hightlightRegexs && hightlightRegexs.length >0) {
            return new RegExp(
                hightlightRegexs.map(r => r.source).join("|")
            )
        }
        return null;
    }, [hightlightRegexs]);
    
 
    React.useEffect(() => {
        if (!scrollingState) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [filteredData])

    const renderItem = React.useCallback( ({item, index}) => {
        /*if (filterRules && micromatch.isMatch(item.msg, filterRules) ) {
            return (<></>)
        }*/
        let hightlightStyle = {}
        if (hightlightComposedRegex) {
            hightlightStyle = hightlightComposedRegex.test(item.msg) ? { backgroundColor: 'yellow' } : {};
        }
        return (
            <View style={[styles.item, hightlightStyle]} key={`line-${index}`}>
                <Text style={{paddingVertical: 5}}>{item.msg}</Text>
            </View>
        );
    }, [hightlightComposedRegex]);

    return (
        <List
            
            ref={scrollViewRef}
            contentContainerStyle={styles.contentContainer}
            data={filteredData}
            renderItem={renderItem}
            snapToEnd={true}
            onScrollBeginDrag={() => setScrollingState(true)}
            onScrollEndDrag={() => setTimeout(() => setScrollingState(false), 2000)}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    contentContainer: {
        paddingHorizontal: 0,
        paddingVertical: 10,
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