import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function MyPopup() {
    return (
        <>
            <div className="main-popup-wrapper">
                <h1>Create new conversation</h1>
                <TextField>title</TextField>
                <TextField>caseID</TextField>
                <TextField>productName</TextField>
            </div>
        </>
    );
}

export default MyPopup;
