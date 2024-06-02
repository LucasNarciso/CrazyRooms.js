let personagens = [
    {nome:"Personagem Um", id:1},
    {nome:"", id:2},
    {nome:"", id:3},
    {nome:"Personagem Dois", id:4},
    {nome:"", id:5},
    {nome:"", id:6}
]

function renderizaPersonagens(){
    personagens.forEach((perso, i)=>{

        document.querySelector('#botoes').insertAdjacentHTML('beforeend',`
            <button class="botaoCheio personagem ${perso.nome == "" && "vazio"}">${perso.nome && perso.nome}</button>
        `)

    })
    
    document.querySelector('.Quantidade').innerHTML = `${personagens.filter(p=>p.nome!="").length} / ${personagens.length}`
}

function iniciar(){
    try{
        renderizaPersonagens();
    } catch(e){ setTimeout(iniciar, 100) }
}

iniciar()