//Configurando o servidor
const express = require("express")
const server = express()

//Configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

//Lista de doadores -> Vetor ou Array
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
]


//Configurar a apresentação da página
server.get("/", function(req, res){
    return res.render("index.html", { donors })
})

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor.")
})