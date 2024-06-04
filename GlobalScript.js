//Leva o usuário para uma página específica
function goOn(voltar, page){

    switch (page) {
        case "menu":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Menu"
            }, 200);
            break;
        case "personagens":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Personagens"
            }, 200);
            break;
        case "jogo":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Jogo"
            }, 200);
            break;
        case "opcoes":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Opcoes"
            }, 200);
            break;
        case "sobre":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href =  "/CrazyRooms.js/Sobre"
            }, 200);
            break;
        default:
            break;
    }
}