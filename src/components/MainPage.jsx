import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress} from '@mui/material';
import Sidebar from './Sidebar';
import ConversationScreen from './ConversationScreen';
import ConversationSummary from './ConversationSummary';
import Header from './Header';

export default function MainPage() {
    const [conversation, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputError, setInputError] = useState(false)
    const [currentConversation, setCurrentConversation] = useState({});
    const [currentUserInput, setCurrentUserInput] = useState("");
    const [showConversation, setShowConversation] = useState(false);

    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/conversations/summary');
                setConversations(response.data);
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConversations();
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const createNewChat = async () => {
        try {
            setIsLoading(true);
            const today = new Date();
            const payload = {
                createdAt: today.toISOString(),
                updatedAt: today.toISOString(),
                caseId: "C102345",
                productId: "P54321",
                productName: "Widget Pro",
                status: "Open",
                title: "test title"
            };
            const response = await axios.post('http://localhost:3000/conversations/new', payload);
            const newConv = {
                createdAt: response.data[0].createdAt,
                caseId: response.data[0].caseId,
                productName: response.data[0].productName,
                id: response.data[0].id,
                updatedAt: response.data[0].updatedAt,
                messages: [response.data[1]],
                firstMessage: response.data[1]
            }
            setConversations(prev => [...prev, newConv]);
            setCurrentConversation(newConv)
            setShowConversation(true);
        } catch (error) {
            console.error('Error creating conversation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteConversation = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`http://localhost:3000/conversations/${id}`);
            setConversations(prev => prev.filter(convo => convo.id !== id));
        } catch (error) {
            console.error('Error deleting conversation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRowClick = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/conversations/${id}`);
            setCurrentConversation(response.data);
            setShowConversation(true);
        } catch (error) {
            console.error('Error getting conversation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackButton = () => {
        setCurrentConversation({});
        setShowConversation(false)
    }

    const handleSendButton = async () => {
        try {
            if (!currentUserInput) {
                setInputError(true);
            } else {
                setInputError(false);
                let payload = {
                    conversationId: currentConversation.id,
                    content: currentUserInput
                }
                const response = await axios.post(`http://localhost:3000/conversations/${currentConversation.id}/messages`, payload);
                setCurrentConversation((prev) => ({
                    ...prev,
                    messages: [...prev.messages, ...response.data]
                }));
                setCurrentUserInput("");
            }
        } catch (error) {
            console.error('Error sending message: ', error)
        }
    }

    return (
        <div className="main-page-wrapper">
            <Sidebar handleBackButton={handleBackButton} />

            <Header createNewChat={createNewChat} showConversation={showConversation} />
            
            <div className="main-content" style={{ marginLeft: "195px" }}>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                        <CircularProgress />
                    </Box>
                ) : showConversation ? (
                    <ConversationScreen 
                        handleBackButton={handleBackButton}
                        currentConversation={currentConversation}
                        formatDate={formatDate}
                        setCurrentUserInput={setCurrentUserInput} 
                        inputError={inputError}
                        currentUserInput={currentUserInput} 
                        handleSendButton={handleSendButton} />
                ) : (
                    <ConversationSummary conversation={conversation} handleRowClick={handleRowClick}/>
                )}
            </div>
        </div >
    );
}
