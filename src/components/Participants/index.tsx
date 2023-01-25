import React from 'react';

import AvatarImage from '../AvatarImage';

import './styles.css';

interface ParticipantsProps {
  elements: string[];
  number: number;
}

const Participants = ({ elements, number }: ParticipantsProps) => (
  <div>
    {elements.map((participant, pidx) => (
      <div
        key={`${number} ${participant}`}
        className={`img-participant${pidx + 1}`}
      >
        <AvatarImage
          userName={participant}
          size="small"
          key={`${number} ${participant}`}
        />
      </div>
    ))}
  </div>
);

export default Participants;
