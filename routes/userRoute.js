const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {                 //para pegar os dados
  const data = fs.existsSync(filePath)   // conferindo se o arquivo existe
    ? fs.readFileSync(filePath)
    : []

  try {
    return JSON.parse(data)
  } catch (error) {
    return []
  }

}
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
  app.route('/users/:id?')
    .get((_req, res) => {
      const users = getUsers()
      res.send({ users })
      
      
    })
    .post((req, res) => {
      const users = getUsers()  // buscando usuario no banco de dadosS
      users.push(req.body)  // aqui estara o nome do caampo enviado e o valor dele
      saveUser(users)       // para usar os dados atualizados e enviar paar json
      res.status(201).send('OK') //confirmação de usuario criado
      //console.log(users)
    })
    .put((req, res) => {
      const users = getUsers()

      saveUser(users.map(user => {
        if (user.id === req.params.id) {
          return {
            ...user,
            ...req.body
          }
        }
        return user   // retorna o usuario sem modificação
      }))

      res.status(200).send('OK')

    })
    .delete((req, res) => {
      const users = getUsers()

      saveUser(users.filter(user => user.id !== req.params.id))

      res.status(200).send('OK')
    })

}
module.exports = userRoute