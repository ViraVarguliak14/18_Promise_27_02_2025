console.log("Start");

// setTimeout - запускает функцию, переданную первым параметром с задержкой в миллисекундах,
//              переданной вторым параметром
setTimeout(() => console.log(5), 0);

//
let flag = true;
function getFiveAfterSevenSeconds() {
  // 1. Promise - обёртка над асинхронным действием, которую мы можем сохранить в результате синхронного действия
  // и в дальнейшем обработать результат асинхронного действия (с помощью методов then, catch, finally)

  // 2. resolve - встроенный метод и первый параметр функции, которую передаём Promise
  // Данному методу в качестве параметра нужно передать результат в случае успешного сценария
  // Для обработки результата будет использоваться метод then()

  // 3. reject - встроенный метод и второй параметр функции, которую передаём Promise
  // Данному методу в качестве параметра нужно передать результат в случае неуспешного сценария
  // Для обработки результата будет использоваться метод catch()

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      flag ? resolve(5) : reject("Error: flag equal false");
    }, 7000);
  });
}

console.log("Finish");

for (let i = 0; i < 1000000; i++) {}

getFiveAfterSevenSeconds()
  .then((valueFromResolve) => {
    // работа с результатом успешного кейса
    console.log(valueFromResolve);
  })
  .catch((problemFromReject) => {
    // работа с результатом неуспешного кейса
    console.log(problemFromReject);
  })
  .finally(() =>
    console.log(
      "Это действие выполнится при любом сценарии (при любом значении flag)"
    )
  );

// Встроенный в js метод для запроса на сервер (в качестве параметра передается адрес сервера)
document.body.classList.add("container", "my-5", "text-center");
const usersList = document.createElement("ol");
usersList.classList.add("list-group");
document.body.appendChild(usersList);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    console.log(
      "Ответ на запрос на сервер на получение данных о пользователях: ",
      response
    );
    // JavaScript Object Notation (JSON)
    if (response.ok) {
      return response.json();
    } else throw new Error("Error");
  })
  .then((users) => {
    // Распечатать на странице список пользователей: name, email, phone, companyName, city
    // 1. Создать список (в html или js)

    // 2. Итерируя массив пользователей при каждой итерации:
    // Alias (Псевдоним при деструктуризации)
    users.forEach(
      ({
        name,
        email,
        phone,
        company: { name: companyName },
        address: { city },
      }) => {
        // а. Создаётся новый элемент списка
        const usersListItem = document.createElement("li");
        usersListItem.classList.add("list-group-item");
        // b. Настройка элемента (обязательная часть - это текстовый контент, дополнительно - стилистика)
        usersListItem.innerHTML = `
            <h1>Name: ${name}</h1>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Name of company: ${companyName}</p>
            <p>City name: ${city}</p>
      `;
        // с. Добавить элемент в список
        usersList.appendChild(usersListItem);
      }
    );
    // 3* Так как список был создан в JS его необходимо добавить на страницу (например, в качестве содержимого тэга body)
  })
  .catch((error) => {
    usersList.innerHTML = `<li class="list-group-item">Problem: ${error.message}</li>`;
  });
