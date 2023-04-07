import {useState} from 'react';
import {__} from '@wordpress/i18n';

import Button from '@givewp/components/AdminUI/Button';
import ActionMenu from '@givewp/components/AdminUI/ActionMenu';

import LeftArrowIcon from '@givewp/components/AdminUI/Icons/LeftArrowIcon';
import DownArrowIcon from '@givewp/components/AdminUI/Icons/DownArrowIcon';

import {PageInformation} from '@givewp/components/AdminUI/FormPage';
import styles from './style.module.scss';
import {ActionConfig} from '../../../../Donations/resources/DonationDetails/app/utilities/actions';

/**
 *
 * @unreleased
 */

export type FormNavigationProps = {
    onSubmit: () => void;
    pageInformation: PageInformation;
    isDirty: boolean;
    actionConfig: Array<ActionConfig>;
};

export default function FormNavigation({onSubmit, isDirty, pageInformation, actionConfig}: FormNavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const {description, id, title} = pageInformation;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.formPageNavigation}>
            <TitleNavigation title={title} />
            <div className={styles.actions}>
                <PageDescription description={description} id={id} />
                <MoreActions actionConfig={actionConfig} isOpen={isMenuOpen} openMenu={toggleMenu} />
                <SaveFormChanges onSubmit={onSubmit} isDirty={isDirty} />
            </div>
        </header>
    );
}

/**
 *
 * @unreleased
 */
export type TitleNavigationProps = {
    title: string;
};

function TitleNavigation({title}: TitleNavigationProps) {
    return (
        <div className={styles.wrapper}>
            <button className={styles.container} onClick={() => window.history.back()}>
                <LeftArrowIcon />
                <h1>{title}</h1>
            </button>
        </div>
    );
}

/**
 *
 * @unreleased
 */
export type PageDescriptionProps = {
    description: string;
    id: number;
};

export function PageDescription({description, id}: PageDescriptionProps) {
    return (
        <div className={styles.pageDetails}>
            <span>{description}:</span>
            <span>#{id}</span>
        </div>
    );
}

/**
 *
 * @unreleased
 */
export type MoreActionsProps = {
    isOpen: boolean;
    openMenu: () => void;
    actionConfig: Array<ActionConfig>;
};

function MoreActions({openMenu, isOpen, actionConfig}: MoreActionsProps) {
    return (
        <div>
            <Button onClick={openMenu} variant={'secondary'} size={'small'} type={'button'} disabled={false}>
                {__('More Actions', 'give')}
                <DownArrowIcon color={'#2271b1'} />
            </Button>
            {isOpen && <ActionMenu actionConfig={actionConfig} />}
        </div>
    );
}

/**
 *
 * @unreleased
 */
export type SaveFormChangesProps = {
    onSubmit: () => void;
    isDirty: boolean;
};

export function SaveFormChanges({isDirty, onSubmit}: SaveFormChangesProps) {
    return (
        <div className={styles.relativeContainer}>
            <Button onClick={onSubmit} variant={'primary'} size={'small'} type={'submit'} disabled={!isDirty}>
                {__('Save Changes', 'give')}
            </Button>
        </div>
    );
}
