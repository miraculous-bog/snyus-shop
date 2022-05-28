const form = document.getElementById('order-form');
const username = document.getElementById('ename');
const email = document.getElementById('email');
const phone = document.getElementById('ephone');
form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
	if (a&&b&&c) {
			location.href="thank/thank.html";
	}
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const phoneValue = phone.value.trim();
	
	if(usernameValue === '') {
		let a;
		setErrorFor(username, 'Поле "Имя" не может быть пустым!');
	} else {
		a=setSuccessFor(username);
	}
	
	if(emailValue === '') {
		let b;
		setErrorFor(email, 'Поле "Почта" не может быть пустым!');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Неправильное значение, пример "user@mail.com"');
	} else {
		b=setSuccessFor(email);
	}
	if(phoneValue === '') {
		let c;
		setErrorFor(phone, 'Поле "Почта" не может быть пустым!');
	} else if (!isPhone(phoneValue)) {
		setErrorFor(phone, 'Неправильное значение, пример "+380991234567"');
	} else {
		c=setSuccessFor(phone);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
	return true;
}
function isPhone(AStr) {
	AStr = AStr.replace(/[\s\-\(\)]/g, '');
	return AStr.match(/^((\+?3)?8)?0\d{9}$/) != null;
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



