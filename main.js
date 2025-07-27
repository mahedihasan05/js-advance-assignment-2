 let balance = 0;
    const transactions = [];

    function updateBalance() {
      document.getElementById("balance").textContent = `৳${balance}`;
    }

    function addMoney() {
      const amt = parseFloat(document.getElementById("addAmount").value);
      if (isNaN(amt) || amt <= 0) {
        return alert("Please enter a valid positive number.");
      }
      balance += amt;
      logTransaction("Add", amt);
      updateBalance();
      document.getElementById("addAmount").value = "";
    }

    function withdrawMoney() {
      const amt = parseFloat(document.getElementById("withdrawAmount").value);
      if (isNaN(amt) || amt <= 0) {
        return alert("Please enter a valid positive number.");
      }
      if (amt > balance) {
        return alert("Insufficient balance.");
      }
      balance -= amt;
      logTransaction("Withdraw", amt);
      updateBalance();
      document.getElementById("withdrawAmount").value = "";
    }

    function logTransaction(type, amount) {
      const now = new Date().toLocaleString();
      transactions.push({ date: now, type, amount, balance });
    }

    function showHistory() {
      const list = document.getElementById("transactionList");
      list.innerHTML = "";
      transactions.forEach(tx => {
        const li = document.createElement("li");
        li.textContent = 
          `${tx.date} – ${tx.type} ৳${tx.amount} → Balance: ৳${tx.balance}`;
        list.appendChild(li);
      });
      document.getElementById("history").classList.remove("hidden");
    }

    // Hook up buttons once DOM is ready
    document.getElementById("addBtn")
            .addEventListener("click", addMoney);
    document.getElementById("withdrawBtn")
            .addEventListener("click", withdrawMoney);
    document.getElementById("historyBtn")
            .addEventListener("click", showHistory);

    // Initialize
    updateBalance();