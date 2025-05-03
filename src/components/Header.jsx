import React from 'react'
import logo from '../assets/logo.png';
import { Box, Button } from '@mui/material';


export default function Header({createNewChat, showConversation}) {
    return (
        <div className="header">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ backgroundColor: 'white' }}
            >
                <img src={logo} alt="Logo" width={130} />
                {!showConversation &&
                    <Button variant="contained" onClick={createNewChat}>Start new chat</Button>}
            </Box>
        </div>

    )
}
