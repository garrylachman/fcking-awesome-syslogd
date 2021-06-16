import React, { Suspense } from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const SpinnerLayout = () => (
    <Layout style={styles.spinnerContainer} level='2'>
        <Spinner status='success' size='giant'/>
        <Text category="h3">Loading</Text>
    </Layout>
)

export const LazyLoader = ({children}) => (
    <Suspense fallback={<SpinnerLayout />}>
        {children}
    </Suspense>
)

const styles = StyleSheet.create({
    spinnerContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flex: 1,
      flexWrap: 'wrap',
    },
});
