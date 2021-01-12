import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export function renderPasswordIcon(color: string, size: number): JSX.Element {
    return <Ionicons selectable={false} name='lock-closed' size={size} color={color} />;
}
