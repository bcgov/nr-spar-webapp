import React, { useEffect } from 'react';

import {
  Button,
  Grid,
  Column
} from '@carbon/react';
import { Login } from '@carbon/icons-react';
import { KeycloakLoginOptions } from 'keycloak-js';
import { useNavigate } from 'react-router-dom';

import BCGovLogo from '../../components/BCGovLogo';
import Seeding from '../../assets/img/seeding.png';
import './styles.css';
import { useAuth } from '../../contexts/AuthContext';
import LoginProviders from '../../types/LoginProviders';

const NewLanding = () => {
  const { startKeycloak, login, signed } = useAuth();
  const navigate = useNavigate();

  const getPageParam = (): string => {
    let page: string = '/home';
    const paramString = window.location.search.split('?')[1];
    const queryString = new URLSearchParams(paramString);
    if (queryString.has('page')) {
      page = queryString.get('page') || '/home';
    }
    return page;
  };

  const handleLogin = (provider: LoginProviders) => {
    if (signed) {
      navigate(getPageParam());
      return;
    }

    const idpHint = provider === 'idir' ? 'idir' : 'bceid-business';
    const loginOptions: KeycloakLoginOptions = {
      redirectUri: `${window.location.origin}/home`,
      idpHint
    };

    login(loginOptions);
  };

  useEffect(() => {
    if (signed) {
      navigate(getPageParam());
    } else {
      startKeycloak();
    }
  }, [signed]);

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
          onClick={() => { handleLogin(LoginProviders.IDIR); }}
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
          onClick={() => { handleLogin(LoginProviders.BCEID_BUSINESS); }}
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
