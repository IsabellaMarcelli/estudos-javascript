console.log(`\n Trabalhando com condicionais`);

const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro` 
);

const idadeComprador = 18;
const estaAcompanhada = false;
let temPassagemComprada = false;
const destino = "Salvador";

console.log("\n Destinos possíveis: ");
console.log(listaDeDestinos);

const podeComprar = idadeComprador >= 18 || estaAcompanhada == true; 

console.log(" \n Embarque: \n")

let contador = 0;
let destinoExiste = false;  // só altera se o destino existir , lá dentro do while  , se for falso ele não muda a variável

while (contador<3) {    // enquanto essa condição for verdadeira eu executo este bloco de código:

    if(listaDeDestinos[contador] == destino) {  // o texto que está dentro do contador é igual ao destino? se for...
        destinoExiste = true;
        break;

    }
    // } else {
    //     destinoExiste = false;
    // }

    contador += 1;
}

console.log("Destino existe: " , destinoExiste);

if(podeComprar && destinoExiste) {
    console.log("Boa viagem!");
}else {
    console.log("Desculpe, tivemos um erro")
}




for (let cont = 0; cont < 3; cont++) {    // cont++ = contador + 1

    if(listaDeDestinos[contador] == destino) {  // ex.: curitiba, quando ele vê que tudo é falso ele simplesmente sai do loop
        destinoExiste = true;
    }
}
