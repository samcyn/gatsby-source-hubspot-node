/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import AppLayout from './src/components/AppLayout';

const wrapPageElement = ({ element, props }) => <AppLayout {...props}>{element}</AppLayout>;

export default wrapPageElement;
