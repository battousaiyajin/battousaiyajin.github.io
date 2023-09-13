function obterDados() {
	const numerosInput = document.getElementById("numeros");
	const quantidadeInput = document.getElementById("quantidade");
	const listaNumerosEmTexto = numerosInput.value.split(" ");
	const numeros = listaNumerosEmTexto.map(valor => parseInt(valor, 10));
	const elementoJogos = document.getElementById("jogos");
	elementoJogos.innerHTML = "";
	combinacoes(numeros, quantidadeInput.value);
}

function combinacoes(numeros, quantidade) {
	ordenaNumeros(numeros);
	
	const listaIndices = [0];
	let quantidadeDeJogos = 0;
	
	function proximasCombinacoes() {
		const ponteiroIndice = listaIndices.length - 1;
		const distanciaAteUltimoPonteiro = quantidade - ponteiroIndice - 1;
		const indiceLimite = numeros.length - distanciaAteUltimoPonteiro;
		for (let indice = listaIndices[ponteiroIndice]; indice < indiceLimite; indice++) {
			listaIndices[ponteiroIndice] = indice;
			if (distanciaAteUltimoPonteiro == 0) {
				quantidadeDeJogos++;
				mostraJogo(numeros, listaIndices, quantidadeDeJogos);
			} else {
				listaIndices.push(indice + 1);
				proximasCombinacoes(listaIndices, quantidade, numeros);
			}
		}
		listaIndices.splice(ponteiroIndice, 1);
	}
	
	proximasCombinacoes();
	
	const quantidadeDeJogosElemento = document.getElementById("quantidade-de-jogos");
	quantidadeDeJogosElemento.innerText = quantidadeDeJogos;
}

function ordenaNumeros(numeros) {
	numeros.sort((a, b) => {
		return a - b;
	});
}

function mostraJogo(numeros, listaIndices, numeroJogo) {
	let textoJogo = nuumeroJogo + ": " + numeros[listaIndices[0]];
	for (let ponteiroIndice = 1; ponteiroIndice < listaIndices.length; ponteiroIndice++) {
		textoJogo += ", " + numeros[listaIndices[ponteiroIndice]];
	}
	const elementoJogos = document.getElementById("jogos");
	const elementoJogo = document.createElement("DIV");
	elementoJogo.innerText = textoJogo;
	elementoJogos.appendChild(elementoJogo);
}