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
function guardarMateria(e){
  e.preventDefault();
  // ... (tu código de guardar)
  cerrarMateriaEditor();
  guardarYActualizar();
}
function aplicarFondo() {
  let url = document.getElementById('bg-url').value.trim();
  let file = document.getElementById('bg-file').files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
      localStorage.setItem('malla_bg_url', `url('${e.target.result}')`);
    };
    reader.readAsDataURL(file);
  } else if (url) {
    document.body.style.backgroundImage = `url('${url}')`;
    localStorage.setItem('malla_bg_url', `url('${url}')`);
  }
}
function quitarFondo() {
  document.body.style.backgroundImage = '';
  document.getElementById('bg-url').value = '';
  document.getElementById('bg-file').value = '';
  localStorage.removeItem('malla_bg_url');
}
