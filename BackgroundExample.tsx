import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

export function BackgroundExample(props: SvgProps): JSX.Element {
    return (
        <Svg viewBox='0 0 1280.212 440.143' {...props}>
            <G>
                <Path d='M0 102.744l408.755-79.391 378.74 113.54L1280.213-.002v337.146H0z' fill='#fcdd4c' />
                <Path d='M0 136.744l408.755-79.391 378.74 113.54 492.718-136.895v337.146H0z' fill='#4fc0e0' />
                <Path d='M0 171.744l408.755-79.391 378.74 113.54 492.718-136.895v337.146H0z' fill='#4fb598' />
                <Path d='M0 205.744l408.755-79.391 378.74 113.54 492.718-136.895v337.146H0z' fill='#ee636a' />
            </G>
        </Svg>
    );
}
