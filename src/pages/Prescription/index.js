import React from 'react';
import PageTitle from '../../components/PageTitle';
import PrescriptionConfig from './PrescriptionConfig'
class Prescription extends React.Component {

    render() {
        return (
            <>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Prescription', active: true },
                    ]}
                    title={'Prescription'}
                />
                <PrescriptionConfig/>
            </>
        )
    }
}

export default Prescription