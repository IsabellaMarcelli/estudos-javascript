/* duas variáveis que vão receber um elemento dentro do nosso documento HTML de acordo com o ID dele */

const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

/* quando eu clique no botão ele ative a questão do input de receber imagem : */
uploadBtn.addEventListener("click", () => {    /*          */
    inputUpload.click();    /* primeiro coloco o evento que eu quero e depois o que eu quero que aconteça quando esse evento acontecer */  
    /* no momento que eu clicar no botão ele vai associar com o input que está escondido para possibilitar o envio de imagens */
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {    /* quando a promessa der certo vai ter um retorno dentro do resolve e quando der errado vou ter um retorno dentro do reject */
        const leitor = new FileReader();  /* iniciando um leitor de arquivo, responsável por ler o arquivo que está sendo recebido como parâmetro dessa função  */
        leitor.onload = () => {              /* quando ele tier feito a leitura do arquivo eu quero retornar da promessa o resolve */
            resolve({ url: leitor.result, nome: arquivo.name })
        }       
        
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)

    }) 
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");   /* vou pegar o container que tem o nome da imagem  e quero definir o parágrafo, linha 59 do HTML */

inputUpload.addEventListener("change", async (evento) =>     {   /* quando acontecer alguma mudança dentro do input de imagem vai acontecer alguma funcionalidade, que vai ser a leitura do arquivo */
    const arquivo = evento.target.files[0];   /* lá dentro quero selecionar um arquivo que está sendo enviado nessa mudança , a variável arquivo vai receber o evento (vai pegar o evento do envio, vai entrar dentro desse evento e vai pegar o arquivo que está sendo enviado) */
    
    if(arquivo) {    /* validação -> se realmente existir um arquivo eu quero que tente fazer algo com esse arquivo   */
        try {                                              /* esse arquivo vai ficar dentro de uma variável (conteúdo) */
            const ConteudoDoArquivo  = await lerConteudoDoArquivo(arquivo);     /* na linha 28 defini a funcionalidade como async pq quero esperar a leitura da imagem antes de ir p servidor */
                 /*   await - ocorre uma espera quando ele for utilizar a função lerConteudoDoArquivo  */
            imagemPrincipal.src = ConteudoDoArquivo.url;   /* após a leitura do arquivo a imagem principal seja substituída por aquele arquivo que o usuário vai carregar */
            nomeDaImagem.textContent = ConteudoDoArquivo.nome;             /* vou trocar o nome da imagem pro conteúdo do arquivo, que foi o que eu defini no resolve da linha 16 */

        } catch (erro) {             /* se acontecer algum erro na funcionalidade lerConteudoDoArquivo ele vai fazer determinada coisa: */
            console.error("Erro na leitura do arquivo");    /* está tentando fazer a leitura do arquivo, se der algo errado durante o processo dentro do try ele vai capturar esse erro através do catch e vai imprimir no console que não foi possível fazer o upLoad do arquivo */
        }                         
    }                           
       
})  

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click" , (evento) => {   // pegar esse evento pra detectar onde que está acontecendo o click dentro da lista de tags  
     if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;   // depois de verificar se eu cliquei dentro do X ele vai pegar o X selecionado e o elemento pai (li) 
        listaTags.removeChild(tagQueQueremosRemover);   // vai pegar a lista de tags e remover o elemento filho (li) desejado através da variavel tagQueQueremosRemover
     }

} )

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto) {  //aqui vamos simular a requisição, simulando que está ocorrendo uma busca dentro do banco de dados para procurar se aquelas palavras existem ou não
    return new Promise((resolve) => { // tem o tempo de busca e por isso faço uma promessa para depois me retornar o resultado
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto)); // vai percorrer a lista procurando se existe ou não aquilo que estou digitando no campo de digitação 
        }, 1000)    // mil que corresponde a 1 segundo  - pesquisa rápida, mas estamos lidando com a sincronicidade a partir do timeOut que definimos um espaço de tempo para acontecer algo
    })
}

