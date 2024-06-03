//Leva o usuário para uma página específica
function goOn(voltar, page){

    let urlsplit = window.location.href.split('/')

    switch (page) {
        case "menu":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                // window.location.href = "Menu"
                urlsplit[urlsplit.indexOf(urlsplit.at(-2))] = "Menu"
                window.location.href = urlsplit.join('/')
            }, 200);
            break;
        case "personagens":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                // window.location.href = "Personagens"
                urlsplit[urlsplit.indexOf(urlsplit.at(-2))] = "Personagens"
                window.location.href = urlsplit.join('/')
            }, 200);
            break;
        case "jogo":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                // window.location.href = "Jogo"
                urlsplit[urlsplit.indexOf(urlsplit.at(-2))] = "Jogo"
                window.location.href = urlsplit.join('/')
            }, 200);
            break;
        case "opcoes":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                // window.location.href = "Opcoes"
                urlsplit[urlsplit.indexOf(urlsplit.at(-2))] = "Opcoes"
                window.location.href = urlsplit.join('/')
            }, 200);
            break;
        case "sobre":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                // window.location.href = "Sobre"
                urlsplit[urlsplit.indexOf(urlsplit.at(-2))] = "Sobre"
                window.location.href = urlsplit.join('/')
            }, 200);
            break;
        default:
            break;
    }
}