import "./style.css";
document.querySelector("#app").innerHTML = `
    <nav>
      <p class="welcome">Log in to get started</p>
      <img src="logo.png" alt="Logo" class="logo" />
      <form class="login" >
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
        />
        <!-- In practice, use type="password" -->
        <input
          type="text"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>
    <main class="app">
      <!-- BALANCE -->
      <div class="balance">
        <div>
          <p class="balance__label">Current balance</p>
          <p class="balance__date">
            As of <span class="date">05/03/2037</span>
          </p>
        </div>
        <p class="balance__value">0000€</p>
      </div>
      <!-- MOVEMENTS -->
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000€</div>
        </div>
        <div class="movements__row">
          <div class="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">-378€</div>
        </div>
      </div>
      <!-- SUMMARY -->
      <div class="summary">
        <p class="summary__label">In</p>
        <p class="summary__value summary__value--in">0000€</p>
        <p class="summary__label">Out</p>
        <p class="summary__value summary__value--out">0000€</p>
        <p class="summary__label">Interest</p>
        <p class="summary__value summary__value--interest">0000€</p>
        <button class="btn--sort">&downarrow; SORT</button>
      </div>
      <!-- OPERATION: TRANSFERS -->
      <div class="operation operation--transfer">
        <h2>Transfer money</h2>
        <form class="form form--transfer">
          <input type="text" class="form__input form__input--to" />
          <input type="number" class="form__input form__input--amount" />
          <button class="form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div>
      <!-- OPERATION: LOAN -->
      <div class="operation operation--loan">
        <h2>Request loan</h2>
        <form class="form form--loan">
          <input type="number" class="form__input form__input--loan-amount" />
          <button class="form__btn form__btn--loan">&rarr;</button>
          <label class="form__label form__label--loan">Amount</label>
        </form>
      </div>
      <!-- OPERATION: CLOSE -->
      <div class="operation operation--close">
        <h2>Close account</h2>
        <form class="form form--close">
          <input type="text" class="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
          />
          <button class="form__btn form__btn--close">&rarr;</button>
          <label class="form__label">Confirm user</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div>
      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
    </main>
`;
// Data
const account1 = {
  owner: "Juan Sánchez",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: "María Portazgo",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Estefanía Pueyo",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Javier Rodríguez",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
// Variables para el temporizador de cierre de sesión
let currentAccount, timer;
// Variables para el estado de ordenamiento
let sorted = false;

// creamos el campo username para todas las cuentas de usuarios
// usamos forEach para modificar el array original, en otro caso map
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner // Juan Sanchez
      .toLowerCase() //  juan sanchez
      .split(" ") // ['juan', 'sanchez']
      .map((name) => name[0]) // ['j', 's']
      .join(""); // js
  });
};
createUsernames(accounts);

// Función para iniciar el temporizador de cierre de sesión
const startLogoutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    
    // En cada tick, actualizar el temporizador en la UI
    labelTimer.textContent = `${min}:${sec}`;
    
    // Cuando llegue a 0, cerrar sesión
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    
    // Decrementar el tiempo
    time--;
  };
  
  // Establecer tiempo a 5 minutos
  let time = 300;
  
  // Llamar al tick cada segundo
  tick();
  timer = setInterval(tick, 1000);
  
  return timer;
};

// Función para resetear el temporizador
const resetLogoutTimer = function() {
  clearInterval(timer);
  startLogoutTimer();
};

// Modificar el event listener de login para incluir el temporizador
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  
  const inputUsername = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);
  currentAccount = accounts.find(
    (account) => account.username === inputUsername
  );

  if (currentAccount && currentAccount.pin === inputPin) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    
    // Limpiar formulario
    inputLoginUsername.value = inputLoginPin.value = "";
    
    // Iniciar el temporizador de cierre de sesión
    if (timer) clearInterval(timer);
    startLogoutTimer();
    
    // Cargar los datos
    updateUI(currentAccount);
  } else {
    console.log("login incorrecto");
  }
});

const updateUI = function ({ movements }) {
  // const {movements} = account.movements
  // mostrar los movimientos de la cuenta
  displayMovements(movements);
  // mostrar el balance de la cuenta
  displayBalance(movements);
  // mostrar el total de los movimientos de la cuenta
  // ingresos y gastos
  displaySummary(movements);
};

