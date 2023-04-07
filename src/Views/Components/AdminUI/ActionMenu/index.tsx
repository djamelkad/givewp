import {Fragment, useState} from 'react';
import styles from './style.module.scss';
import ModalDialog from '@givewp/components/AdminUI/ModalDialog';

/**
 *
 * @unreleased
 */
import {__} from '@wordpress/i18n';
import AlertIcon from '@givewp/components/AdminUI/Icons/AlertIcon';
import WarningIcon from '@givewp/components/AdminUI/Icons/WarningIcon';
import Button from '@givewp/components/AdminUI/Button';

/**
 *
 * @unreleased
 */

export type ActionProps = {
    action: 'refund' | 'download' | 'resend' | 'delete';
};

export type ActionConfig = ActionProps & {
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

export type ActionMenuProps = {};

export default function ActionMenu({}: ActionMenuProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<any>(null);

    const openActionModal = (actionConfig) => {
        setCurrentAction(actionConfig);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        setIsModalOpen(false);
        //    TODO: ADD POST REQUEST DATA
    };

    return (
        <Fragment>
            <ul className={styles.navigationMenu}>
                {actionConfig.map(({action, title, confirmContext, description, icon}) => {
                    return (
                        <li key={action}>
                            <button onClick={() => openActionModal({action, title, confirmContext, description, icon})}>
                                {title}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <ModalDialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleClose={() => setIsModalOpen(false)}
                title={__('Total Donation', 'give')}
                variant={'actionDialog'}
            >
                <ActionDialog
                    action={currentAction?.action}
                    icon={currentAction?.icon}
                    title={currentAction?.title}
                    description={currentAction?.description}
                    confirmContext={currentAction?.confirmContext}
                    cancel={() => setIsModalOpen(false)}
                    confirm={confirmAction}
                />
            </ModalDialog>
        </Fragment>
    );
}

export function ActionDialog({action, title, icon, description, confirmContext, confirm, cancel}) {
    const variant = action === 'delete' ? 'danger' : 'primary';

    return (
        <div className={styles.actionDialog}>
            <div>{icon}</div>

            <div className={styles.actionDialogContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.actionDialogActions}>
                    <Button onClick={confirm} variant={variant} size={'small'} type={'button'} disabled={false}>
                        {confirmContext}
                    </Button>
                    <Button onClick={cancel} variant={'secondary'} size={'small'} type={'button'} disabled={false}>
                        {__('No, cancel', 'give')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
