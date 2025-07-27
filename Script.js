let multiplier = 1.00;
let interval;
let crashed = false;

const multiplierEl = document.getElementById('multiplier');
const statusEl = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const cashoutBtn = document.getElementById('cashout-btn');
const resultEl = document.getElementById('result');

function startGame() {
  multiplier = 1.00;
  crashed = false;
  resultEl.innerText = "";
  statusEl.innerText = "🚀 Chicken is flying...";
  startBtn.disabled = true;
  cashoutBtn.disabled = false;
  
  interval = setInterval(() => {
    multiplier += 0.05 + Math.random() * 0.1;
    multiplierEl.innerText = multiplier.toFixed(2) + 'x';
    
    if (Math.random() < 0.01 * multiplier) {
      crash();
    }
  }, 100);
}

function crash() {
  clearInterval(interval);
  crashed = true;
  cashoutBtn.disabled = true;
  statusEl.innerText = "💥 Chicken crashed!";
  resultEl.innerText = "You lost!";
  startBtn.disabled = false;
}

function cashOut() {
  if (!crashed) {
    clearInterval(interval);
    cashoutBtn.disabled = true;
    statusEl.innerText = "✅ Cashed out at " + multiplier.toFixed(2) + "x!";
    resultEl.innerText = "You win " + multiplier.toFixed(2) + "x your bet!";
    startBtn.disabled = false;

    // You can call your Telegram bot backend here to give points/tickets
    // Example:
    // Telegram.WebApp.sendData(JSON.stringify({cashout: multiplier}));
  }
}

startBtn.onclick = startGame;
cashoutBtn.onclick = cashOut;