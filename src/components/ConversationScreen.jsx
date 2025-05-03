import React from 'react'
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ChatMessage from './ChatMessage';

export default function ConversationScreen({ handleBackButton, currentConversation, formatDate, setCurrentUserInput, inputError, currentUserInput, handleSendButton}) {
    const buttonText = "< Back To Conversation";

    return (
        <div className="conversation-screen">
            <Button onClick={handleBackButton} sx={{ color: "gray", marginBottom: "10px" }}>
                {buttonText}
            </Button>
            <div className="main-session">
                <Box className="session-info" sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        {currentConversation.title}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <Typography variant="subtitle1" noWrap>
                                <MessageOutlinedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Case ID: {currentConversation.caseId}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <Typography variant="subtitle1" noWrap>
                                <ListAltOutlinedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Name: {currentConversation.productName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <Typography variant="subtitle1" noWrap>
                                Created At: {formatDate(currentConversation.createdAt)}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <Typography variant="subtitle1" noWrap>
                                Updated At: {formatDate(currentConversation.updatedAt)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                {currentConversation?.messages?.map((message, index) => (
                    <div key={index} className='messages-container'>
                        <ChatMessage message={message.content} sender={message.direction} timestamp={formatDate(message.timestamp)} />
                    </div>
                ))}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Type your message"
                            variant="outlined"
                            sx={{ width: '610px', marginTop: '10px' }}
                            onChange={(e) => setCurrentUserInput(e.target.value)}
                            error={inputError}
                            helperText={inputError ? "Message cannot be empty." : ""}
                            value={currentUserInput}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleSendButton} fullWidth sx={{ height: '56px', marginTop: '10px' }}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
