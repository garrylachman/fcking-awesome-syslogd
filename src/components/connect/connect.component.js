import React from 'react';
import { Button, Input } from '@ui-kitten/components';
import { Text, View, StyleSheet } from 'react-native';
import { SyslogdContext } from '../../core/syslogd';


export const Connect = () => {
    const [state, serverState, start, stop, reset] = React.useContext(SyslogdContext);
    const [port, setPort] = React.useState(8088);

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
        <View style={{flexDirection: 'column', justifyContent: 'flex-end', width: '35%'}}>
            <Input
                placeholder={"8088"}
                label='UDP Port'
                value={`${port}`}
                maxLength={6}
                onChangeText={(value) => setPort(value)}
            />
        </View>

        <View style={{flexDirection: 'column', justifyContent: 'flex-end', width: '65%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 0.7}}>
          <Button
            style={{flexDirection: 'column', flex: 0.4}}
            disabled={serverState}
            onPress={() => {
              console.log(start)
              start(port);
            }}
          >Start</Button>
          <Button
            style={{flexDirection: 'column', flex: 0.4}}
            disabled={!serverState}
            onPress={() => {
              stop()
            }}
          >Stop</Button>    
          </View>
        </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    captionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    captionIcon: {
      width: 10,
      height: 10,
      marginRight: 5
    },
    captionText: {
      fontSize: 12,
      fontWeight: "400",
      color: "#8F9BB3",
    }
  });