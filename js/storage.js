export const guardarDenuncia = (denuncia) => {
    let denuncias = JSON.parse(localStorage.getItem('denuncias') || '[]');
    denuncias.push(denuncia);
    localStorage.setItem('denuncias', JSON.stringify(denuncias));
};