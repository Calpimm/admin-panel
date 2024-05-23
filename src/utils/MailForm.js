import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const StyledButton = styled(Button)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 200px; /* Buton genişliği sabit */
  height: 50px; /* Buton yüksekliği sabit */
  overflow: hidden; /* Taşan içerikleri gizlemek için */
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
  margin: 10px 0;
`;

const MailForm = ({ option, goBack }) => {
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [mailContent, setMailContent] = useState('');
  const [isHtml, setIsHtml] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    const token = sessionStorage.getItem("adminToken");
    const endpoint = option.endpoint;

    const payload = {
      senderName,
      subject,
      mailContent,
      isHtml
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        payload.recipients = reader.result;
        sendEmail(payload);
      };
      reader.readAsText(file);
    } else {
      sendEmail(payload);
    }
  };

  const sendEmail = async (payload) => {
    const token = sessionStorage.getItem("adminToken");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${option.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          setShowSuccess(true);
          setIsSending(false);
          setTimeout(() => setShowSuccess(false), 2000);
        }, 2000);
        setSenderName('');
        setSubject('');
        setMailContent('');
        setFile(null);
        setIsHtml(false);
      } else {
        setError(data.message);
        alert(data.message);
        setIsSending(false);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      alert('An error occurred. Please try again.');
      setIsSending(false);
    }
  };

  return (
    <Container>
      <Button variant="contained" onClick={goBack} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        {option.label}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormWrapper>
        <StyledTextField
          label="Sender Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <StyledTextField
          label="Subject"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <StyledTextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={mailContent}
          onChange={(e) => setMailContent(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={isHtml} onChange={(e) => setIsHtml(e.target.checked)} />}
          label="Send as HTML"
        />
        {option.endpoint !== '/send-subscribed-mail' && (
          <StyledButton
            variant="contained"
            component="label"
          >
            Upload Recipient List (txt)
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </StyledButton>
        )}
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSendEmail}
          disabled={isSending || showSuccess}
        >
          <IconWrapper>
            <AnimatePresence>
              {isSending && (
                <>
                  <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    exit={{ x: 50 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'absolute' }}
                  >
                    📧
                  </motion.div>
                  <motion.div
                    initial={{ x: 50 }}
                    animate={{ x: 0 }}
                    exit={{ x: 100 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'absolute' }}
                  >
                    🚚
                  </motion.div>
                </>
              )}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'absolute' }}
                >
                  ✅
                </motion.div>
              )}
            </AnimatePresence>
          </IconWrapper>
          {!isSending && !showSuccess && (
            <>
              🚚 <span style={{ marginLeft: '8px' }}>Send Email</span>
            </>
          )}
        </StyledButton>
      </FormWrapper>
    </Container>
  );
};

export default MailForm;
