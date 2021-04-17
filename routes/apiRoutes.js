const express = require("express");
const router = express.Router();
const db = require("../models");
const cepPromise = require("cep-promise");

router.get("/all", (req, res) => {
    db.User.findAll().then(users => res.send(users));
});

router.post('/new', (req, res) => {
    // const dataAtual = new Date();
    const nascimento = req.body.data_nascimento;
    // const data = new Date(nascimento);
    
    const inputNome = req.body.nome;
    const inputCpf = req.body.cpf;
    const inputTelefone = req.body.telefone;
    const inputEmail = req.body.email;
    const inputEndereco = req.body.endereco;
    const inputNumero = req.body.numero;
    const inputComplemento = req.body.complemento;
    const inputCidade = req.body.cidade;
    const inputEstado = req.body.estado;
    const inputCep = req.body.cep;
    const inputSexo = req.body.sexo;
    const inputGestante = req.body.gestante
    var risco = null;
    var isAtivo = null;

     var risco = validateYear(nascimento);

    // const result = cepPromise(inputCep);
    // console.log(result.city);

    // if(result.city != "Olinda"){
    //     isAtivo = false
    //     console.log("aqui 1");
    // }

    // else{
    //     isAtivo = true;
    //     console.log("aqui 2");
    // }



    if(inputCidade === "Olinda"){
        db.User.create({
            nome: inputNome,
            cpf: inputCpf,
            telefone: inputTelefone,
            email: inputEmail,
            endereco: inputEndereco,
            numero: inputNumero,
            complemento: inputComplemento,
            cidade: inputCidade,
            estado: inputEstado,
            cep: inputCep,
            data_nascimento: nascimento,
            sexo: inputSexo,
            gestante: inputGestante,
            risco: risco,
            valido: true,
            gestante : req.body.gestante,
            ativo: true
        }).then(submitedUser => res.send(submitedUser));
        const msg = "Registered";
        return res.send(msg);
    }

    else{
        const msg = "This zip code is not in Olinda";
        return res.send(msg);
    }
});

function validateYear(age){
    var data = age; // pega o valor do input
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array
    
    // para o IE onde será inserido no formato dd/MM/yyyy
    if(data_array[0].length != 4){
       data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
    }
    
    // comparo as datas e calculo a idade
    var hoje = new Date();
    var nasc  = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    
    if(idade < 18){
       risco = "Baixo";
       return risco;
    }
 
    else if(idade >= 18 && idade <= 60){
       risco = "Médio";
       return risco;
    }
    
    else{
        risco = "Alto";
        return risco
    }
    
 }

module.exports = router;