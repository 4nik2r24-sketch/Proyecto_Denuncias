import { guardarDenuncia } from './storage.js';

const loginSection = document.getElementById('loginSection');
const appSection = document.getElementById('appSection');
const formulario = document.getElementById('denunciaForm');
const lista = document.getElementById('listaDenuncias');
const msgExito = document.getElementById('mensajeExito');

const gestionarError = (campoId, mensaje) => {
    const errorSpan = document.getElementById(`error-${campoId}`);
    const input = document.getElementById(campoId);
    if (mensaje) {
        input.classList.add('error'); input.classList.remove('valido');
        errorSpan.textContent = mensaje;
    } else {
        input.classList.remove('error'); input.classList.add('valido');
        errorSpan.textContent = '';
    }
};

['tipoDenuncia', 'nombre', 'email', 'descripcion'].forEach(id => {
    document.getElementById(id).addEventListener('blur', (e) => {
        const val = e.target.value;
        if (id === 'tipoDenuncia' && val === "") gestionarError(id, "Debe seleccionar un tipo.");
        else if (id === 'nombre' && val.length < 3) gestionarError(id, "Mínimo 3 caracteres.");
        else if (id === 'email' && (!val.includes('@') || val.length < 5)) gestionarError(id, "Correo inválido.");
        else if (id === 'descripcion' && val.length < 10) gestionarError(id, "Mínimo 10 caracteres.");
        else gestionarError(id, null);
    });
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const campos = { tipo: document.getElementById('tipoDenuncia'), nombre: document.getElementById('nombre'), email: document.getElementById('email'), descripcion: document.getElementById('descripcion') };
    
    if (campos.tipo.value && campos.nombre.value.length >= 3 && campos.email.value.includes('@') && campos.descripcion.value.length >= 10) {
        guardarDenuncia({ tipo: campos.tipo.value, nombre: campos.nombre.value, email: campos.email.value, descripcion: campos.descripcion.value });
        formulario.reset();
        Object.values(campos).forEach(c => c.classList.remove('valido'));
        msgExito.classList.remove('oculto');
        setTimeout(() => msgExito.classList.add('oculto'), 3000);
        renderizarDenuncias();
    } else { alert("Por favor, complete todos los campos correctamente."); }
});

function renderizarDenuncias() {
    const datos = JSON.parse(localStorage.getItem('denuncias') || '[]');
    lista.innerHTML = '<h2>Denuncias registradas:</h2>';
    datos.forEach((d, index) => {
        const div = document.createElement('div');
        div.className = 'tarjeta-denuncia';
        div.innerHTML = `<strong>${d.tipo}</strong> - ${d.nombre}<p>${d.descripcion}</p>
                         <button class="btn-eliminar" data-index="${index}">Eliminar</button>`;
        lista.appendChild(div);
    });
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.onclick = () => {
            datos.splice(btn.getAttribute('data-index'), 1);
            localStorage.setItem('denuncias', JSON.stringify(datos));
            renderizarDenuncias();
        };
    });
}

document.getElementById('btnLogin').onclick = () => {
    if (document.getElementById('username').value.length >= 3) { localStorage.setItem('currentUser', document.getElementById('username').value); location.reload(); }
    else alert("Usuario muy corto.");
};
document.getElementById('btnLogout').onclick = () => { localStorage.removeItem('currentUser'); location.reload(); };
window.onload = () => { if (localStorage.getItem('currentUser')) { loginSection.style.display = 'none'; appSection.style.display = 'block'; renderizarDenuncias(); } };