//Leva o usuário para uma página específica
function goOn(voltar, page){
    console.log(page)
    console.log(voltar)
    switch (page) {
        case "menu":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/menu"
            }, 200);
            break;
        case "personagens":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/personagens"
            }, 200);
            break;
        case "jogo":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/jogo"
            }, 200);
            break;
        case "opcoes":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/opcoes"
            }, 200);
            break;
        case "sobre":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/opcoes"
            }, 200);
            break;
        default:
            break;
    }
}