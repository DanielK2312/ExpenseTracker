class Expense {
  constructor(expense, date, amount) {
    this.expense = expense;
    this.date = date;
    this.amount = amount
  }
}

class UI {

  // take in expense to have access to amount, date, etc
  addToList(expense) {

    const rowData = document.getElementById('expense-list');

    // create a row
    const row = document.createElement('tr')

    // insert row data
    row.innerHTML = `
      <td>${expense.expense}</td>
      <td>${expense.date}</td>
      <td>${expense.amount}</td>
      <td><a href="" class="delete">X</td>
    `;

    rowData.appendChild(row);

  }

  // Show Alert
  showAlert(message, className) {
    // create div
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');

    // get form
    const form = document.querySelector('#info');

    // insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000)
  }

  clearFields() {
    document.getElementById('expense').value = '';
    document.getElementById('date').value = '';
    document.getElementById('amount').value = '';
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

}

document.getElementById('info').addEventListener('submit', function (e) {

  // get form values
  const exp = document.getElementById('expense').value;
  const date = document.getElementById('date').value;
  const amount = document.getElementById('amount').value;

  // Instantiate expense object
  const expense = new Expense(exp, date, '$' + amount);

  // Instantiate UI
  const ui = new UI();


  // if the text values are blank, throw and error message
  if (exp === '' || date === '' || amount === '') {
    ui.showAlert('Error Need to enter items', 'error');
  } else {
    // add expense to list if the fields are filled out
    ui.addToList(expense);

    // slert user that it has been added successfully
    ui.showAlert('Successfully added!', 'success')

    // reset form fields upon adding
    ui.clearFields();
  }

  e.preventDefault();
});

document.querySelector('#expense-list').addEventListener('click', function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert('deleted successfully', 'success');

  e.preventDefault();
})