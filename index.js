const recentHistory = document.querySelector('.recent-history');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('button');
const history = document.querySelector('.history');

let display = [];

const Operators = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	x: (a, b) => a * b,
	'/': (a, b) => a / b,
};
const Actions = {
	C: () => clear(),
	Del: () => clearEntry(),
	'%': () => calculatePercentage(),
	'=': () => cal(),
	'!': () => backspace(),
};

buttons.forEach((button) =>
	button.addEventListener('click', (e) => {
		const value = e.target.textContent;
		if (Object.keys(Actions).includes(value)) return Actions[value]();
		else if (Object.keys(Operators).includes(value)) ops(value);
		else if (value >= '0' && value <= '9') takeNums(value);
	})
);

function clear() {
	display = [];
	result.value = '';
	recentHistory.textContent = '';
}
function ops(value) {
	display.push(value);
	result.value = display.join('');
}
function cal() {
	let num = '';
	let op = '';
	const data = display.reduce((acc, item) => {
		if (Object.keys(Operators).includes(item)) op = item;
		else {
			num += item;
		}
		if (op) {
			let number = Number(num);
			console.log(number, num, acc);
			num = '';
			return (acc = Operators[op](acc, number));
		} else {
			return acc;
		}
	}, 0);
	recentHistory.textContent = display.join('');
	result.value = data;
}
function clearEntry() {
	display.pop();
	result.value = display.join('');
}
function calculatePercentage() {
	let num = Number(num1) / 100;
	result.value = num1 = display = num;
}
function takeNums(value) {
	display.push(value);
	result.value = display.join('');
}
