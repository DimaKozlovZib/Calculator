"use script";

const calculator = {
	numBut    : document.querySelectorAll(".button-num__item"),
	funcBut   : document.querySelectorAll(".button-function__item"),
	result    : document.querySelector("#result"),
	display   : document.querySelector("#display"),
	reset     : document.querySelector("#reset-button"),
	clearLast : document.querySelector("#clear-last"),
	AllButton : document.querySelectorAll(".button"), 
	tochka    : document.querySelector("#tochka"),
};

let expressionString = new String("");// выражение :) global
let lastAction = new String(""); // строка для проверки последнего действия global
let tochkaStop = false;// переменная для открытия и закрытия функции добавления точки (.) , для уменьшения количества ошибок при функции результата.


//слушатель цифр
calculator.numBut.forEach(item => {item.addEventListener("click", () => {
	let value = item.getAttribute('data-value'); //видемое значение
	lastAction = "number";// последнее действие для правильного отображения выражения
	lineOutput(value , value , false);// вызов функции для Display
} ) } );


//слушатель функций
calculator.funcBut.forEach(item => {item.addEventListener("click", () => {
    //.................................................................................................................
    
	let func = item.getAttribute('data-fun');//не видемое значение
	let	value = item.textContent;//видемое значение
    let lastLetter = expressionString.slice(-1);

    //.................................................................................................................
    if (lastLetter == func) { return 0;}
    if (expressionString == "" ) {
        if (value === "-") {
            tochkaStop = false; // открытия доступа к точке
	        lastAction = "function"; // последнее действие для правильного отображения выражения
	        return lineOutput(value , func , false , false);// вызов функции для Display  
        } else { return 0;}
    } 
    if (lastAction == "function") {
        tochkaStop = false; // открытия доступа к точке
	    return lineOutput(value , func , false , true);// вызов функции для Display
    }
	tochkaStop = false; // открытия доступа к точке
	lastAction = "function"; // последнее действие для правильного отображения выражения
	lineOutput(value , func , false , false);// вызов функции для Display
} ) } );


// функция подсчёта результата
calculator.result.addEventListener("click", () => {
	try {
		//.................................................................................................................

		let expression = eval(expressionString);// главная вычислительная функция
            tochkaStop = false; // открытия доступа к точке

		//.................................................................................................................

		return typeof expression == "number" ? (lineOutput(`${expression}` , `${expression}`, true , false) , lastAction = "number"/*// последнее действие для правильного отображения выражения */) : lineOutput("" , "", true , false);// вызов функции для Display
	} catch(err) {
        tochkaStop = false; // открытия доступа к точке
		return lineOutput("ошибка" , "ошибка", true , false);// вызов функции для Display
	}
} );


// слушатель точки 
calculator.tochka.addEventListener("click", () =>{
	if(!tochkaStop){
		if (lastAction !== "number") {
			lastAction = "number";// последнее действие для правильного отображения выражения
			tochkaStop = true;// закрытие доступа к точке
			return lineOutput("0." , "0." , false);// вызов функции для Display
		} else {
            tochkaStop = true;// закрытие доступа к точке
		    return lineOutput("." , "." , false);// вызов функции для Display
        }
		
	}
});


// функция очистки дисплея
calculator.reset.addEventListener("click", () => {
    tochkaStop = false; // открытия доступа к точке
	lastAction = "";// последнее действие для правильного отображения выражения
	return lineOutput("", "", true , false);// вызов функции для Display
} );

// функция удаления последнего символа
calculator.clearLast.addEventListener("click", () => {
	return lineOutput("", "", false , true);// вызов функции для Display
})



function lineOutput(item , dataInfo , resultAndReset , clearLast){
	let lastLetter = expressionString.slice(-1)//последний символ в строке
	if (clearLast) {
		expressionString = expressionString.slice(0, -1);
		calculator.display.innerHTML = calculator.display.innerHTML.slice(0, -1);

		//.................................................................................................................

		if (item == ""){
            lastLetter = expressionString.slice(-1)
            if (("-+/*%".split("")).indexOf(lastLetter) !== -1) { lastAction = "function"}// получение посленего действия если поледний символ был функцией
            if (("1234567890.".split("")).indexOf(lastLetter) !== -1) { lastAction = "number"}// получение посленего действия если поледний символ был цифрой
			if (expressionString === "") { lastAction = ""; }// после удаления последнего символа в строке, удалить последнее действие
        }

		//................................................................................................................
	};
	if (lastAction === "function" && dataInfo !== "-" && expressionString === "") { return 0; }

	if (!resultAndReset){
		expressionString += dataInfo , calculator.display.innerHTML += item;
        return calculator.display.scrollLeft = 100000000000000;
	}
	expressionString = dataInfo;
	return calculator.display.innerHTML = item;
}