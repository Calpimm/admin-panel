import React from 'react';
import { Container } from '@mui/material';
import ApiKeySection from './ApiKeySection';
import MailService from './MailService';
import PlayersTable from './PlayersTable';
import ModeratorsTable from './ModeratorsPanel';
import BanHistoryTable from './BanHistoryTable'; // Ban History bileşenini import edin

const MainContent = ({ section, getApiKey, apiKey }) => {
  return (
    <Container style={{ marginTop: '80px' }}>
      {section === 'players' && <PlayersTable />}
      {section === 'moderators' && <ModeratorsTable />} {/* Moderatörler paneli */}
      {section === 'apikey' && <ApiKeySection getApiKey={getApiKey} apiKey={apiKey} />}
      {section === 'mailservice' && <MailService />}
      {section === 'banHistory' && <BanHistoryTable />} {/* Ban History paneli */}
    </Container>
  );
};

export default MainContent;
