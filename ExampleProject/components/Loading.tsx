import React from 'react';
import { Text } from 'react-native';

interface Props {
    text: string;
}

function Loading(props: Props): JSX.Element {
    return <Text>Loading {props.text}</Text>;
}

export default React.memo(Loading);
