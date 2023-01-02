import React from 'react';
import './styles.scss';

import * as Icons from '@carbon/icons-react';

interface EmptySectionProps {
  icon: string;
  title: string;
  description: string;
  padding?: number;
}

const EmptySection = ({
  icon, title, description, padding
}: EmptySectionProps) => {
  const Icon = Icons[icon];
  return (
    <div className="empty-section-container" style={padding ? { padding: `${padding}px 16px` } : { padding: '38px 16px ' }}>
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
