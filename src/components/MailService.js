import React, { useState } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import MailForm from '../utils/MailForm';

const OptionBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 20px;
  margin: 20px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: scale(1.05);
  }
`;

const MailService = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'Mail to Employees', image: 'employee_image_url', endpoint: '/send-company-mail' },
    { label: 'Mail to Testers', image: 'tester_image_url', endpoint: '/send-test-team-mail' },
    { label: 'Mail to Players', image: 'player_image_url', endpoint: '/send-players-mail' },
    { label: 'Mail to Subscribers', image: 'subscriber_image_url', endpoint: '/send-subscribed-mail' }
  ];

  if (selectedOption) {
    return <MailForm option={selectedOption} goBack={() => setSelectedOption(null)} />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Mail Service
      </Typography>
      <Grid container spacing={3}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={3} key={option.label}>
            <OptionBox
              onClick={() => setSelectedOption(option)}
              whileHover={{ scale: 1.05 }}
            >
              <img src={option.image} alt={option.label} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
              <Typography variant="h6" component="h2">
                {option.label}
              </Typography>
              <Typography variant="body2" component="p">
                Click to send mail to {option.label.toLowerCase()}.
              </Typography>
            </OptionBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MailService;
