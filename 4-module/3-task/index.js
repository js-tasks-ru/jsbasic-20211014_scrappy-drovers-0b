function highlight(table) {
  const keyWords = Array.from(table.rows[0].children);
  const statusCellIndex = getCellIndex(keyWords, "Status");
  const genderCellIndex = getCellIndex(keyWords, "Gender");
  const ageCellIndex = getCellIndex(keyWords, "Age");
  for (const row of table.rows) {
    const statusCell = row.cells[statusCellIndex];
    const genderCell = row.cells[genderCellIndex];
    const ageCell = row.cells[ageCellIndex];
    const availability = getAvailability(statusCell);
    const gender = getGender(genderCell);
    if (availability) {
      row.classList.add(availability);
    } else {
      row.setAttribute("hidden", true);
    }
    row.classList.add(gender);
    if (+ageCell.innerHTML < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}

function getCellIndex(keyWords, textNode) {
  return keyWords.find(
    (node) => node.innerHTML === textNode
  ).cellIndex;
};

function getAvailability(cell) {
  if (cell.hasAttribute("data-available")) {
    if (cell.dataset.available === "true") {
      return "available";
    }
    return "unavailable";
  }
  return "";
};

function getGender(cell) {
  if (cell.innerHTML === "m") {
    return "male";
  }
  return "female";
};
