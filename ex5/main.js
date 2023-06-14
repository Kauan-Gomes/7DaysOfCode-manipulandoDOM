const form = document.querySelector('form')
const nome = document.querySelector('#name')
const data = document.querySelector('#birth-date')


// transformando o local storage em JSON para podemos manipular
const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []

pessoas.forEach((elemento) => {
    criaElemento(elemento)


});
//pegando todas as linhas dessa tabela
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

            //input do model vai ter o mesmo valor da linha clicada
            inputName.value = pessoas[linhaCliacada.id].nome
            inputDate.value = pessoas[linhaCliacada.id].data

            

            btn_editar.addEventListener('click', evento => {
                //criando nova variavel para receber as mudanças
                const novoInputNome = inputName.value
                
                const novoInputData = inputDate.value
                

                //alterando no DOM as informações editadas
                linhaCliacada.innerHTML = `
                <tr> 
                    <td>${novoInputNome}</td>
                    <td>${novoInputData}</td>
                </tr>
                `

                //chamando a função edita os elementos
                editaElemento(linhaCliacada.id, novoInputNome, novoInputData)

                //fechando o model logo em seguida
                model.style.display = "none"

            })
        
            btn_apagar.addEventListener('click', evento => {
                //chamando  a função para apagar o elemento
                apagaElemento(linhaCliacada, linhaCliacada.id)

                //fechando o model logo em seguida
                model.style.display = "none"

            })


        }

    })

})

form.addEventListener('submit', evento => {
    evento.preventDefault()

    //criando objeto com a pessoa atual 
    const pessoaAtual = {
        "nome": nome.value,
        "data": data.value
    }

    //colocando id na pessoa atual
    pessoaAtual.id = pessoas[pessoas.length - 1] ? (pessoas[pessoas.length - 1]).id + 1 : 0;


    criaElemento(pessoaAtual)

    //subindo a pessoa nova para o array de pessoas
    pessoas.push(pessoaAtual)


    //atualizando o localStorage
    localStorage.setItem("pessoas", JSON.stringify(pessoas))

    nome.value = ""
    data.value = ""
})

function criaElemento(pessoa) {

    const table = document.querySelector('table')

    //Criando as celulas da tabela
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')

    //adicioanndo as informações dessas celulas
    td1.innerHTML = pessoa.nome
    td2.innerHTML = pessoa.data

    tr.id = pessoa.id

    //colocando elas nos seus devidos lugares
    table.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)

}

function editaElemento(id, valorNome, valorData) {
    const pessoaEditar = pessoas[id]

    //alterando o as informações do objeto com oq tem nos input
    pessoaEditar.nome = valorNome;
    pessoaEditar.data = valorData;

    //mandando as informações para o localStorage
    localStorage.setItem("pessoas", JSON.stringify(pessoas))

}

//função para apagar o elemento do DOM e localStorage
//Passando como parametro o id do objeto e a linha a ser excluida
function apagaElemento(tag, id) {
    //removendo tag
    tag.remove()

    //removendo do objeto pessoas
    pessoas.splice(pessoas.findIndex(elemento => elemento.id === id), 1)

    //subindo para o localStorage o novo objeto sem o elemento removido
    localStorage.setItem("pessoas", JSON.stringify(pessoas))


}






