const transactionsEl = document.querySelector(".transactions"); // transactions <ul>
const balanceNumberEl = document.querySelector(".balance-number"); 
const numberIncomeEl = document.querySelector(".number--income");
const numberExpensesEl = document.querySelector(".number--expenses");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.getElementById("description");
const inputAmountEl = document.getElementById("amount");


formEl.addEventListener('submit', handleSubmit);
transactionsEl.addEventListener("click", handleClick);


function handleSubmit(event) {
    event.preventDefault(); // prevent page refresh on submit
    const description = inputDescriptionEl.value;
    const amount = +inputAmountEl.value;

    // create transaction item html
    const transactionItemHTML = `
                                    <li class="transaction transaction--${amount > 0 ? 'income' : 'expense'}">
                                        <span class="transaction__description">${description}</span>
                                        <span class="transaction__amount">${amount > 0 ? '+' : ''}${amount.toFixed(2)}</span>
                                        <button class="transaction__btn">X</button>
                                    </li>
                                `;

    // insert transaction item
    transactionsEl.insertAdjacentHTML("beforeend", transactionItemHTML);

    // clear form and blur (i.e unfocus) inputs on enter key
    formEl.reset();
    inputDescriptionEl.blur();
    inputAmountEl.blur();
    
    // update income or expenses overview
    if (amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome + amount;
        numberIncomeEl.textContent = updatedIncome.toFixed(2);
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses + (amount * -1);
        numberExpensesEl.textContent = updatedExpenses.toFixed(2);
    }

    updateBalance(); // update balance
}

function handleClick(event) {
    // only proceed if the clicked element is the delete button
    if (!event.target.classList.contains("transaction__btn")) return;

    const clickedEl = event.target.closest("li.transaction"); // safely get the closest <li>
    if (!clickedEl) return;

    // update income or expenses overview
    const amountEl = clickedEl.querySelector(".transaction__amount"); // get amount from child element
    const amount = +amountEl.textContent;
    
    if (amount > 0) {
        const currentIncome = +numberIncomeEl.textContent;
        const updatedIncome = currentIncome - amount;
        numberIncomeEl.textContent = updatedIncome.toFixed(2);
    } else {
        const currentExpenses = +numberExpensesEl.textContent;
        const updatedExpenses = currentExpenses - (amount * -1);
        numberExpensesEl.textContent = updatedExpenses.toFixed(2);
    }
    
    clickedEl.remove(); // remove the clicked transaction node <li>
    updateBalance(); // update balance
}


function updateBalance() {
    // calculate balance and update
    const income = +numberIncomeEl.textContent;
    const expenses = +numberExpensesEl.textContent;
    const balance = income - expenses;
    balanceNumberEl.textContent = balance < 0 ? `-$${(balance * -1).toFixed(2)}` : `$${balance.toFixed(2)}`;

    // change text color to red if balance < 0, otherwise black
    balanceNumberEl.style.color = balance < 0 ? 'red' : 'white';
}
