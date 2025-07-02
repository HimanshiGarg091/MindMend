app.get('/api/test-openai', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello' }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content.trim() });
  } catch (err) {
    console.error('Test API Error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});
