import { useNavigate } from 'react-router-dom';

import { Tile, Button, FlexGrid, Column, Row, Stack } from '@carbon/react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <FlexGrid container spacing={4}>
      <Stack gap={6}>
        <Row>
          <Column sm={4}>
            <Stack gap={3}>
              <h1 data-testid="home-title">Dashboard</h1>
              <h4>
                See your favorite and recent activities inside SPAR system
              </h4>
            </Stack>
          </Column>
        </Row>
      </Stack>
    </FlexGrid>
  );
};

export default Dashboard;
