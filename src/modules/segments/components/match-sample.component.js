import React from 'react';
import { Text } from '@ui-kitten/components';
import { SectionCard } from '../../../components/card';

export const MatchSample = ({data}) => {
    const cardStatus = React.useMemo(() => data?.msg ? 'success' : 'danger', [data]);
    return (
        <SectionCard title="Matched Sample" status={cardStatus}>
            {data && data?.msg
                ? <Text adjustsFontSizeToFit={true} numberOfLines={1}>{data.msg}</Text>
                : <Text>No Matches Found</Text>
            }
        </SectionCard>
    );
};