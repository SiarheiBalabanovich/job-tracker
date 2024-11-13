export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jobs/${id}`;

    try {
        if (method === 'PUT') {
            const response = await fetch(baseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });
            const data = await response.json();
            res.status(200).json(data);
        } else if (method === 'DELETE') {
            const response = await fetch(baseUrl, {
                method: 'DELETE',
            });
            if (response.ok) {
                res.status(204).end();
            } else {
                res.status(500).json({ error: 'Failed to delete job' });
            }
        } else {
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to Koa server' });
    }
}