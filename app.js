// --- GUARDAR Y CARGAR DESDE LOCALSTORAGE ---
function guardarEstado() {
  localStorage.setItem('malla_materias', JSON.stringify(materias));
  localStorage.setItem('malla_titulo', document.getElementById('titulo-malla').textContent);
  localStorage.setItem('malla_bg_url', document.body.style.backgroundImage);
}
function cargarEstado() {
  let mallas = localStorage.getItem('malla_materias');
  if (mallas) {
    materias = JSON.parse(mallas);
  }
  let titulo = localStorage.getItem('malla_titulo');
  if (titulo) {
    document.getElementById('titulo-malla').textContent = titulo;
  }
  let fondo = localStorage.getItem('malla_bg_url');
  if (fondo) {
    document.body.style.backgroundImage = fondo;
  }
  renderMalla();
}

// Cada vez que cambies algo, llama guardarEstado()
function guardarYActualizar() {
  guardarEstado();
  renderMalla();
}

// Ejemplo: llama guardarYActualizar() después de editar, agregar o borrar materia/título/fondo
