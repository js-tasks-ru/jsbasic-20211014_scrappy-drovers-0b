function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const element = table.rows[i].cells[i];
    if (element.innerHTML === `${i + 1}:${i + 1}`) {
      element.style.backgroundColor = "red";
    }
  }
}
