import { Box, Paper, Typography, Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const ChatMessage = ({ message, sender, timestamp }) => {
  const isUser = sender === 'in';

  return (
    <Box
      display="flex"
      flexDirection={isUser ? 'row' : 'row-reverse'}
      alignItems="flex-start"
      mb={3}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? '#42a5f5' : '#d3d3d3',
          width: 40,
          height: 40,
          mt: 0.5,
          mx: 1,
        }}
      />

      <Box>
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: isUser ? '#e6f2ff' : '#f5f5f5',
            color: '#444',
            maxWidth: '500px',
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
            {message}
          </Typography>
        </Paper>

        <Box
          display="flex"
          alignItems="center"
          mt={0.5}
          justifyContent={isUser ? 'flex-start' : 'flex-end'}
          gap={0.5}
        >
          <Typography
            variant="caption"
            sx={{ color: '#999' }}
          >
            Chat – {timestamp}
          </Typography>

          <CheckIcon fontSize="inherit" sx={{ color: 'green', fontSize: '0.9rem' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
