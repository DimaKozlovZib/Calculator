"use script";

const calculator = {
	numBut    : document.querySelectorAll(".button-num__item"),
	funcBut   : document.querySelectorAll(".button-function__item"),
	result    : document.querySelector(".button-function__item-result"),
	display   : document.querySelector("#display"),
	reset     : document.querySelector("#reset-button"),
	clearLast : document.querySelector("#clear-last"),
}

let expressionString = "";// выражение :)
let lastAction = ""; // строка для проверки последнего действия


//слушатель цифр
calculator.numBut.forEach((item) => {item.addEventListener("click", () => {
	let value = item.querySelector(".text-box").textContent;//видемое значение
	lastAction = "number"
	lineOutput(value , value , false);// вызов функции для Display
} ) } );

//слушатель функций
calculator.funcBut.forEach((item) => {item.addEventListener("click", () => {
	let func = item.getAttribute('data-fun'),//не видемое значение
		value = item.textContent;//видемое значение
	if (lastAction == "") {
		if (value === "-") {
			lastAction = "function"
			lineOutput(value , func , false , false);// вызов функции для Display
		} else{ return 0;}
	}
	if (lastAction == "function") {
		lineOutput(value , func , false , true);// вызов функции для Display
		return "";
	}
	lastAction = "function"
	lineOutput(value , func , false , false);// вызов функции для Display
} ) } );

// функция подсчёта результата
calculator.result.addEventListener("click", () => {
	try {
	let expression = eval(expressionString);// главная вычислительная функция
	typeof expression == "number" ? (lineOutput(`${expression}` , `${expression}`, true , false) , lastAction = "number") : lineOutput("" , "", true , false);// вызов функции для Display
	} catch(err) {
		lineOutput("ошибка" , "ошибка", true , false);// вызов функции для Display
	}
} );

// функция очистки дисплея
calculator.reset.addEventListener("click", () => {
	lastAction = "";
	lineOutput("", "", true , false);// вызов функции для Display
} );

calculator.clearLast.addEventListener("click", () => {
	lineOutput("", "", false , true);// вызов функции для Display
})




function lineOutput(item , dataInfo , resultAndReset , clearLast){
	if (clearLast) {
		expressionString = expressionString.slice(0, -1)
		calculator.display.innerHTML = calculator.display.innerHTML.slice(0, -1)

		if (expressionString === "") { lastAction = ""; }// если после удаления последнего символа , удалить последнее действие
	} 
	if(!resultAndReset){
		expressionString += dataInfo;
		calculator.display.innerHTML += item;
		return true;
	}
	expressionString = dataInfo;
	calculator.display.innerHTML = item;
}