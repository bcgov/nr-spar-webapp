import React, { useEffect } from 'react';

import {
  Button,
  Grid,
  Column
} from '@carbon/react';
import { Login } from '@carbon/icons-react';
import { KeycloakLoginOptions } from 'keycloak-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BCGovLogo from '../../components/BCGovLogo';
import Seeding from '../../assets/img/seeding.png';
import LoginProviders from '../../types/LoginProviders';
import './styles.css';
import getUrlQueryParam from '../../utils/UrlUtils';

const NewLanding = () => {
  const { startKeycloak, login, signed } = useAuth();
  const navigate = useNavigate();
  const homePage = '/dashboard';

  const handleLogin = (provider: LoginProviders) => {
    if (signed) {
      navigate(getUrlQueryParam(window.location, 'page') || homePage);
      return;
    }

    const idpHint = provider;
    const loginOptions: KeycloakLoginOptions = {
      redirectUri: `${window.location.origin}${homePage}`,
      idpHint
    };

    login(loginOptions);
  };

  useEffect(() => {
    if (signed) {
      navigate(getUrlQueryParam(window.location, 'page') || homePage);
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
        <h1 className="landing-title">Welcome to SPAR</h1>
        <h2 className="landing-subtitle">
          Seed Planning and Registry Application
        </h2>

        {/* Description */}
        <p className="landing-desc">
          Register and storage your seed and meet your annual
          reforestation needs using
          <span className="spar-span"> SPAR</span>
        </p>

        {/* Login buttons */}
        <Button
          onClick={() => { handleLogin(LoginProviders.IDIR); }}
          size="md"
          renderIcon={Login}
          className="btn-landing"
        >
          Login with IDIR
        </Button>

        <Button
          kind="tertiary"
          onClick={() => { handleLogin(LoginProviders.BCEID_BUSINESS); }}
          size="md"
          renderIcon={Login}
          className="btn-landing"
        >
          Login with Business BCeID
        </Button>
      </Column>

      {/* Second - Column */}
      <Column lg={5}>
        <img
          src={Seeding}
          alt=""
          className="seeding-img"
        />
      </Column>
    </Grid>
  );
};

export default NewLanding;
