export default function handler(req, res) {
  // Solo GET para testing
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Use GET for testing' });
  }
  
  // Obtener secret de query params
  const url = new URL(req.url, 'https://vercel.app');
  const secret = url.searchParams.get('secret');
  const expected = process.env.API_SECRET;
  
  // Respuesta segura
  return res.status(200).json({
    match: secret === expected,
    received: secret ? secret.substring(0, 10) + '...' : 'NOT_SENT',
    expected: expected ? expected.substring(0, 10) + '...' : 'NOT_CONFIGURED',
    lengths: { 
      received: secret ? secret.length : 0, 
      expected: expected ? expected.length : 0 
    }
  });
}