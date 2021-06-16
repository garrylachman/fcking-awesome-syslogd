import React from 'react';
import { Text, Card } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

const SectionCardHeader = ({style = {}, title}) => (
    <View style={[style, styles.cardHeader]}>
      <Text category='label'>{title}</Text>
    </View>
);

export const SectionCard = ({title, children, status='control'}) => (
    <Card style={styles.card} status={status} appearance='filled' header={props => SectionCardHeader({...props, title: title})}>
        <View style={styles.cardContainer}>
            {children}
        </View>
    </Card>
)

const styles = StyleSheet.create({
    card: {
        flex:1 
    },
    cardContainer: {
        flexDirection: 'column',
        flexGrow:1,
        height: '95%',
        flexShrink:1,
        justifyContent: 'center',
        top:-16
    },
    cardHeader: {
        paddingVertical: 10
    }
})