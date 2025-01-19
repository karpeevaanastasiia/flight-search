document.addEventListener("DOMContentLoaded", () => {


// URL CORS Anywhere и API
const corsProxy = 'http://localhost:8080/';
const apiUrl = /* 'https://api.travelpayouts.com/v1/prices/cheap' */ 'https://api.travelpayouts.com/v1/prices/calendar';
const token = 'eae321f19a9d55b89d4bf3c1c3fdebea' /* '321d6a221f8926b5ec41ae89a3b2ae7b' */;

//Переменные для отображения билетов
// Находим контейнер, в который будем добавлять билеты
const ticketsContainer = document.querySelector("#ticket-container");


// Параметры запроса
const params = {
  depart_date: '2025-01', // Дата вылета
  return_date: '2025-02', // Дата возвращения
  origin: 'MOW', // Код аэропорта отправления
  destination: 'HKT', // Код аэропорта назначения
};

const queryParams = new URLSearchParams(params);

// Функция для получения данных
async function getTickets() {
  try {
    const response = await fetch(`${corsProxy}${apiUrl}?${queryParams.toString()}${'&calendar_type=return_date'}${'&token='}${token}`, {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`);
    }

    const result = await response.json();
    console.log('Данные о билетах:', result); // Выводим данные в консоль
  /* } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
} */

// Получаем данные билетов
const ticketsData = result.data;

// Функция для преобразования данных из API в массив билетов
function parseTickets(ticketsData) {
  const tickets = [];
  for (const date in ticketsData) {
    if (ticketsData.hasOwnProperty(date)) {
      tickets.push(ticketsData[date]);
    }
  }
  return tickets;
}

// Преобразуем данные в массив билетов
const ticketList = parseTickets(ticketsData);
console.log(ticketList);



// Функция для генерации HTML билета
function createTicketHTML(ticket) {
  return `
      <div class="ticket-item">
        <div class="ticket-header">
          <h2 class="ticket-price">${ticket.price} руб.</h2>
          <p class="ticket-airline">${ticket.airline}</p>
        </div>
        <div class="ticket-information">
          <div class="ticket-start-finish">
            <div class="ticket-text-box">
              <h3 class="ticket-information_title">${ticket.origin} → ${ticket.destination}</h3>
              <p class="ticket-information_text">${new Date(ticket.departure_at).toLocaleString()}</p>
            </div>
            <div class="ticket-text-box">
              <h3 class="ticket-information_title">${ticket.destination} → ${ticket.origin}</h3>
              <p class="ticket-information_text">${new Date(ticket.return_at).toLocaleString()}</p>
            </div>
          </div>
          <div class="ticket-flight-number">
            <div class="ticket-text-box">
              <h3 class="ticket-information_title">НОМЕР РЕЙСА</h3>
              <p class="ticket-information_text">${ticket.flight_number}</p>
            </div>
          </div>
          <div class="ticket-transfer">
            <div class="ticket-text-box">
              <h3 class="ticket-information_title">ПЕРЕСАДКИ</h3>
              <p class="ticket-information_text">${ticket.transfers}</p>
            </div>
          </div>
        </div>
      </div>
  `;
}

/* // Функция для рендеринга билетов
function renderTickets(ticketList) {
  ticketsContainer.innerHTML = ""; // Очищаем контейнер
  ticketList.forEach((ticket) => {
    const ticketHTML = createTicketHTML(ticket);
    ticketsContainer.innerHTML += ticketHTML; // Добавляем билет
  });
}  */

   function renderTickets(ticketList) {
    ticketsContainer.innerHTML = ""; // Очищаем контейнер
    ticketList.forEach((ticket) => {
      const ticketHTML = createTicketHTML(ticket);
      ticketsContainer.insertAdjacentHTML("beforeend", ticketHTML); // Добавляем билет
    });
  } 

/* // Преобразуем данные в массив билетов
const tickets = parseTickets(data); */
renderTickets(ticketList); // Отображаем билеты на странице
console.log(ticketsContainer);
} catch (error) {
console.error('Ошибка при получении данных:', error);
}
}






// Запуск функции при загрузке страницы
getTickets();
});
