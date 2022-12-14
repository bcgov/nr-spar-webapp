import React from 'react';
import './styles.scss';

import * as Icons from '@carbon/icons-react';

interface EmptySectionProps {
  icon: string;
  title: string;
  description: string;
}

const EmptySection = ({
  icon, title, description
}: EmptySectionProps) => {
  const Icon = Icons[icon];
  return (
    <div className="empty-section-container">
      <Icon className="empty-section-icon" />
      <p>
        {title}
      </p>
      <h4>
        {description}
      </h4>
    </div>
  );
};

export default EmptySection;
