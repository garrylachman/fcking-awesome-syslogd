import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SyslogdContext } from '../../core/syslogd';
import {useDebounce} from '@react-hook/debounce'
import { SegmentsActionType, SegmentsContext } from '../../core/store/segments';
import { MatchRegex, MatchSample, ExtractRegex, MappingSegments } from './components';
import { Layout } from '@ui-kitten/components';

export const regexValidator = (regex) => {
    try {
        new RegExp(regex);
        return true;
    } catch (error) {
        return error.message;
    }
}

export const Segments = ({navigation}) => {

    const [segmentsState, segmentsDispatcher, matchRegex, extractRegex] = React.useContext(SegmentsContext);

    const [segmentData, setSegmentData] = useDebounce({...segmentsState});

    const [state, serverState, start, stop, reset] = React.useContext(SyslogdContext);

    React.useEffect(() => {
        console.log("React.useEffect", segmentData);
        segmentsDispatcher({
            type: SegmentsActionType.UPDATE,
            value: {...segmentData}
        })
    }, [segmentData]);

    React.useEffect(() => {
        console.log(segmentsState)
        if (JSON.stringify(segmentData) != JSON.stringify(segmentsState)) {
            setSegmentData({...segmentsState});
        }
    }, [segmentsState]);

    React.useEffect(() => {
        if (matchRegex && state.lines.length > 0) {
            setSegmentData(oldState => ({
                ...oldState,
                sampleLine: state.lines.find((line) => matchRegex.test(line.msg))
            }))
        }
    }, [matchRegex]);

    React.useEffect(() => {
        if (extractRegex && segmentData.sampleLine?.msg && segmentData.mapping.length == 0) {
            console.log("React.useEffect: extractRegex", extractRegex, "segmentData.sampleLine", segmentData.sampleLine)
            const regexRes = extractRegex.exec(segmentData.sampleLine.msg);
            console.log("regexRes", regexRes)
            if (regexRes && regexRes.length > 1)    {
                setSegmentData(oldState => ({
                    ...oldState,
                    mapping: regexRes.slice(1).map(value => ({
                        name: '',
                        type: 0,
                        sample: value
                    }))
                }))
            }
        }
    }, [extractRegex]);

    const handleMatchRegex = React.useCallback((value) => {
        setSegmentData(oldState => ({
            ...oldState,
            matchRegex: value
        }))
    }, []);

    const handleExtractRegex = React.useCallback((value) => {
        setSegmentData(oldState => ({
            ...oldState,
            mapping: [],
            extractRegex: null
        }))
        setSegmentData(oldState => ({
            ...oldState,
            extractRegex: value
        }))
    }, []);

    const handleMappingSegments = React.useCallback((value) => {
        setSegmentData(oldState => ({
            ...oldState,
            mapping: value,
        }))
    }, []);

    return (
        <Layout style={styles.container} level="2">
            <View style={styles.splitScreenHalf}>
                <View style={styles.matchRegexContainer}>
                    <MatchRegex
                        matchRegex={segmentData.matchRegex}
                        onUpdate={handleMatchRegex}
                    />
                </View>
                <View style={styles.matchSampleContainer}>
                    <MatchSample
                        data={segmentData.sampleLine}
                    />
                </View>
                <View style={styles.extractRegexContainer}>
                    <ExtractRegex 
                        extractRegex={segmentData.extractRegex}
                        matchSample={segmentData.sampleLine}
                        onUpdate={handleExtractRegex}
                    />
                </View>
            </View>
            <View style={[styles.splitScreenHalf, {paddingTop: 10}]}>
                <MappingSegments
                    mapping={segmentData.mapping}
                    onUpdate={handleMappingSegments}
                />
            </View>
        </Layout>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 10
    },
    splitScreenHalf: {
        flex: 1,
        justifyContent: 'space-between'
    },
    matchRegexContainer: {
        flex:3,
        justifyContent:'space-around'
    },
    matchSampleContainer: {
        flex:2,
        justifyContent:'space-around',
        paddingVertical: 10
    },
    extractRegexContainer: {
        flex:3,
        justifyContent:'space-around'
    }
});