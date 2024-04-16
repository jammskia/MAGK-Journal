import entryRoutes from './entries/entries.js';

const constructorMethod = (app) => {
    app.use('/entries', entryRoutes);

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.use('*', (req, res) => {
        res.redirect('/');
    })
}

export default constructorMethod;