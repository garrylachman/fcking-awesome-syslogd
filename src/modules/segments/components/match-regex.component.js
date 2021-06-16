import React from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { StyleSheet} from 'react-native';
import { regexValidator } from '../segments';
import { CenteredRow } from '../../../components/utils';
import { SectionCard } from '../../../components/card';

export const MatchRegex = ({matchRegex, onUpdate}) => {
    const [state, setState] = React.useState(matchRegex);
    const [validationState, setValidationState] = React.useState({valid: false, error: null});

    React.useEffect(() => {
        const isValid = regexValidator(state);
        if (isValid === true)   {
            setValidationState({valid: true, error: null})
        } else {
            setValidationState({valid: false, error: isValid})
        }
    }, [state]);

    const handle = React.useCallback(() => onUpdate(state), [state]);
    const cardStatus = React.useMemo(() => validationState.valid ? 'success' : 'danger', [validationState]);

    return (
        <SectionCard title="Match Regex" status={cardStatus}>
            <CenteredRow>
                <Input 
                    style={styles.input}
                    value={state}
                    placeholder="Match regex"
                    onChangeText={setState}
                    status={cardStatus}                    
                />
                <Button size="small" status='primary' onPress={handle}>Save</Button>
            </CenteredRow>
            {!validationState.valid && validationState.error && 
                <Text status='danger' category='c1' style={styles.validationText}>{validationState.error}</Text>
            }
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