import entryRoutes from './entries/entries.js';
import moodMeterRoutes from './moodMeter/moodMeter.js';

const constructorMethod = (app) => {
    app.use('/entries', entryRoutes);

    app.use('/moodMeter', moodMeterRoutes);

    app.get('/', (req, res) => {
        res.render('home', {
            title: 'Home'
        });
    });

    app.use('*', (req, res) => {
        res.redirect('/');
    })
}

export default constructorMethod;