import React from 'react';
import { LockIcon } from '../../../assets/LockIcon';

export function renderPasswordIcon(color: string, size: number): JSX.Element {
    return <LockIcon height={size} width={size} fill={color} />;
}
