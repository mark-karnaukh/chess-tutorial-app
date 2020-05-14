// Libs
import React from 'react';

// Components
import Toast from 'react-bootstrap/Toast';

// Constants
import { PROP_IS_OPEN } from '../constants';

// Imported types
import { PureComponent } from 'react';
import { PutNotificationActionPayload as Props } from '../types';

// Local types
export interface State {
  [PROP_IS_OPEN]: boolean;
}

export default class Notification extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { [PROP_IS_OPEN]: true };
  }

  render() {
    const { isOpen } = this.state;
    const {
      notificationHeader,
      notificationBody,
      formattedDateTime,
      delayTime = 3000,
      withAutoHide = false,
    } = this.props;

    return (
      <div>
        <Toast
          onClose={() => this.setState({ [PROP_IS_OPEN]: !isOpen })}
          show={isOpen}
          delay={delayTime}
          autohide={withAutoHide}
          style={{
            position: 'absolute',
            top: '45%',
            left: '45%',
            width: '35%',
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notificationHeader}</strong>
            <small>{formattedDateTime}</small>
          </Toast.Header>
          <Toast.Body>{notificationBody}</Toast.Body>
        </Toast>
      </div>
    );
  }
}
