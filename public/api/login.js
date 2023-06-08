const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { 
    // Pre-flight request. Reply successfully:
    return res.status(200).end();
  }

  const { userId } = req.body;
  const secretKey = 'your_secret_key'; // Replace this with your actual secret key

  if (req.method === 'POST') {
    if (!userId) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const token = jwt.sign({ id: userId }, secretKey, {
      expiresIn: '1h', // token will expire in 1 hour
    });

    return res.status(200).json({ token });
  }

  // If we're here, then the method is not allowed.
  res.setHeader('Allow', 'POST, OPTIONS');
  return res.status(405).end('Method Not Allowed');
};
