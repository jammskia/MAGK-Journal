import express from 'express';
const app = express();
import configRoutes from './routes/routeIndex.js';
import exphbs from 'express-handlebars';

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes running on http://localhost:3000');
});