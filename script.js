
// URL CORS Anywhere и API
const corsProxy = 'http://localhost:8080/';
const apiUrl = /* 'https://api.travelpayouts.com/v1/prices/cheap' */ 'https://api.travelpayouts.com/v1/prices/calendar';
const token = 'eae321f19a9d55b89d4bf3c1c3fdebea' /* '321d6a221f8926b5ec41ae89a3b2ae7b' */;

//Переменныедля отображения билетов
const ticketList = document.getElementsByClassName('ticket-list');

// Параметры запроса
const params = {
  depart_date: '2025-01', // Дата вылета
  origin: 'MOW', // Код аэропорта отправления
  destination: 'HKT', // Код аэропорта назначения
  /* return_date: '2025-02', // Дата возвращения */
};

const queryParams = new URLSearchParams(params);

// Функция для получения данных
async function getTickets() {
  try {
    const response = await fetch(`${corsProxy}${apiUrl}?${queryParams.toString()}${'&calendar_type=departure_date'}${'&token='}${token}`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    const data = await response.json();
    /* renderTickets(data.data); // Передаем данные в функцию отрисовки */
    console.log('Данные о билетах:', data); // Выводим данные в консоль
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

// Запуск функции при загрузке страницы
getTickets();