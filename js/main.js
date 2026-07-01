// Importamos la función de guardado que creamos en storage.js
import { guardarDenuncia } from './storage.js';

const formulario = document.getElementById('denunciaForm');
const lista = document.getElementById('listaDenuncias');

// Evento: Subida de formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Regla: Prevención de envío

    // Obtener valores
    const nuevaDenuncia = {
        titulo: document.getElementById('titulo').value,
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        descripcion: document.getElementById('descripcion').value
    };

    // Validaciones básicas (min 5 reglas)[cite: 1, 2]
    if (nuevaDenuncia.titulo.length < 5) {
        alert("El título es muy corto.");
        return;
    }

    // Guardar
    guardarDenuncia(nuevaDenuncia);
    
    // Limpiar formulario y actualizar vista
    formulario.reset();
    renderizarDenuncias();
});

// Función para mostrar denuncias (Manipulación del DOM)[cite: 1, 2]
function renderizarDenuncias() {
    lista.innerHTML = ''; 
    const datos = JSON.parse(localStorage.getItem('denuncias') || '[]');
    
    datos.forEach(d => {
        const div = document.createElement('div'); // Generación dinámica[cite: 1, 2]
        div.innerHTML = `<h3>${d.titulo}</h3><p>Denunciante: ${d.nombre}</p>`;
        lista.appendChild(div);
    });
}

// Cargar denuncias al iniciar la página
renderizarDenuncias();