// Función para mostrar los movimientos
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  
  const movs = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  
  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;
    
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (movements) {
  // calculamos suma de ingresos y retiradas de efectivo
  const balance = movements.reduce((total, movement) => total + movement, 0);
  // actualizamos el DOM:
  labelBalance.textContent = `${balance.toFixed(2)} €`;
};
const displaySummary = function (movements) {
  const sumIn = movements
    .filter((movement) => movement > 0)
    .reduce((total, movement) => total + movement, 0);
  labelSumIn.textContent = `${sumIn.toFixed(2)} €`;
  const sumOut = movements
    .filter((movement) => movement < 0)
    .reduce((total, movement) => total + movement, 0);
  labelSumOut.textContent = `${sumOut.toFixed(2)} €`;
};

// Función para validar si hay un depósito que supere el 10% del monto solicitado
const hasValidDeposit = function(movements, loanAmount) {
  return movements.some(movement => 
    movement > 0 && movement >= loanAmount * 0.1
  );
};

// Event listener para el botón de préstamo
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  resetLogoutTimer();
  
  const loanAmount = Number(inputLoanAmount.value);
  
  // Validar que el monto sea positivo
  if (loanAmount <= 0) {
    alert('Por favor, ingrese un monto válido mayor a 0');
    return;
  }

  // Obtener la cuenta actual
  const currentAccount = accounts.find(acc => 
    acc.username === inputLoginUsername.value
  );

  if (!currentAccount) {
    alert('Error: No se encontró la cuenta');
    return;
  }

  // Verificar si hay un depósito válido
  if (hasValidDeposit(currentAccount.movements, loanAmount)) {
    // Agregar el préstamo a los movimientos
    currentAccount.movements.push(loanAmount);
    
    // Actualizar la interfaz
    updateUI(currentAccount);
    
    // Limpiar el formulario
    inputLoanAmount.value = '';
    
    alert('¡Préstamo aprobado!');
  } else {
    alert('Lo sentimos, necesita tener al menos un depósito que supere el 10% del monto solicitado');
  }
});

// Event listener para el botón de transferencia
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  resetLogoutTimer();
  
  const amount = Number(inputTransferAmount.value);
  const recipientUsername = inputTransferTo.value;
  
  // Validar que el monto sea positivo
  if (amount <= 0) {
    alert('Por favor, ingrese un monto válido mayor a 0');
    return;
  }

  // Obtener las cuentas
  const currentAccount = accounts.find(acc => 
    acc.username === inputLoginUsername.value
  );
  const recipientAccount = accounts.find(acc => 
    acc.username === recipientUsername
  );

  if (!currentAccount || !recipientAccount) {
    alert('Error: No se encontró la cuenta del destinatario');
    return;
  }

  // Verificar que haya suficiente saldo
  const currentBalance = currentAccount.movements.reduce((total, movement) => total + movement, 0);
  if (currentBalance < amount) {
    alert('Lo sentimos, no tiene suficiente saldo para realizar esta transferencia');
    return;
  }

  // Realizar la transferencia
  currentAccount.movements.push(-amount);
  recipientAccount.movements.push(amount);
  
  // Limpiar el formulario
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  
  // Actualizar la interfaz
  updateUI(currentAccount);
  
  alert('Transferencia realizada con éxito');
});

// Event listener para el botón de cerrar cuenta
btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  resetLogoutTimer();
  
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  
  // Obtener la cuenta actual
  const currentAccount = accounts.find(acc => 
    acc.username === username && acc.pin === pin
  );

  if (!currentAccount) {
    alert('Error: Credenciales incorrectas');
    return;
  }

  // Verificar que no se esté intentando cerrar la cuenta de otro usuario
  if (username !== inputLoginUsername.value) {
    alert('Error: Solo puede cerrar su propia cuenta');
    return;
  }

  // Eliminar la cuenta del array de cuentas
  const accountIndex = accounts.findIndex(acc => acc.username === username);
  accounts.splice(accountIndex, 1);
  
  // Limpiar los campos de login
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  
  // Limpiar el formulario de cierre
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  
  // Resetear el mensaje de bienvenida
  labelWelcome.textContent = 'Log in to get started';
  
  // Ocultar la interfaz
  containerApp.style.opacity = 0;
  
  alert('Cuenta cerrada con éxito. Ha sido desconectado.');
});

// Event listener para el botón de ordenamiento
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements);
});