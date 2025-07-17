const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// POST /chat
app.post('/chat', async (req, res) => {
  const { message, model } = req.body;
  if (!message || !model) {
    return res.status(400).json({ error: 'Message and model are required.' });
  }

  try {
    // System prompt to instruct the model to act as a prompt improver
    const systemPrompt =
      'You are a prompt improvement assistant. Given a user prompt, rewrite it to be clearer, more detailed, and more effective for use with AI models. Do not answer the prompt, just improve its wording.';
    const ollamaRes = await axios.post('http://localhost:11434/api/generate', {
      model,
      prompt: `${systemPrompt}\n\nUser prompt: ${message}`,
      stream: false
    });
    res.json({ response: ollamaRes.data.response });
  } catch (err) {
    res.status(500).json({ error: 'Ollama error', details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 