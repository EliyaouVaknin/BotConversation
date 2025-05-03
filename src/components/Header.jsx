import React from 'react'
import logo from '../assets/logo.png';
import { Box, Button, Avatar, Typography } from '@mui/material';

export default function Header({ createNewChat, showConversation, username }) {
    return (
        <div className="header">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ backgroundColor: 'white' }}
            >
                <img src={logo} alt="Logo" width={130} />
                {!showConversation ?
                    <Button variant="contained" onClick={createNewChat}>Start new chat</Button>
                    :
                    (
                        <Box display="flex">
                            <Avatar
                                sx={{
                                    bgcolor: '#d3d3d3',
                                    width: 30,
                                    height: 30,
                                    mx: 1,
                                }}
                            />
                            <Typography variant="caption"
                                sx={{ color: '#999', marginTop: "5px" }}>
                                Hi, {username}
                            </Typography>
                        </Box>
                    )
                }
            </Box>
        </div>

    )
}
