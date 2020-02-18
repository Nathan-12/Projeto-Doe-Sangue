//Configurando o servidor
const express = require("express")
const server = express()

//Configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//Habilitar body do form
server.use(express.urlencoded({ extended: true}))

// COnfigurar a conexão com o BD
const Pool = require("pg").Pool
const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    post: 5432,
    database: 'doe'
})

//Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

//Lista de doadores -> Vetor ou Array
/*
const donors = [
    {
        name: "Nathan Lima",
        blood: "O+"
    },
    {
        name: "Ana Camilla",
        blood: "O-"
    },
    {
        name: "Maria de Fátima",
        blood: "A+"
    }
] */


//Configurar a apresentação da página
server.get("/", function(req, res){
   
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro de bando de dados.")

        const donors = result.rows

        return res.render("index.html", { donors })
    })
})



server.post("/", function(req, res) {
    //pegar dados do form
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "" ){
        return res.send("Todos os campos são obrigatórios.")
    }

    // Coloca os valores dentro do bd
    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    const values = [name, email, blood]
    
    db.query(query, values, function(err){
        if(err) return res.send("Erro no banco de dados.")

        return res.redirect("/")
    })

    

})

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor.")
})