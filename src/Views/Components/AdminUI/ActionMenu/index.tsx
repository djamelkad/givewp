import {Fragment, useState} from 'react';
import {__} from '@wordpress/i18n';
import Button from '@givewp/components/AdminUI/Button';

import styles from './style.module.scss';
import ModalDialog from '@givewp/components/AdminUI/ModalDialog';
import {ActionConfig} from '../../../../Donations/resources/DonationDetails/app/utilities/actions';

/**
 *
 * @unreleased
 */

const {id} = window.GiveDonations.donationDetails;
export type ActionMenuProps = {
    actionConfig: Array<ActionConfig>;
};

export default function ActionMenu({actionConfig}: ActionMenuProps) {
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
                {actionConfig?.map(({action, title, confirmContext, description, icon}) => {
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

/**
 *
 * @unreleased
 */
export type ActionDialogProps = ActionConfig & {
    confirm: () => void;
    cancel: () => void;
};

export function ActionDialog({action, title, icon, description, confirmContext, confirm, cancel}: ActionDialogProps) {
    const isDeleting = action === 'delete';
    const variant = isDeleting ? 'danger' : 'primary';

    return (
        <div className={styles.actionDialog}>
            <div>{icon}</div>

            <div className={styles.actionDialogContainer}>
                <p className={styles.title}>{`${title}  #${isDeleting && id}`}</p>
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
