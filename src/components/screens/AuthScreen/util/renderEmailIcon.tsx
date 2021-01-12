import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export function renderEmailIcon(color: string, size: number): JSX.Element {
    return <Ionicons selectable={false} name='mail' size={size} color={color} />;
}
