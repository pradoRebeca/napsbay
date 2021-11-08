"use strict";

const limparElementos = (elemento) => {
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const limparMensagem = (elemento) =>{
	elemento.removeChild(elemento.lastChild);
}

const mensagemErro = () => {
	const container = document.querySelector(".container-galeria");
    const novoTexto= document.createElement("p");
	novoTexto.classList.add("mensagem");
	novoTexto.innerHTML = 
	`
	Tente pesquisar por dança, música, flores, bicicleta, cidade...
	`
	 container.appendChild(novoTexto);	
}


const criarItem = (urlImagem) => {
    const container = document.querySelector(".container-galeria")
    const novoLink = document.createElement("div")
	novoLink.classList.add('container-galeria-imagem')
   	novoLink.innerHTML =

	`<a href="${urlImagem.pageURL}" target="_blank"> 
	<img src='${urlImagem.webformatURL}' class="galeria-imagens">
	</a>
	<p class="galeria-texto"> ${urlImagem.tags}</p>
	`
	 container.appendChild(novoLink);
}

//criando uma galeria de slides
//const criarSlide = (urlImagem, indice, array) => {
//    const container = document.querySelector(".slide-container")
//    const novaDiv = document.createElement("div")
//	novaDiv.classList.add("slide")
//   	const pegarId = urlImagem.id;
//	novaDiv.id = pegarId;
//	const foto = urlImagem.webformatURL;
//
//    const indiceAnterior = indice <= 0 ? array.length -1 : indice -1
//    const idAnterior = array[indiceAnterior].id
//
//    const indiceProximo = indice >= array.length -1 ? 0 : indice +1
//    const idProximo = array[indiceProximo].id
//    novaDiv.innerHTML = 
//    `
//    <div class="imagem-container">
//        <a href="#" class="fechar"> &#128473; </a>
//        <a href="#${idAnterior}" class="navegacao anterior"> &#171; </a>
//        <img src="${ urlImagem.webformatURL}"> 
//        <a href="#${idProximo}" class="navegacao proximo"> &#187; </a>
//    </div>
//    `
//    container.appendChild(novaDiv);
//}


const pesquisar = async (evento) =>{
	const chave_api = '24207124-0f0c23103cb7bdff6b003febe';
	const per_page = '200';
	const safesearch = 'true'
	limparMensagem(document.querySelector(".container-galeria")); 
	if( evento.key === "Enter" || evento.type === "click"){
		const textInput = document.getElementById('barra-pesquisa').value;
		const url = "https://pixabay.com/api/?key="+chave_api+"&q="+textInput+"&per_page="+per_page+"lang=pt"+"&safesearch="+safesearch;
		const imagensResponse = await fetch(url);
        const imagens = await imagensResponse.json();
		
		limparElementos(document.querySelector(".container-galeria"));
//		limparElementos(document.querySelector(".slide-container"));
		 
		if(imagens.total == 0){
			mensagemErro();
		} else {
			imagens.hits.forEach(criarItem);
//			imagens.hits.forEach(criarSlide);  
		}
	} else {
		const chave_api = '24207124-0f0c23103cb7bdff6b003febe';
		const url = "https://pixabay.com/api/?key="+chave_api+"&per_page="+ per_page+"lang=pt"+"&safesearch="+safesearch;
		const imagensResponse = await fetch(url);
		const imagens = await imagensResponse.json();
		imagens.hits.forEach(criarItem);
//		imagens.hits.forEach(criarSlide);
	}
}

//carregando as imagens para carregar quando a pagina for carregada
document.addEventListener("DOMContentLoaded", pesquisar);

//carregando as imagens atrvés do enter na barra de pesquisa
document.querySelector("#barra-pesquisa").addEventListener('keypress', pesquisar);

//carregando as imagens através da lupa de pesqusa (button)
document.getElementById("btn-pesquisa").addEventListener("click", pesquisar);