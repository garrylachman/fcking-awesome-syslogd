import React from 'react';
import { Button, Input, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { regexValidator } from '../segments';
import { CenteredRow } from '../../../components/utils';
import { SectionCard } from '../../../components/card';

export const ExtractRegex = ({extractRegex, matchSample, onUpdate}) => {
    const [state, setState] = React.useState(extractRegex);
    const [extractionState, setExtractionState] = React.useState();
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

    React.useEffect(() => {
        setExtractionState(null);
        try {
            const regex = new RegExp(state);
            const regexRes = regex.exec(matchSample?.msg);
            console.log("regexRes", regexRes);
            if (regexRes.length > 1)    {
                setExtractionState(regexRes.slice(1));
            }
        } catch(er) {}
    }, [state, matchSample]);

    const Preview = React.useCallback(() => (
        <CenteredRow style={styles.preview}>
            {extractionState && extractionState.map((item, index) => (
                <View style={styles.previewItem} key={`extKey-${index}`}>
                    <Text category="c1">{item}</Text>
                </View>
            ))}
        </CenteredRow>
    ), [extractionState]);

    return (
        <SectionCard title="Extract Regex" status={cardStatus}>
            <CenteredRow>
                <Input 
                    style={styles.input}
                    value={state}
                    placeholder="^([a-zA-Z]+)"
                    onChangeText={setState}
                    disabled={!matchSample}
                    status={cardStatus}
                />
                <Button size="small" status='primary' onPress={handle} disabled={!matchSample}>Save</Button>
            </CenteredRow>
            {!validationState.valid && validationState.error && 
                <Text status='danger' category='c1' style={styles.validationText}>{validationState.error}</Text>
            }
            {extractionState && <Preview />}
        </SectionCard>
    )
};

const styles = StyleSheet.create({
    input: {
        width: '80%'
    },
    validationText: {
        paddingTop: 5
    },
    preview: {
        paddingTop: 10
    },
    previewItem: {
        backgroundColor:'#E4E9F2',
        borderRadius: 10,
        padding: 5, 
        marginRight: 10
    }
})