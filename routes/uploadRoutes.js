module.exports = app => {
    app.get('/api/upload', (req, res) => {
        res.send('Hello');
    });
}