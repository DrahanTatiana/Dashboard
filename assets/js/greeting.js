const nameFromStorage = localStorage.getItem('name'); // Забираем имя из хранилища

if (nameFromStorage === null) { // проверка введено ли имя
    const name = prompt('Пожалуйста, представьтесь?'); // пользователь вводит имя
    if (name === '') {
        document.querySelector('#hi').innerHTML = `<b>Гость</b>, добро пожаловать!`;
    } else {
        document.querySelector('#hi').innerHTML = `<b>${name}</b>, добро пожаловать!`; // именное приветствие
        localStorage.setItem('name', name); // сохраняется имя в хранилище
    }

} else { // если имя было введено, то оно подставляется 
    document.querySelector('#hi').innerHTML = `<b>${nameFromStorage}</b>, добро пожаловать!`;
}
