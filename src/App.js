/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components';

import { SyslogdContextProvider } from './core/syslogd';
import { SideBar } from './modules/sidebar/sidebar';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { NavigatorStack } from './core/navigator/navigator.stack';
import { navigationRef, isReadyRef } from './core/navigator/navigator.root';
import { FiltersContextProvider } from './core/store/filters';
import { SegmentsContext, SegmentsContextProvider } from './core/store/segments';
import { SpinnerLayout } from './components/navigation';

const AppSuspended = ({children}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [segmentsState] = React.useContext(SegmentsContext);

  React.useEffect(() => {
    if (isLoading && segmentsState) {
      setIsLoading(false);
    }
  }, [segmentsState]);

  return React.useMemo(() => isLoading ? <SpinnerLayout /> : <>{children}</>, [isLoading]);
}


const App = () => {

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);
  
  return (
    <NavigationContainer ref={navigationRef} onReady={() => { isReadyRef.current = true; }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <FiltersContextProvider>
          <SegmentsContextProvider>
            <SyslogdContextProvider>
              <SafeAreaView style={styles.scrollView}>
                <AppSuspended>
                  <Layout style={{flexDirection: 'row', flex: 1}}>
                    <Layout style={{flex: 0.2, flexDirection:'column', padding: 10}} level="1"><SideBar /></Layout>
                    <Layout style={{flex: 0.8, flexDirection:'column', padding: 10}} level="2">
                      <NavigatorStack />  
                    </Layout>
                  </Layout>
                </AppSuspended>
              </SafeAreaView>
            </SyslogdContextProvider>
          </SegmentsContextProvider>
        </FiltersContextProvider>
      </ApplicationProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: 'white'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
