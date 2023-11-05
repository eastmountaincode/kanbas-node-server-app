const Hello = (app) => { 
    app.get('/hello', (req, res) => {
        res.send('Life is good! Hello!') })
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    }) 
}
export default Hello;