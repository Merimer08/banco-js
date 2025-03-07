(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();document.querySelector("#app").innerHTML=`
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
`;const E={owner:"Juan Sánchez",movements:[200,450,-400,3e3,-650,-130,70,1300],interestRate:1.2,pin:1111},x={owner:"María Portazgo",movements:[5e3,3400,-150,-790,-3210,-1e3,8500,-30],interestRate:1.5,pin:2222},O={owner:"Estefanía Pueyo",movements:[200,-200,340,-300,-20,50,400,-460],interestRate:.7,pin:3333},T={owner:"Javier Rodríguez",movements:[430,1e3,700,50,90],interestRate:1,pin:4444},l=[E,x,O,T],d=document.querySelector(".welcome");document.querySelector(".date");const C=document.querySelector(".balance__value"),I=document.querySelector(".summary__value--in"),N=document.querySelector(".summary__value--out");document.querySelector(".summary__value--interest");const P=document.querySelector(".timer"),_=document.querySelector(".app"),y=document.querySelector(".movements"),R=document.querySelector(".login__btn"),M=document.querySelector(".form__btn--transfer"),$=document.querySelector(".form__btn--loan"),U=document.querySelector(".form__btn--close"),D=document.querySelector(".btn--sort"),i=document.querySelector(".login__input--user"),m=document.querySelector(".login__input--pin"),b=document.querySelector(".form__input--to"),g=document.querySelector(".form__input--amount"),S=document.querySelector(".form__input--loan-amount"),L=document.querySelector(".form__input--user"),h=document.querySelector(".form__input--pin");let u,c,p=!1;const F=function(t){t.forEach(function(e){e.username=e.owner.toLowerCase().split(" ").map(n=>n[0]).join("")})};F(l);const q=function(){const t=function(){const n=String(Math.trunc(e/60)).padStart(2,0),o=String(e%60).padStart(2,0);P.textContent=`${n}:${o}`,e===0&&(clearInterval(c),d.textContent="Log in to get started",_.style.opacity=0),e--};let e=300;return t(),c=setInterval(t,1e3),c},f=function(){clearInterval(c),q()};R.addEventListener("click",function(t){t.preventDefault();const e=i.value,n=Number(m.value);u=l.find(o=>o.username===e),u&&u.pin===n?(i.value=m.value="",c&&clearInterval(c),q(),v(u)):console.log("login incorrecto")});const v=function(t){_.style.opacity=1,d.textContent=`Welcome back, ${t.owner.split(" ")[0]}`,w(t.movements),z(t.movements),B(t.movements)},w=function(t){y.innerHTML="",(p?t.slice().sort((n,o)=>n-o):t).forEach(function(n,o){const r=n>0?"deposit":"withdrawal",s=`
      <div class="movements__row">
        <div class="movements__type movements__type--${r}">${o+1} ${r}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${n.toFixed(2)}€</div>
      </div>
    `;y.insertAdjacentHTML("afterbegin",s)})},z=function(t){const e=t.reduce((n,o)=>n+o,0);C.textContent=`${e.toFixed(2)} €`},B=function(t){const e=t.filter(o=>o>0).reduce((o,r)=>o+r,0);I.textContent=`${e.toFixed(2)} €`;const n=t.filter(o=>o<0).reduce((o,r)=>o+r,0);N.textContent=`${n.toFixed(2)} €`},H=function(t,e){return t.some(n=>n>0&&n>=e*.1)};$.addEventListener("click",function(t){t.preventDefault(),f();const e=Number(S.value);if(e<=0){alert("Por favor, ingrese un monto válido mayor a 0");return}const n=l.find(o=>o.username===i.value);if(!n){alert("Error: No se encontró la cuenta");return}H(n.movements,e)?(n.movements.push(e),v(n),S.value="",alert("¡Préstamo aprobado!")):alert("Lo sentimos, necesita tener al menos un depósito que supere el 10% del monto solicitado")});M.addEventListener("click",function(t){t.preventDefault(),f();const e=Number(g.value),n=b.value;if(e<=0){alert("Por favor, ingrese un monto válido mayor a 0");return}const o=l.find(a=>a.username===i.value),r=l.find(a=>a.username===n);if(!o||!r){alert("Error: No se encontró la cuenta del destinatario");return}if(o.movements.reduce((a,A)=>a+A,0)<e){alert("Lo sentimos, no tiene suficiente saldo para realizar esta transferencia");return}o.movements.push(-e),r.movements.push(e),b.value="",g.value="",v(o),alert("Transferencia realizada con éxito")});U.addEventListener("click",function(t){t.preventDefault(),f();const e=L.value,n=Number(h.value);if(!l.find(s=>s.username===e&&s.pin===n)){alert("Error: Credenciales incorrectas");return}if(e!==i.value){alert("Error: Solo puede cerrar su propia cuenta");return}const r=l.findIndex(s=>s.username===e);l.splice(r,1),i.value="",m.value="",L.value="",h.value="",d.textContent="Log in to get started",_.style.opacity=0,alert("Cuenta cerrada con éxito. Ha sido desconectado.")});D.addEventListener("click",function(t){t.preventDefault(),p=!p,w(u.movements)});
