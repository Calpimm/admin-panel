import React, { useState } from 'react';
import { Container, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const FormWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.1); /* Hafif şeffaf bir arka plan */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hafif gölge efekti */
  position: relative; /* Butonların konumlandırılması için gerekli */
  width: 100%;
  max-width: 600px; /* Maksimum genişlik ayarı */
`;

const StyledTextField = styled(TextField)`
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.8); /* Giriş kutularının arka plan rengi */
  border-radius: 4px; /* Giriş kutularının köşe yuvarlatma */
`;

const FileUploadButton = styled(Button)`
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 150px;
  background-color: #03a9f4;
  color: white;
  &:hover {
    background-color: #0288d1;
  }
`;

const SendButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #388e3c;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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
    const role = sessionStorage.getItem("role");

    if (role !== 'admin') {
      toast.error('Unauthorized action');
      setIsSending(false);
      return;
    }

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
        toast.success('Mail successfully sent');
        setSenderName('');
        setSubject('');
        setMailContent('');
        setFile(null);
        setIsHtml(false);
      } else {
        toast.error('Failed to send mail');
        setIsSending(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
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
      <FormWrapper
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          <FileUploadButton
            variant="contained"
            component="label"
          >
            Upload List
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </FileUploadButton>
        )}
        <SendButton
          variant="contained"
          onClick={handleSendEmail}
          disabled={isSending || showSuccess}
        >
          <IconWrapper>
            <AnimatePresence>
              {isSending && (
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: -100 }}
                  exit={{ x: 0 }}
                  transition={{ duration: 4 }}
                  style={{ position: 'absolute' }}
                >
                  🚚
                </motion.div>
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
              <span style={{ marginRight: '8px' }}>Send Email </span> 🚚
            </>
          )}
        </SendButton>
      </FormWrapper>
    </Container>
  );
};

export default MailForm;
