import React from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export default function ConversationSummary({conversation, handleRowClick, deleteConversation}) {
    return (
        <div className="conversations-summary">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {conversation.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="left">{row.messages[row.messages.length -1]?.content || "No messages yet..."}</TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteConversation(row.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
