// Импортируем cors-anywhere
const corsAnywhere = require('cors-anywhere');
/* const http = require('http'); */
const port = 8080; // Порт, на котором будет работать сервер

/* // Создаем прокси-сервер
const server = http.createServer((req, res) => {
  corsAnywhere.createServer({
    originWhitelist: [], // Разрешаем все домены (можно ограничить определенными)
    requireHeaders: [],  // Заголовки не обязательны
    removeHeaders: ['cookie', 'cookie2'], // Убираем ненужные заголовки
  }).emit(req, res); // Обрабатываем запросы через CORS Anywhere
});

// Запускаем сервер на порту 8080
server.listen(port, () => {
  console.log(`CORS proxy server is running on http://localhost:${port}`);
}); */

// Конфигурируем сервер
corsAnywhere.createServer({
  originWhitelist: [], // Разрешаем все домены (можно ограничить определенными)
  requireHeaders: [],  // Указываем, что заголовки не обязательны
  removeHeaders: ['cookie', 'cookie2'], // Убираем определенные заголовки
}).listen(port, () => {
  console.log(`CORS proxy server is running on http://localhost:${port}`);
});