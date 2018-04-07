import * as React from 'react';
import Footer from './Footer';
import ShortfutsList from './ShortfutsList';
import './Popup.scss';

export default class Popup extends React.Component<{}, {}> {
    render() {
        return (
            <div className="popupContainer ms-Fabric">
                <ShortfutsList />
                <Footer showChangeShortfutsButton={true} />
            </div>
        );
    }
}
