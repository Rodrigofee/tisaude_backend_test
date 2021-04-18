const express = require("express");
const router = express.Router();
const db = require("../models");
// const cepPromise = require("cep-promise");
const view = require("../views/views");

router.get("/all", (req, res) => {
    db.User.findAll().then(users => res.send(users));
});

router.post('/new', (req, res) => {
    const nascimento = req.body.data_nascimento;   
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

    var risco = view(nascimento);

    

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
        const msg = "Você está no grupo de risco " + risco;
        return res.send(msg);
    }

    else{
        const msg = "This zip code is not in Olinda";
        return res.send(msg);
    }

});

router.get("/find/:cpf", (req, res) => {
    db.User.findAll({
        where: {
            cpf: req.params.cpf
        }
    }).then( user => res.send(user));
});

router.delete("/delete/:cpf", (req, res) => {
    const inputCpf = req.params.cpf;
    const motivo = req.body.motivo;

    db.Motivo.create({
        cpf: inputCpf,
        motivo: motivo
    }).then(submitedMotivo => res.send(submitedMotivo));

    db.User.destroy({
        where: {
            cpf: inputCpf
        }
    }).then(() => res.send("Você foi removido da lista."));
});


module.exports = router;