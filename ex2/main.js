const form = document.querySelector('form')
const nome = document.querySelector('#name')
const data = document.querySelector('#birth-date')

// transformando o local storage em JSON para podemos manipular
const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []


console.log(nome)
console.log(data)

pessoas.forEach((elemento) => {
    criaElemento(elemento)
});

form.addEventListener('submit', evento => {
    evento.preventDefault()

    console.log(nome.value)
    console.log(data.value)

    const pessoaAtual = {
        "nome": nome.value,
        "data": data.value
    }


    pessoaAtual.id = pessoas[pessoas.length - 1] ? (pessoas[pessoas.length - 1]).id + 1 : 0;

    criaElemento(pessoaAtual)

    pessoas.push(pessoaAtual)



    localStorage.setItem("pessoas", JSON.stringify(pessoas))

    nome.value = ""
    data.value = ""
})

function criaElemento(pessoa) {

    const table = document.querySelector('table')

    const tr= document.createElement('tr')
    const td1= document.createElement('td')
    const td2= document.createElement('td')
    
    td1.innerHTML= pessoa.nome
    td2.innerHTML= pessoa.data

    table.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)





}