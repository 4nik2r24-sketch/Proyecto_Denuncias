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

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const campos = {
        tipo: document.getElementById('tipoDenuncia'),
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        descripcion: document.getElementById('descripcion')
    };

    let esValido = true;
    if (campos.tipo.value === "") { gestionarError('tipoDenuncia', "Seleccione una opción."); esValido = false; }
    else { gestionarError('tipoDenuncia', null); }

    if (campos.nombre.value.length < 3) { gestionarError('nombre', "Mínimo 3 letras."); esValido = false; }
    else { gestionarError('nombre', null); }

    if (!campos.email.value.includes('@')) { gestionarError('email', "Correo inválido."); esValido = false; }
    else { gestionarError('email', null); }

    if (campos.descripcion.value.length < 10) { gestionarError('descripcion', "Mínimo 10 caracteres."); esValido = false; }
    else { gestionarError('descripcion', null); }

    if (esValido) {
        guardarDenuncia({ tipo: campos.tipo.value, nombre: campos.nombre.value, email: campos.email.value, descripcion: campos.descripcion.value });
        formulario.reset();
        Object.values(campos).forEach(c => c.classList.remove('valido'));
    
        msgExito.classList.remove('oculto');
        setTimeout(() => msgExito.classList.add('oculto'), 3000);
        
        renderizarDenuncias();
    }
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
    const user = document.getElementById('username').value;
    if (user.length >= 3) { localStorage.setItem('currentUser', user); location.reload(); }
    else alert("Usuario muy corto.");
};
document.getElementById('btnLogout').onclick = () => { localStorage.removeItem('currentUser'); location.reload(); };
window.onload = () => { if (localStorage.getItem('currentUser')) { loginSection.style.display = 'none'; appSection.style.display = 'block'; renderizarDenuncias(); } };