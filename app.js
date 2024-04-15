import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use('/', express.static('public'));

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes running on http://localhost:3000');
})