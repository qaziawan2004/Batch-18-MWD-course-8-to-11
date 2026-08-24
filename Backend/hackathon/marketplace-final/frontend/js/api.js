// // const isLocalDevelopment = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);

// // const API = isLocalDevelopment
// //     ? 'http://localhost:7000/api'
// //     : '/api';

// // export function getToken() {
// //     return localStorage.getItem('token') || '';
// // }

// // export function setAuth(data) {
// //     if (data.token) {
// //         localStorage.setItem('token', data.token);
// //     }

// //     if (data.user) {
// //         localStorage.setItem('user', JSON.stringify(data.user));
// //     }
// // }

// // export function clearAuth() {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// // }

// // export function authHeaders() {
// //     const token = getToken();

// //     if (!token) {
// //         return {};
// //     }

// //     return {
// //         Authorization: `Bearer ${token}`
// //     };
// // }

// // export async function request(path, options = {}) {
// //     const headers = {
// //         ...(options.body instanceof FormData
// //             ? {}
// //             : { 'Content-Type': 'application/json' }),
// //         ...authHeaders(),
// //         ...(options.headers || {})
// //     };

// //     const response = await fetch(API + path, {
// //         ...options,
// //         headers
// //     });

// //     let data = {};

// //     try {
// //         data = await response.json();
// //     } catch {
// //         data = {};
// //     }

// //     if (!response.ok) {
// //         throw new Error(data.message || `Request failed with status ${response.status}.`);
// //     }

// //     return data;
// // }
// const isLocalDevelopment = [
//     'localhost',
//     '127.0.0.1',
//     '::1'
// ].includes(window.location.hostname);


// const API = isLocalDevelopment
//     ? 'http://localhost:7000/api'
//     : 'https://mini-mart-smoky.vercel.app/api';


// export function getToken() {

//     return localStorage.getItem('token') || '';

// }


// export function setAuth(data) {

//     if (data.token) {

//         localStorage.setItem(
//             'token',
//             data.token
//         );

//     }


//     if (data.user) {

//         localStorage.setItem(
//             'user',
//             JSON.stringify(data.user)
//         );

//     }

// }


// export function clearAuth() {

//     localStorage.removeItem('token');

//     localStorage.removeItem('user');

// }


// export function authHeaders() {

//     const token = getToken();


//     if (!token) {

//         return {};

//     }


//     return {

//         Authorization: `Bearer ${token}`

//     };

// }


// export async function request(path, options = {}) {

//     const headers = {

//         ...(options.body instanceof FormData
//             ? {}
//             : {
//                 'Content-Type': 'application/json'
//             }),

//         ...authHeaders(),

//         ...(options.headers || {})

//     };


//     const response = await fetch(
//         API + path,
//         {
//             ...options,
//             headers
//         }
//     );


//     let data = {};


//     try {

//         data = await response.json();

//     } catch {

//         data = {};

//     }


//     if (!response.ok) {

//         throw new Error(
//             data.message ||
//             `Request failed with status ${response.status}.`
//         );

//     }


//     return data;

// }
const isLocalDevelopment = [
    'localhost',
    '127.0.0.1',
    '::1'
].includes(window.location.hostname);


const API = isLocalDevelopment
    ? 'http://localhost:7000/api'
    : 'https://mini-mart-smoky.vercel.app/api';


export function getToken() {
    return localStorage.getItem('token') || '';
}


export function setAuth(data) {

    if (data.token) {
        localStorage.setItem('token', data.token);
    }


    if (data.user) {
        localStorage.setItem(
            'user',
            JSON.stringify(data.user)
        );
    }
}


export function clearAuth() {

    localStorage.removeItem('token');

    localStorage.removeItem('user');
}


export function authHeaders() {

    const token = getToken();


    if (!token) {
        return {};
    }


    return {
        Authorization: `Bearer ${token}`
    };
}


export async function request(path, options = {}) {

    const headers = {
        ...(options.body instanceof FormData
            ? {}
            : {
                'Content-Type': 'application/json'
            }),

        ...authHeaders(),

        ...(options.headers || {})
    };


    const response = await fetch(
        API + path,
        {
            ...options,
            headers
        }
    );


    let data = {};


    try {

        data = await response.json();

    } catch {

        data = {};

    }


    if (!response.ok) {

        throw new Error(
            data.message ||
            `Request failed with status ${response.status}.`
        );

    }


    return data;
}