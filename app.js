'use strict';

const ALGORITHM = document.getElementById('operation');
const RESULT = document.getElementById('result');
const CHANGE = document.getElementById('change-theme');
const BtnOperation = document.querySelectorAll('.btn-operation');
let numbers = [];
let result;
let operator = ['', false];
let point = false;
let charactersMax = 14;
let normalMode = true;

// Modo Nocturno
const putNightMode = () => {
	document.body.style.backgroundColor = '#333';
	RESULT.style.backgroundColor = '#000';
	ALGORITHM.style.backgroundColor = '#000';
	CHANGE.style.backgroundColor = '#000';
	RESULT.style.color = '#fff';
	ALGORITHM.style.color = '#fff';
	CHANGE.style.color = '#fff';
	for (let i = 0; i < BtnOperation.length; i++) {
		BtnOperation[i].style.backgroundColor = '#3c3c3c';
		BtnOperation[i].style.color = '#fff';
	}
}

// Modo Normal
const putNormalMode = () => {
	document.body.style.backgroundColor = '#fff';
	RESULT.style.backgroundColor = '#fc5';
	ALGORITHM.style.backgroundColor = '#fc5';
	CHANGE.style.backgroundColor = '#f4a818';
	RESULT.style.color = '#000';
	ALGORITHM.style.color = '#333';
	CHANGE.style.color = '#000';
	for (let i = 0; i < BtnOperation.length; i++) {
		BtnOperation[i].style.backgroundColor = '#f80';
		BtnOperation[i].style.color = '#000';
	}
}

// Cambia entre modo normal y modo nocturno
CHANGE.addEventListener('click', ()=>{
	if (normalMode) {
		putNightMode();
		normalMode = false;
	} else {
		putNormalMode();
		normalMode = true;
	}
});

// Ahora vamos a escribir en la seccion de algoritmo los numeros
function addNumbers(num) {
	let display = ALGORITHM.innerHTML;
	if (display === '0') {
		ALGORITHM.innerHTML = num;
	} else {
		ALGORITHM.innerHTML += num;
	}
}

// Ahora vamos a agregar el operador en la seccion de algoritmo
function addOperator(op) {
	if (operator[1] !== true) {
		numbers[0] = ALGORITHM.innerHTML;
		operator = [op, true];
		ALGORITHM.innerHTML += op;
		point = false;
	}
}

// Esta funcion agrega un punto y se asegura de no agregar mas de 1
function addPoint() {
	if (point !== true) {
		ALGORITHM.innerHTML += '.';
		point = true;
	}
}

// Esta funcion limpia la calculadora
function allClean() {
	ALGORITHM.innerHTML = 0;
	RESULT.innerHTML = 0;
	numbers = [];
	result = 0;
	operator = ['', false];
	point = false;
}

// Esta funcion es la que va eliminando los numeros
function clean() {
	let algorithm = ALGORITHM.innerHTML;
	let result = RESULT.innerHTML;
	if (algorithm.length !== 1 && result.length !== 1) {
		ALGORITHM.innerHTML = algorithm.substring(0, algorithm.length - 1);
		RESULT.innerHTML = result.substring(0, result.length - 1);
	} else if (algorithm.length !== 1 && result.length === 1) {
		RESULT.innerHTML = 0;
		ALGORITHM.innerHTML = algorithm.substring(0, algorithm.length - 1);
	} else {
		ALGORITHM.innerHTML = 0;
		RESULT.innerHTML = 0;
	}
}

// Esta funcion busca el segundo numero despues del operador seleccionado
function findSecondNumber() {
	let algorithm = ALGORITHM.innerHTML;
	let num, index;

	if (algorithm.includes('+')) {
		index = algorithm.indexOf('+') + 1;
		num = algorithm.substring(index, algorithm.length);
		return num;

	} else if (algorithm.includes('-')) {
		index = algorithm.indexOf('-') + 1;
		num = algorithm.substring(index, algorithm.length);
		return num;

	} else if (algorithm.includes('*')) {
		index = algorithm.indexOf('*') + 1;
		num = algorithm.substring(index, algorithm.length);
		return num;

	} else if (algorithm.includes('/')) {
		index = algorithm.indexOf('/') + 1;
		num = algorithm.substring(index, algorithm.length);
		return num;
	}
}

/* Esta funcion verifica que el resultado a mostrar en pantalla no sea mayor
que los caracteres permitidos para la seccion de resultado */
function verifyResult(num) {
	let number = num.toString();
	if (number.length <= 10) {
		return number;
	} else {
		let total= number.length - charactersMax;
		number = number.substring(0, number.length - total);
		return number;
	}
}

// Esta es la funcion que ejecuta las operaciones aritmeticas
function resolve() {

	numbers[1] = findSecondNumber();

	let numA = parseFloat(numbers[0]);
	let numB = parseFloat(numbers[1]);

	if (operator[0] === '+') {
		result = numA + numB;

	} else if (operator[0] === '-') {
		result = numA - numB;

	} else if (operator[0] === '*') {
		result = numA * numB;

	} else if (operator[0] === '/') {
		result = numA / numB;

	}

	ALGORITHM.innerHTML = result;
	RESULT.innerHTML = verifyResult(result);
	operator = ['', false];
}