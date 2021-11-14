/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
    let [...curRows] = this.rows.map(
      ({ name, age, salary, city }) =>
        `<tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${salary}</td>
        <td>${city}</td>
        <td>
          <button onclick="this.parentElement.parentElement.remove();">X</button>
        </td>
      </tr>`
    );
    let tbody = this.elem.querySelector("tbody");
    tbody.innerHTML = `${curRows.join("")}`;
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.innerHTML = `<table>
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    </table>`;
  }
}
