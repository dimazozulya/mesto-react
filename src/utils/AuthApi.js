const AUTH_URL = 'https://reqres.in/api';

export function registerUser({ email, password }) {
    console.log("Отправляем запрос на регистрацию:", { email, password });

    return fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => {
            console.log("Ответ сервера:", res.status, res.statusText);
            return res.json(); // Распарсим JSON
        })
        .then((data) => {
            console.log("Ответ сервера (JSON):", data);
            return data;
        })
        .catch((err) => {
            console.error("Ошибка регистрации:", err);
            throw err;
        });
}

export function loginUser({email, password}){
    return fetch (`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',   
        },
        body: JSON.stringify({ email, password }),
    })
    .then((res) => {
        if(!res.ok){
            throw new Error (`Ошибка авторизации : ${res.status}` )
        }
        return res.json();
    })
    .then((data) => {
        console.log('Авторизация успешна: ', data);
        return data;
    })

    .catch((err) => {
        console.error('Ошибка при авторизации: ', err);
        throw err;
    });
}