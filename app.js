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

    
    helpers: {
        // formats date to be like 'Monday January 1'
        formatDate: (date) => {
            const formats = { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            };
            return new Date(date).toLocaleDateString('en-US', formats);
        },

        // for emotion and energy prefilling
        equals: (arg1, arg2) => {
            if (arg1.toString() === arg2.toString()) {
                return 'checked';
            }
            return '';
        },

        // for activities and socials prefilling
        includes: (arr, value) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].toString() === value.toString()) {
                    return 'checked';
                }
            }
            return '';
        },

        // determine if a category should start visible in edit page
        isVisible: (items, entryItems) => {
            for (let i = 0; i < items.length; i++) {
                let itemId = items[i]._id.toString();
                for (let j = 0; j < entryItems.length; j++) {
                    if (itemId === entryItems[j]) {
                        return 'visible';
                    }
                }
            }
            return 'hidden';
        },
        
                
        // for the singlepage energy bar
        // calculates up to what level the bar should be filled depened on the energy value
        energyLevel: (value, index) => {
            if (index + 1 <= value) { // + 1 because of indexing
                return 'filled';
            }
            return '';
        },

        // for testing, 
        // ex: {{log entry.notes}} in handlebars for example
        log: (value) => {
            console.log(value);
        }
    }
}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes running on http://localhost:3000');
});

