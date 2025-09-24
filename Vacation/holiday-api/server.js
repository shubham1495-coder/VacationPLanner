const express = require('express');
    const fs = require('fs').promises;
    const cors = require('cors');
    const app = express();
    const port = 3000;
    app.use(cors());
    app.use(express.static('public'));
    app.get('/', (req, res) => {
        res.send('Welcome to the Vacation Planner API. Use /holidays to fetch holiday data.');
    });
    app.get('/holidays', async (req, res) => {
        try {
            const data = await fs.readFile('holidays.json', 'utf8');
            res.json(JSON.parse(data));
        } catch (error) {
            console.error('Error reading holidays.json:', error);
            res.status(500).json({ error: 'Failed to load holiday data' });
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
