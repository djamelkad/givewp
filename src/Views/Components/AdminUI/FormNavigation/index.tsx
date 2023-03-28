import {useState} from 'react';
import {__} from '@wordpress/i18n';

import Button from '@givewp/components/AdminUI/Button';
import ActionMenu from '@givewp/components/AdminUI/ActionMenu';

import {FormNavigationProps} from './types';

import styles from './style.module.scss';
import LeftArrowIcon from '@givewp/components/AdminUI/Icons/LeftArrowIcon';
import DownArrowIcon from '@givewp/components/AdminUI/Icons/DownArrowIcon';

/**
 *
 * @unreleased
 */

export default function FormNavigation({onSubmit, actionConfig, isDirty, pageInformation}: FormNavigationProps) {
    const [toggleActions, setToggleActions] = useState<boolean>(false);

    const {description, id, title} = pageInformation;

    const toggleMoreActions = () => {
        setToggleActions(!toggleActions);
    };

    return (
        <header className={styles.formPageNavigation}>
            <div className={styles.wrapper}>
                <button className={styles.container} onClick={() => window.history.back()}>
                    <LeftArrowIcon />
                    <h1>{title}</h1>
                </button>
            </div>

            <div className={styles.actions}>
                <div className={styles.pageDetails}>
                    <span>{description}:</span>
                    <span>#{id}</span>
                </div>

                <div className={styles.relativeContainer}>
                    <Button
                        onClick={toggleMoreActions}
                        variant={'secondary'}
                        size={'small'}
                        type={'button'}
                        disabled={false}
                    >
                        {__('More Actions', 'give')}
                        <DownArrowIcon />
                    </Button>
                    {toggleActions && <ActionMenu menuConfig={actionConfig} toggle={toggleMoreActions} />}
                </div>

                <Button onClick={onSubmit} variant={'primary'} size={'small'} type={'submit'} disabled={!isDirty}>
                    {__('Save Changes', 'give')}
                </Button>
            </div>
        </header>
    );
}