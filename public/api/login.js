// pages/api/login.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Here we just return a simple message for simplicity.
    res.status(200).json({ message: 'You are logged in.' });

    // After the user logs in, we redirect them to another page where we perform the Ethereum wallet login.
    res.redirect("/eth_login");
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
