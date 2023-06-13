const btn_salvar = document.querySelector('#salvar')
const form = document.querySelector('form')
const nome = document.querySelector('#name')
const data = document.querySelector('#birth-date')

const valores = document.querySelector('#valores')

console.log(btn_salvar)
console.log(nome)
console.log(data)


form.addEventListener('submit', evento => {
    evento.preventDefault()

    const nomeInput = nome.value
    const dataInput = data.value
    console.log(nomeInput)
    console.log(dataInput)



})