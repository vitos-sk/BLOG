// src/utils/request.jsx
export function request(url, method, data) {
    const apiUrl = url.startsWith("/api") ? url : `/api${url}`;

    return fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json",
        },
        method: method || "GET",
        body: data ? JSON.stringify(data) : undefined,
    }).then((res) => res.json());
}
