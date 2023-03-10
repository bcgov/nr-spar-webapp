import React from 'react';
import './style.scss';
import {
  Button,
  Row
} from '@carbon/react';
import { Notification } from '@carbon/icons-react';
import EmptySection from '../EmptySection';

const NotificationsCentral = () => (
  <div className="notifications-space">
    <Row>
      <Button className="btn-viewed" kind="ghost">Mark all as viewed</Button>
      <Button className="btn-all-notifications" kind="ghost">See all notifications</Button>
    </Row>
    <hr />
    <div className="container">
      <div className="vertical-center">
        <EmptySection
          icon="Sun"
          title="There is no new notifications!"
          description="You can go to all notifications to see older ones."
        />
        <Button
          renderIcon={Notification}
          size="field"
        >
          See all notifications
        </Button>
      </div>
    </div>
  </div>
);

export default NotificationsCentral;
