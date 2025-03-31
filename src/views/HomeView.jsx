import React from 'react';
import styled from 'styled-components';
import { Card2 } from 'liamc9npm';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc; /* light gray */
  padding: 1rem;
`;

export default function HomeView() {
  return (
    <Container>
      <Card2 />
    </Container>
  );
}