inputTags.addEventListener("keypress", async (evento) => { /* ele fica cuidando pra se caso acontecer alguma coisa (essa coisa é o 1º argumento - keypress), o keypress vai ficar monitorando as teclas do teclado e algo vai acontecer quando isso ocorrer, pra isso eu defini a função anônima (evento) */
    if (evento.key === "Enter") {  /* vamos detectar qual tecla do teclado que foi pressionada porque eu quero que a funcionalidade ocorra somente no enter */
        evento.preventDefault();   /* talvez pode ocorrer de um comportamento padrão e que atualize a tela e eu não quero isso se nao vou perder tudo o que coloquei no formulário */
        const tagTexto = inputTags.value.trim(); /* trim vai remover todos os espaços em branco que tiver antes e depois da palavra */
        if (tagTexto !== "") {                           /* se... tiver algo dentro dessa tag texto, dentro do campo de digitação */
            try {  /* pra me retornar true ou false, se retornar true eu vou imprimir a tag na tela se não não; tentar ver se consigo colocar na tela a partir do retorno eu uso o TRY e o CATCH */
                const tagExiste = await verificaTagsDisponiveis(tagTexto);   /* para verificar se a tag está na lista ou não */
                if (tagExiste) {     /* se a tag existe aí sim ele constrói o elemento, se não ... */
                    const tagNova = document.createElement("li");   /* construi um novo ítem da lista de tags e dentro desse novo ítem vou colocar o valor da tag em si e o valor do X */
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);  /* posso remover o valor que tem dentro daquela tag porque nós já utilizamos ela para construir, e estou adicionando um novo elemento na lista (com o append) */
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada.");
                    /* aqui estamos lidando com 2 tipos de situações que pode dar problema, tanto na requisição quanto não existe a tag , são situações diferentes, mas que retornam algum feedback pro usuário */
                }
            } catch (error) { /* try/catch vai verificar se a tag existe e se não funcionar ele vai retornar o erro */
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.")  /* quando da um erro na requisição para aquela funcionalidade e não um erro pra dizer que aquela tag não existe */

            }
        }
    }
})

// simular o evento dele pro banco de dados / backend 

async function publicarProjeto (nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {  // como é uma simulação de envio pro banco de dados nós não temos como garantir se vai dar certo e nem que vai dar errado , precisamos esperar esse processo de envio ser resolvido pra retornar essa informação
    return new Promise((resolve, reject) => {
        setTimeout(() => {         // usei setTimeout para simular um intervalo de tempo 
            const deuCerto = Math.random() > 0.5;  // vai retornar verdade quando um número aleatório que for retornado do math.random for maior do que 0.5 se não ele vai retornar como errada essa promessa
            // se math.random gerar um valor maior que 0.5 deuCerto será true, se não será falsa e era exibir o erro
            if (deuCerto) {
                resolve("Projeto publicado com sucesso")
            } else {
                reject("Erro ao publicar o projeto.")
            }
        }, 2000) // 2 segundos, pra dar o tempo disso acontecer e simular a demora da internte do usuário

    })
}

const botaoPublicar = document.querySelector(".botao-publicar")  // tendo acesso a esse botão eu quero detectar o click dele (feito na próxima linha)
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault(); // tirar o evento padrão de envio do formulário

    const nomeDoProjeto = document.getElementById("nome").value;      // value para receber o valor e não o elemento em si 
    const descricaoDoProjeto = document.getElementById("descricao").value;    
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent); 
    // dentro desse array eu vou ter uma lista com todos os elementos "p" que ele encontrar na lista e p/ pegar apenas o conteúdo textual e não o elemento em si/parágrafo eu uso o .map((tag) => tag.textContent) que vai passar 
    // por todas as tags desse array e retornar apenas o conteúdo textual

    try {     // vai chamar essa funcionalidade para tentar fazer a simulação 
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo!");
    } catch (error) {    // se der erro eu vou pegar o erro que vai acontecer 
        console.log("Deu errado: ", error)
        alert("Deu tudo errado!");
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();   // evita ações padrões, pois eu não quero que ele faça o evento antes de fazer as ações debaixo

    const formulario = document.querySelector("form");  //aqui ele vai procurar dentro de todo o projeto , dentro do todo documento HTML o elemento form , estou usando um seletor de elemento e no projeto só tem um então ele vai achar o correto
    formulario.reset();  // vai resetar todos os campos de digitação de dentro desse formulário para eles ficarem vazios 

    // a imagem não faz parte do formulário, é algo separado então preciso acessar ela pra alterar
    imagemPrincipal.src = "./img/imagem1.png";

    // para alterar o conteúdo textual que fica referenciando o nome da imagem:
    nomeDaImagem.textContent = "image_projeto.png";

    // para limpar a lista de tags:
    listaTags.innerHTML = " ";

     
})