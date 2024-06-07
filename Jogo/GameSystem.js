function escolherValor(a, b){
    min = Math.ceil(a);
    max = Math.floor(b);
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
let bauUm = new bau()
console.log(bauUm)