/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
  Accordion,
  AccordionItem
} from '@carbon/react';

import TitleAccordion from '../../TitleAccordion';

import './styles.scss';

const OwnershipStep = () => (
  <div>
    <div className="ownership-step-title-box">
      <h3>
        Ownership
      </h3>
      <p>
        Enter the lot&apos;s owners information
      </p>
    </div>
    <div className="ownership-form-container">
      <Accordion className="steps-accordion">
        <AccordionItem
          title={(
            <TitleAccordion
              title="Orchard name"
              description="100% owner portion"
            />
          )}
        >
          <p>
            placeholder
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

export default OwnershipStep;
