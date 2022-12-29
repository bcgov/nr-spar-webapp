import React from 'react';

import './styles.scss';

import { Tile, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import * as Icons from '@carbon/icons-react';

interface CardProps {
  icon: string;
  header: string;
  description: string;
  highlighted?: boolean;
  highlightFunction?: () => void;
}

const Card = ({
  icon, header, description, highlighted, highlightFunction
}: CardProps) => {
  const Icon = Icons[icon];
  return (
    <Tile className={highlighted ? 'card-main-highlighted' : 'card-main'}>
      <div className="card-header">
        <Icon className="card-icon" />
        <h5 className="card-title__small">{header}</h5>
        <OverflowMenu className="card-overflow" ariaLabel="overflow-menu">
          <OverflowMenuItem tabIndex="0" itemText={highlighted ? 'Dehighlight shortcut' : 'Highlight shortcut'} onClick={highlightFunction} />
          <OverflowMenuItem itemText="Item 2" />
          <OverflowMenuItem itemText="Item 3" />
        </OverflowMenu>
      </div>
      <div className="card-content">
        <h5 className="card-title__large">{header}</h5>
        <p>{description}</p>
      </div>
    </Tile>
  );
};

export default Card;
