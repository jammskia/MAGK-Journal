import express from 'express';
const app = express();
import configRoutes from './routes/routesIndex.js';
import exphbs from 'express-handlebars';

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main',

    // formats date to be like 'Monday January 1'
    helpers: {
        formatDate: (date) => {
            const formats = { weekday: 'long', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-US', formats);
        }
    }
}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes running on http://localhost:3000');
});

