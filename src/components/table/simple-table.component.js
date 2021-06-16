import React from 'react';
import { Divider, Text } from "@ui-kitten/components";
import { View, StyleSheet, ScrollView } from "react-native";
import { CenteredRow } from '../utils';

export const SimpleTable = ({columns, getItem, data}) => {
    const Header = React.useCallback(() => (
        <View style={styles.header}>
            <CenteredRow>
                {columns.map((col, colIndex) => (
                    <Text category="c2" key={`SimpleTable-Column-${colIndex}`} style={[styles.headerColumn, {flex: col.flex}]}>{col.text}</Text>
                ))}
            </CenteredRow>
        </View>
    ), [columns]);

    return (
        <>
            <Header />
            <ScrollView centerContent={false} style={styles.scrollView}>
                {data && data.map((item, rowIndex) => (
                    <View key={`SimpleTable-Row-${rowIndex}`}>
                        <CenteredRow style={styles.tableRow}>
                            {columns.map((col, colIndex) => (
                                <View key={`SimpleTable-Row-${rowIndex}-Column-${colIndex}`} style={[styles.tableColumn, {flex: col.flex}]}>
                                    {getItem(item, rowIndex, colIndex)}
                                </View>
                            ))}
                        </CenteredRow>
                        <Divider />
                    </View>
                ))}
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 15,
        marginVertical: 10
    },
    headerColumn: {
        flexDirection: 'row'
    },
    scrollView: {
        flex: 1
    },
    tableRow: {
        paddingVertical: 5
    },
    tableColumn: {
        flexDirection: 'row'
    }
})