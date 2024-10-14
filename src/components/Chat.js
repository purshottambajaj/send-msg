// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { sendMessage, receiveMessage } from '../redux/chatSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const [input, setInput] = useState('');

  // Simulate receiving a message after a delay
  useEffect(() => {
    const receiveMockMessage = setTimeout(() => {
      dispatch(receiveMessage('This is a mock reply!'));
    }, 5000);

    return () => clearTimeout(receiveMockMessage);
  }, [dispatch]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput(''); // Clear the input field after sending
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Chat Window */}
      <Paper
        sx={{
          flex: 1,
          padding: 2,
          overflowY: 'auto',
          mb: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.user === 'User1' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 1,
                backgroundColor: msg.user === 'User1' ? '#1976d2' : '#e0e0e0',
                color: msg.user === 'User1' ? '#fff' : '#000',
                borderRadius: 2,
              }}
            >
              <Typography>{msg.text}</Typography>
              <Typography variant="caption" sx={{ display: 'block' }}>
                {msg.timestamp}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Paper>

      {/* Message Input */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
