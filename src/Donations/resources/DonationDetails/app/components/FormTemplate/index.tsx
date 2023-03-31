import React from 'react';

import PaymentInformation from '../PaymentInformation';
import {Container, LeftContainer, RightContainer} from '@givewp/components/AdminUI/ContainerLayout';
import DonorDetails from '../DonorDetails';
import BillingAddress from '../BillingAddress';
import Subscription from '../Subscription';

/**
 *
 * @unreleased
 */

export default function FormTemplate() {
    return (
        <>
            <PaymentInformation />
            <Container>
                <LeftContainer>
                    <DonorDetails />
                    <BillingAddress />
                </LeftContainer>

                <RightContainer>
                    <Subscription />
                </RightContainer>
            </Container>
        </>
    );
}
