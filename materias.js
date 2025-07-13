
const materias = [
  {
    id: 1,
    nombre: "Informática I",
    nivel: 1,
    correlativasCursada: [],
    correlativasAprobada: [],
    categoria: 1
  },
  {
    id: 2,
    nombre: "Álgebra",
    nivel: 1,
    correlativasCursada: [],
    correlativasAprobada: [],
    categoria: 1
  },
  {
    id: 8,
    nombre: "Informática II",
    nivel: 2,
    correlativasCursada: [1],
    correlativasAprobada: [2],
    categoria: 1
  }
];
// TITULO editable
function editarTitulo() {
  document.getElementById('titulo-malla').style.display = 'none';
  var input = document.getElementById('titulo-input');
  input.value = document.getElementById('titulo-malla').textContent;
  input.style.display = '';
  input.focus();
}
document.getElementById('titulo-input').addEventListener('blur', function() {
  document.getElementById('titulo-malla').textContent = this.value || "Malla Curricular";
  this.style.display = 'none';
  document.getElementById('titulo-malla').style.display = '';
});
document.getElementById('titulo-input').addEventListener('keydown', function(e){
  if(e.key==="Enter"||e.key==="Escape") this.blur();
});

// FONDO: URL o archivo
function aplicarFondo() {
  let url = document.getElementById('bg-url').value.trim();
  let file = document.getElementById('bg-file').files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  } else if (url) {
    document.body.style.backgroundImage = `url('${url}')`;
  }
}
function quitarFondo() {
  document.body.style.backgroundImage = '';
  document.getElementById('bg-url').value = '';
  document.getElementById('bg-file').value = '';
}
