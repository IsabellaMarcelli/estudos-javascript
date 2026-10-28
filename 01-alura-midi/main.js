function tocaSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);

    if (elemento && elemento.localName === 'audio') {
        elemento.play();
    }
    else {
        //alert('Elemento não encontrado');
        console.log('Elemento não encontrado ou seletor inválido')
    }
}

const listaDeTeclas = document.querySelectorAll('.tecla');

let contador = 0;


//while(contador < listaDeTeclas.length) {     - substituí isso pela linha debaixo
for (let contador = 0; contador < listaDeTeclas.length; contador++) {
//variável contadora da repetição, a condição de interrupção das repetições e a condição de incrementação da variável contadora

    const tecla = listaDeTeclas[contador]; 

    // const instrumento = listaDeTeclas[contador].classList[1];        - isso virou a linha debaixo
    const instrumento = tecla.classList[1];

    //template string 
    const idAudio = `#som_${instrumento}`; 

    //console.log(idAudio);   

    //listaDeTeclas[contador].onclick = function() {     - isso virou a linha debaixo
    tecla.onclick = function() {
        tocaSom(idAudio);
    }

    //contador = contador + 1;

    //console.log(contador);   - comentei os consoles porque não é mais necessário visualizar eles lá na web

    //Código omitido

    //Código omitido

    tecla.onkeydown = function (evento) {

        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');

        }
        
    }

    tecla.onkeyup = function () {
        tecla.classList.remove('ativa');
    }
}   
