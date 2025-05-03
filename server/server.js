require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/conversations/summary', async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      select: {
        id: true,
        messages: {
          take: 1,
          orderBy: { timestamp: 'asc' }, // ✅ use correct field name
          select: {
            id: true,
            content: true,
            timestamp: true,
          },
        },
      },
    });

    const result = conversations.map((c) => ({
      id: c.id,
      firstMessage: c.messages[0] || null,
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching summaries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

app.get('/conversations/:id', async (req, res) => {
    const { id } = req.params;
    const convo = await prisma.conversation.findUnique({
        where: { id: parseInt(id) },
        include: { messages: true},
    });
    if (!convo) return res.status(404).send('Conversation not found');
    res.json(convo);
});

app.post('/conversations/:id/messages', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const userMessage = await prisma.message.create({
        data: {
            conversationId: parseInt(id),
            direction: 'in',
            content,
            timestamp: new Date()
        },
    });

    const botReply = await prisma.message.create({
        data: {
            conversationId: parseInt(id),
            content: "Hi! Im bot, how can I help you?",
            direction: 'out', 
            timestamp: new Date()
        },
    });

    res.json([userMessage, botReply]);
});

app.post('/conversations/new', async (req, res) => {
  const { caseId, productId, productName, status, messages, title } = req.body;

  const user = await prisma.user.findFirst();
  if (!user) {
    return res.status(400).json({ error: 'No user found in the database.' });
  }

  const newConversation = await prisma.conversation.create({
    data: {
      caseId,
      productId,
      productName,
      status,
      title,
      userId: user.id,
      messages: {
        create: messages || []
      }
    },
  });

  const botReply = await prisma.message.create({
    data: {
      conversationId: newConversation.id,
      direction: 'out',
      content: "Hi! I'm bot, how can I help you?",
      timestamp: new Date()
    }
  });

  res.json([newConversation, botReply]);
});

app.delete('/conversations/:id', async (req, res) => {
    const conversationId = parseInt(req.params.id);
  
    if (isNaN(conversationId)) {
      return res.status(400).json({ error: 'Invalid conversation ID' });
    }
  
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });
  
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      await prisma.conversation.delete({
        where: { id: conversationId },
      });
  
      res.status(200).json({ message: 'Conversation and messages deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
