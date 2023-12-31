const form = document.querySelector('form')
const nome = document.querySelector('#name')
const data = document.querySelector('#birth-date')


// transformando o local storage em JSON para podemos manipular
const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []

pessoas.forEach((elemento) => {
    criaElemento(elemento)

    
});
const Linha = document.querySelectorAll('tr')


//variavel linha para percorrer 
Linha.forEach((elemento) => {

    //adicionando função de click
    elemento.addEventListener('click', evento => {
        linhaCliacada = evento.target.parentNode

        

        if (linhaCliacada.innerText === 'Nome	Data de nascimento') {
            alert('Não é possível alterar essas informações')
        }
        else {
            const editar = linhaCliacada.querySelectorAll('td')


            //criando model para editar
            const model = document.createElement('div')
            document.body.appendChild(model)
            model.classList.add('model')
            const btn_sair = document.createElement('button')
            btn_sair.textContent = 'X'
            model.appendChild(btn_sair)
            btn_sair.classList.add('sair')

            //criando div1 para colocar as coisas dentro
            const div1 = document.createElement('div')
            model.appendChild(div1)



            const inputName = document.createElement('input')
            const inputDate = document.createElement('input')

            div1.appendChild(inputName)
            div1.appendChild(inputDate)

            inputDate.setAttribute("type", "date");
            inputName.setAttribute("type", "text");

            //div2 com os botoes
            const div2 = document.createElement('div')
            model.appendChild(div2)
            const btn_editar = document.createElement('button')
            const btn_apagar = document.createElement('button')

            btn_editar.textContent = 'Editar'
            btn_apagar.textContent = 'Apagar'

            div2.appendChild(btn_apagar)
            div2.appendChild(btn_editar)





            // função de click para fechar modal
            btn_sair.addEventListener('click', evento => {
                model.style.display = "none"
            })

            //pegando as informações da linha a partir do id da linha clicada
            //console.log(pessoas[linhaCliacada.id])
            //console.log(linhaCliacada.id)

            inputName.value = pessoas[linhaCliacada.id].nome
            inputDate.value = pessoas[linhaCliacada.id].data

            console.log(pessoas[linhaCliacada.id].data)
            btn_editar.addEventListener('click', evento => {
                const novoInputNome = inputName.value
                console.log(novoInputNome)
                
                const novoInputData = inputDate.value
                console.log(novoInputData)

                console.log(linhaCliacada)

                linhaCliacada.innerHTML = `
                <tr> 
                    <td>${novoInputNome}</td>
                    <td>${novoInputData}</td>
                </tr>
                `

                editaElemento(linhaCliacada.id, novoInputNome, novoInputData )

                console.log(pessoas[linhaCliacada.id])
                model.style.display = "none"

                
                

            })



        }

    })

})

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

    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')

    td1.innerHTML = pessoa.nome
    td2.innerHTML = pessoa.data

    tr.id = pessoa.id

    table.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)

}

//função de editar elemento
function editaElemento(id, valorNome, valorData) {
    const pessoaEditar = pessoas[id]

    pessoaEditar.nome = valorNome;
    pessoaEditar.data = valorData;

    //modificando o local Storage com as mudanças
    localStorage.setItem("pessoas", JSON.stringify(pessoas))

}











