window.addEventListener("load", function() {
  const mId = 0;
  const iId = 0;
  document.getElementById('addIngredient').addEventListener("click", function() {
    const table = document.getElementById('ingredientsTable');
    const row = table.insertRow(-1);
    const measurment1 = row.insertCell(0);
    const ingredient1 = row.insertCell(0);
    mId=+;
    iId=+;
    cell1.innerHTML = `<input type="text" name="measure${mId}">`;
    cell2.innerHTML = `<input type="text" name="ingredient${iId}">`
  });
});