export default async function handler(req, res) {
    const { method } = req;
    const baseUrl = 'https://job-tracker-production-dbb8.up.railway.app';

    try {
        if (method === 'GET') {
          // Обработка GET
        const response = await fetch(baseUrl);
        const data = await response.json();
        res.status(200).json(data);
    } else if (method === 'POST') {
          // Обработка POST
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(201).json(data);
    } else {
          // метод не поддерживается
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
} catch (error) {
    res.status(500).json({ error: 'Failed to connect to Koa server' });
}
}