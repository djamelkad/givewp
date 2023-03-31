import {__, sprintf} from '@wordpress/i18n';

import SectionHeader, {HeaderLink} from '@givewp/components/AdminUI/SectionHeader';
import {FieldsetContainer} from '@givewp/components/AdminUI/ContainerLayout';
import EmptyState from '@givewp/components/AdminUI/EmptyState';

import styles from './style.module.scss';
import CalendarIcon from '@givewp/components/AdminUI/Icons/CalendarIcon';

const {subscriptionId} = window.GiveDonations.donationDetails;

export default function Subscription() {
    return (
        <section>
            <SectionHeader>
                <h3>{__('Subscription', 'give')}</h3>
                <HeaderLink href={'/'}>{__('View subscription details', 'give')}</HeaderLink>
            </SectionHeader>

            {subscriptionId ? <SectionContainer /> : <EmptyState message={__('No subscriptions yet', 'give')} />}
        </section>
    );
}

export function SectionContainer() {
    return (
        <FieldsetContainer>
            <div className={styles.subscriptionContainer}>
                <div>
                    <div>
                        <span>{__('Subscription ID', 'give')}</span>
                        <span>{subscriptionId}</span>
                    </div>
                    <div>
                        <span>{__('Billing Cycle', 'give')}</span>
                        <span>{__('weekly', 'give')}</span>
                    </div>
                </div>

                <span>
                    <CalendarIcon />
                    {sprintf(__('Next renewal %s', 'give'), 'June 15th, 2022')}
                </span>
            </div>
        </FieldsetContainer>
    );
}
