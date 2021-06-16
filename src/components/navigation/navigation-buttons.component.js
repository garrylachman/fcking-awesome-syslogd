import React from 'react';
import { Button, Icon } from '@ui-kitten/components';


const BackIcon = (props) => (
    <Icon {...props} name='arrow-ios-back'/>
);

export const BackButton = ({onPress}) => (
    <Button style={{top: -4}} size="small" appearance="ghost" status="primary" accessoryLeft={BackIcon} onPress={onPress}>Back</Button>
);