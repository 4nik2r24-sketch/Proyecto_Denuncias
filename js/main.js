import { guardarDenuncia } from './storage.js';

const formulario = document.getElementById('denunciaForm');
const lista = document.getElementById('listaDenuncias');

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    
    const campos = {

        tipo = document.getElementById('tipoDenuncia').value;
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        descripcion: document.getElementById('descripcion')
    };

   
    Object.values(campos).forEach(c => c.classList.remove('error'));

    
    let esValido = true;

    if (campos.tipo.value.length < 5) {
        campos.tipo.classList.add('error'); 
        esValido = false;
    }
    if (campos.nombre.value.length < 3) {
        campos.nombre.classList.add('error');
        esValido = false;
    }
    if (!campos.email.value.includes('@')) {
        campos.email.classList.add('error');
        esValido = false;
    }
    if (campos.descripcion.value.length < 10) {
        campos.descripcion.classList.add('error');
        esValido = false;
    }

    if (!esValido) {
        alert("Por favor, corrige los campos resaltados.");
        return;
    }

   
    guardarDenuncia({
        tipo: campos.tipo.value,
        nombre: campos.nombre.value,
        email: campos.email.value,
        descripcion: campos.descripcion.value
    });

    formulario.reset();
    renderizarDenuncias();
});

function renderizarDenuncias() {
    lista.innerHTML = '';
    const datos = JSON.parse(localStorage.getItem('denuncias') || '[]');
    datos.forEach(d => {
        const div = document.createElement('div'); 
        div.innerHTML = `<h3>${d.titulo}</h3><p>Denunciante: ${d.nombre}</p>`;
        lista.appendChild(div);
    });
}

renderizarDenuncias();