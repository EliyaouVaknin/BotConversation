import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ChatMessage from './ChatMessage';

export default function ConversationScreen({ handleBackButton, currentConversation, formatDate, setCurrentUserInput, inputError, currentUserInput, handleSendButton, buttonDisabled }) {
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
                <div className="text-input-wrapper">
                    <Box
                        sx={{
                            position: 'relative',
                            width: '95%',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '8px',
                        }}
                    >
                        <TextField
                            id="message-input"
                            placeholder="Type your message"
                            variant="standard"
                            multiline
                            minRows={5}
                            value={currentUserInput}
                            onChange={(e) => setCurrentUserInput(e.target.value)}
                            error={inputError}
                            helperText={inputError ? 'Message cannot be empty.' : ''}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            onClick={handleSendButton}
                            disabled={buttonDisabled}
                            sx={{
                                position: 'absolute',
                                bottom: '16px',
                                right: '16px',
                                minWidth: '64px',
                                backgroundColor: '#090979',
                                color: '#fff',
                                textTransform: 'none',
                            }}
                        >
                            Send
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}
