import React from 'react';

import {
  Button,
  Grid,
  Column
} from '@carbon/react';
import { Login } from '@carbon/icons-react';
import BCGovLogo from '../../components/BCGovLogo';
import Seeding from '../../assets/img/seeding.png';
import './styles.css';

const NewLanding = () => {
  const idirLogin = () => {
    window.alert('IDIR login!');
  };

  return (
    <Grid fullWidth>
      {/* First - Column */}
      <Column lg={8}>
        {/* Logo */}
        <BCGovLogo />

        {/* Welcome - Title and Subtitle */}
        <h1 data-testid="landing-title" className="landing-title">Welcome to SPAR</h1>
        <p data-testid="landing-subtitle" className="landing-subtitle">
          Seed Planning and Registry Application
        </p>

        {/* Description */}
        <h3 data-testid="landing-desc" className="landing-desc">
          Register and storage your seed and meet your annual
          reforestation needs using
          <span className="spar-span"> SPAR</span>
        </h3>

        {/* Login buttons */}
        <Button
          onClick={idirLogin}
          size="md"
          renderIcon={Login}
          data-testid="landing-button__idir"
          className="btn-landing"
        >
          Login with IDIR
        </Button>
        &nbsp;
        <Button
          kind="tertiary"
          onClick={idirLogin}
          size="md"
          renderIcon={Login}
          data-testid="landing-button__bceid"
          className="btn-landing"
        >
          Login with Business BCeID
        </Button>
      </Column>

      {/* Second - Column */}
      <Column lg={5}>
        <img src={Seeding} alt="Seeding" className="seeding-img" />
      </Column>
    </Grid>
  );
};

export default NewLanding;
