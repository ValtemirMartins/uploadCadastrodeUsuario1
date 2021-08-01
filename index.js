require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true,  useUnifiedTopology: true })
.then(() =>  {
  console.log('conectei a baase de dados')
    app.emit('pronto');
})
.catch(e => console.log(e));

const userRoute = require('./routes/userRoute')
const port = 3001
app.use(express.json())

userRoute(app)

app.get('/', (req, res ) => res.send('Olá Mundo pelo Express'))

app.on('pronto', () => {
  app.listen(port, () => console.log('API rodando na porta 3001'));
})
