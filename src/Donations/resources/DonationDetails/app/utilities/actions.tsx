import {__} from '@wordpress/i18n';
import AlertIcon from '@givewp/components/AdminUI/Icons/AlertIcon';
import WarningIcon from '@givewp/components/AdminUI/Icons/WarningIcon';

/**
 *
 * @unreleased
 */

export type ActionConfig = {
    action: 'refund' | 'download' | 'resend' | 'delete';
    title: string;
    confirmContext: string;
    description: string;
    icon: JSX.Element;
};

export const actionConfig: Array<ActionConfig> = [
    {
        action: 'refund',
        title: __('Refund donation', 'give'),
        confirmContext: __('Yes, refund', 'give'),
        description: __('Do you want to refund this donation?', 'give'),
        icon: <AlertIcon />,
    },
    {
        action: 'download',
        title: __('Download receipt', 'give'),
        confirmContext: __('Download', 'give'),
        description: __('Do you want to download this receipt?', 'give'),
        icon: <AlertIcon />,
    },
    {
        action: 'resend',
        title: __('Resend receipt', 'give'),
        confirmContext: __('Yes,  resend', 'give'),
        description: __('Do you want to resend this receipt?', 'give'),
        icon: <AlertIcon />,
    },
    {
        action: 'delete',
        title: __('Delete donation', 'give'),
        confirmContext: __('Yes, delete', 'give'),
        description: __('Do you want to delete this donation?', 'give'),
        icon: <WarningIcon />,
    },
];
