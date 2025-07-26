let balance = 0;
const transactions = [];

const balanceDisplay = document.getElementById("balance");
const message = document.getElementById("message");
const transactionList = document.getElementById("transaction-list");

function showSection(section) {
  document.getElementById("add-section").classList.add("hidden");
  document.getElementById("withdraw-section").classList.add("hidden");
  document.getElementById("history-section").classList.add("hidden");
  message.textContent = "";

  if (section === "add") {
    document.getElementById("add-section").classList.remove("hidden");
  } else if (section === "withdraw") {
    document.getElementById("withdraw-section").classList.remove("hidden");
  } else if (section === "history") {
    document.getElementById("history-section").classList.remove("hidden");
    renderHistory();
  }
}

function updateBalanceDisplay() {
  balanceDisplay.textContent = `$${balance}`;
}

function addMoney() {
  const amount = parseFloat(document.getElementById("add-amount").value);
  if (isNaN(amount) || amount <= 0) {
    message.textContent = "Please enter a valid positive amount.";
    return;
  }

  balance += amount;
  addTransaction("Add", amount);
  updateBalanceDisplay();
  document.getElementById("add-amount").value = "";
  message.textContent = "";
}

function withdrawMoney() {
  const amount = parseFloat(document.getElementById("withdraw-amount").value);
  if (isNaN(amount) || amount <= 0) {
    message.textContent = "Please enter a valid positive amount.";
    return;
  }

  if (amount > balance) {
    message.textContent = "Insufficient balance.";
    return;
  }

  balance -= amount;
  addTransaction("Withdraw", amount);
  updateBalanceDisplay();
  document.getElementById("withdraw-amount").value = "";
  message.textContent = "";
}

function addTransaction(type, amount) {
  const now = new Date();
  const timestamp = now.toLocaleString();
  transactions.unshift({ type, amount, timestamp, balanceAfter: balance });
}

function renderHistory() {
  transactionList.innerHTML = "";
  if (transactions.length === 0) {
    transactionList.innerHTML = "<li>No transactions yet.</li>";
    return;
  }

  transactions.forEach(tx => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${tx.type}</strong> - $${tx.amount} <br/>
      <span class="text-xs">${tx.timestamp}</span> <br/>
      <span class="text-xs text-green-700">Balance: $${tx.balanceAfter}</span>
    `;
    transactionList.appendChild(item);
  });
}
