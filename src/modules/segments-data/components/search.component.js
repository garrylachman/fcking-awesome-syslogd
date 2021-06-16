import React from 'react';
import { Button, Input } from '@ui-kitten/components';
import { StyleSheet} from 'react-native';
import { CenteredRow } from '../../../components/utils';
import { SectionCard } from '../../../components/card';

export const Search = ({doSearch}) => {
    const [state, setState] = React.useState();

    const handle = React.useCallback(() => doSearch(state), [state]);

    return (
        <SectionCard title="Search">
            <CenteredRow>
                <Input 
                    style={styles.input}
                    value={state}
                    placeholder="Search for...."
                    onChangeText={setState}
                />
                <Button size="small" status='primary' onPress={handle}>Search</Button>
            </CenteredRow>
        </SectionCard>
    )
};

const styles = StyleSheet.create({
    input: {
        width: '80%'
    },
    validationText: {
        paddingTop: 5
    }
})