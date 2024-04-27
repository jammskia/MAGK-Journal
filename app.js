import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
import configRoutes from './routes/routesIndex.js';
import exphbs from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',

    // formats date to be like 'Monday January 1'
    helpers: {
        formatDate: (date) => {
            const formats = { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            };
            return new Date(date).toLocaleDateString('en-US', formats);
        }
    }
}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes running on http://localhost:3000');
});

