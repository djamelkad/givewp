import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {FeatureNoticeDialog} from '../Dialogs';
import FormBuilderButton from './FormBuilderButton';
import styles from '../style.module.scss';

const portalContainer = document.createElement('div');

export default function FormBuilderButtonPortal({isUpgrading = false, showDialog, setShowDialog}) {

    useEffect(() => {
        const target = document.querySelector('.wp-header-end');
        target.parentNode.insertBefore(portalContainer, target);
    }, [portalContainer]);

    const ButtonPortal = () => createPortal(
        <div className={styles.tryNewFormBuilderBtnContainer}>
            <FormBuilderButton onClick={() => setShowDialog(true)} />
        </div>,
        portalContainer
    );

    return (
        <>
            <ButtonPortal />

            {showDialog && (
                <FeatureNoticeDialog
                    isUpgrading={isUpgrading}
                    handleClose={() => setShowDialog(false)}
                />
            )}
        </>
    )
}
