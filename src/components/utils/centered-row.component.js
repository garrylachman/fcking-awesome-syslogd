import React from 'react';
import { View, StyleSheet } from "react-native";

export const CenteredRow = ({style, children}) => (
    <View style={[styles.centerRow, style]}>
        {children}
    </View>
)

const styles = StyleSheet.create({
    centerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})