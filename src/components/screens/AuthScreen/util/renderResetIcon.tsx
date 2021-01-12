import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export function renderResetIcon(color: string): JSX.Element {
    return <Ionicons selectable={false} name='lock-closed' size={22} color={color} />;
}
