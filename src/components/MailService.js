import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import MailForm from '../utils/MailForm';

const OptionBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 16px;
  padding: 20px;
  margin: 20px;
  cursor: pointer;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
    transform: scale(1.05);
  }
`;

const theme = {
  borderColor: 'rgba(255, 255, 255, 0.7)', // Panelin ana renklerine göre ayarlayın
  background: 'rgba(0, 0, 0, 0.4)',        // Panelin ana renklerine göre ayarlayın
  hoverBackground: 'rgba(0, 0, 0, 0.6)',   // Panelin ana renklerine göre ayarlayın
  textColor: '#FFFFFF',                    // Panelin ana renklerine göre ayarlayın
};

const MailService = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'Mail to Employees', endpoint: '/send-company-mail' },
    { label: 'Mail to Testers', endpoint: '/send-test-team-mail' },
    { label: 'Mail to Players', endpoint: '/send-players-mail' },
    { label: 'Mail to Subscribers', endpoint: '/send-subscribed-mail' }
  ];

  if (selectedOption) {
    return <MailForm option={selectedOption} goBack={() => setSelectedOption(null)} />;
  }

  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
        Mail Service
      </Typography>
      <Grid container spacing={0}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={3} key={option.label}>
            <OptionBox
              onClick={() => setSelectedOption(option)}
              whileHover={{ scale: 1.05 }}
              theme={theme}
            >
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
