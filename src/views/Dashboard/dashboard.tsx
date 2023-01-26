import React from 'react';

import {
  FlexGrid,
  Row,
  Stack,
  Theme
} from '@carbon/react';

import PageTitle from '../../components/PageTitle';
import FavoriteActivities from '../../components/FavoriteActivities';
import RecentActivities from '../../components/RecentActivities';
import { useThemePreference } from '../../utils/ThemePreference';

const Dashboard = () => {
  const { theme } = useThemePreference();
  return (
    <Theme theme={theme}>
      <FlexGrid className="dashboard-page">
        <Stack gap={7}>
          <Row>
            <PageTitle
              title="Dashboard"
              subtitle="See your favorite and recent activities inside SPAR system"
            />
          </Row>
          <FavoriteActivities />
          <RecentActivities />
        </Stack>
      </FlexGrid>
    </Theme>

  );
};

export default Dashboard;
