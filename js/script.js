// IMC Data
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos
// Variaveis de seleção dos elementos do HTML
const imcTable = document.querySelector('#imc-table');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const clearBtn = document.querySelector('#clear-btn');
const imcNumber = document.querySelector('#imc-number span')
const imcInfo = document.querySelector('#imc-info span');
const backBtn = document.querySelector('#back-btn'); 
const calcContainer = document.querySelector('#calc-container');
const resultContainer = document.querySelector('#result-container');

// Funções
// Função para a tabela após o calculo
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('table-data');

    const classification = document.createElement('p');
    classification.innerText = item.classification;
    const info = document.createElement('p');
    info.innerText = item.info;
    const obesity = document.createElement('p');
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

// Função para limpar os inputs
function cleanInputs() {
  // Chamando a variavel criada e o valor dentro
  // E alterando o valor para um vazio
  // Nesse caso, para deixar vazio
  // É bom abrir uma string sem nada dentro
  heightInput.value = '';
  // O valor pode ser alterado se necessário
  weightInput.value = '';

  // Limpando as classes do IMC
  // Para evitar gerar bug visual
  imcNumber.classList = '';
  imcInfo.classList = '';
}

// Função para validar o texto
function validDigits(text) {
  // A função recebe um valor de retorno somente
  // De números de 0 a 9 e virgulas (,)
  // Impedindo o usuário de digitar qualquer 
  // Coisa que não seja o que foi pedido
  return text.replace(/[^0-9,]/g, "");
}

// Função para calcular o IMC
// O .toFiex(1) retorna para o usuário um valor
// Com 1 casa decimal
// Deixando o código mais limpo para o usuário final
function calcImc(weight, height){
  // A função irá fazer o cálculo do IMC
  // E irá retornar o valor em 1 casa decimal
  const imc = (weight / (height * height)).toFixed(1);
  // Retornando o valor do imc para a função
  return imc;
}

// Função que criará um 'Toggle' em adicionar
// A classe hide
function showOrHideResults(){
  calcContainer.classList.toggle('hide');
  resultContainer.classList.toggle('hide');
}

// Inicialização
// Utilizando a função de createTable
// E retornando o valor da variavel data
// Essa variavel data possui as informações
// do IMC em object (array)
createTable(data);


// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener('input', (e) => {
    const updatedValue = validDigits(e.target.value);
    e.target.value = updatedValue;
  });
});

calcBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const weight = +weightInput.value.replace(',', '.');
  const height = +heightInput.value.replace(',', '.');

  // O return significa que ele não retorna nada
  // E também não faça nada na pagína
  // Assim que os inputs de altura e peso
  // Estiverem vazias
  if(!weight || !height) return;

  // Chamando a função de IMC
  const imc = calcImc(weight, height);
  
  // Criando a variavel de info
  let info;
  // Percorrendo com o forEach o minimo e o máximo
  // Para que o usuário não coloque niveis
  // "Exobirtantes"
  data.forEach((item) => {
    // Caso o imc for maior ou igual ao minimo
    // E também for menor (ou igual) que o maximo
    // Ele retorna o info
    if(imc >= item.min && imc <= item.max){
      info = item.info;
    }
  });

  // Só de teste =)
  console.log(info);

  // Caso o info não tiver nada dentro
  // Ele retorna nada, impedindo o usuário de
  // Processeguir
  if(!info) return;

  // O innerText (que é do HTML) vai recebero
  // O valor do imc e do info
  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  // Criando um switch com base na informação
  // E alterando a cor para mostrar um feedback
  // Visual para o usuário
  switch(info){
    case "Magreza":{
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
      break;
    };
    case "Normal":{
      imcNumber.classList.add('good');
      imcInfo.classList.add('good');
      break;
    };
    case "Sobrepeso":{
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
      break;
    };
    case "Obesidade":{
      imcNumber.classList.add('medium');
      imcInfo.classList.add('medium');
      break;
    };
    case "Obesidade grave":{
      imcNumber.classList.add('high');
      imcInfo.classList.add('high');
      break;
    };
  }

  // Chamando a função de toggle
  // do shorOrHide
  showOrHideResults();
});

// Botão de limpar inputs
// Evento de click
clearBtn.addEventListener('click', (e) => {
  // Previne que o botão faça qualquer tipo
  // De ação na página
  e.preventDefault();
  // Chamando a função de limpar os inputs
  cleanInputs();
});

// Evento de voltar o botão para o começo da página
backBtn.addEventListener('click', () => {
  // Limpando os inputs anteriores
  cleanInputs();
  // E chamando a função showOrHideResults
  showOrHideResults();
});