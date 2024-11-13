import axios from 'axios';

export default async function handler(req, res) {
    const { method } = req;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Проверка, что переменная окружения установлена
    if (!baseUrl) {
        console.error('Ошибка: NEXT_PUBLIC_API_BASE_URL не задана');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const url = `${baseUrl}/api/jobs`;

    try {
        if (method === 'GET') {
            // Обработка GET
            const response = await axios.get(url);
            res.status(200).json(response.data);
        } else if (method === 'POST') {
            // Обработка POST
            const response = await axios.post(url, req.body);
            res.status(201).json(response.data);
        } else {
            // метод не поддерживается
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error(`Error in ${method} /api/jobs:`, error);
        res.status(500).json({ error: 'Failed to connect to Koa server' });
    }
}