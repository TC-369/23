
const estados = ["pendiente", "cursando", "aprobada"];
let malla = {};
let categorias = {};

// Cargar categorías y malla
fetch("categorias.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(cat => categorias[cat.id] = cat);
    loadMalla();
    renderMalla();
  });

function saveMalla() {
    localStorage.setItem("malla", JSON.stringify(malla));
}
function loadMalla() {
    const data = localStorage.getItem("malla");
    if (data) malla = JSON.parse(data);
    else {
        materias.forEach(m => {
            if (!malla[m.nivel]) malla[m.nivel] = [];
            malla[m.nivel].push({ ...m, estado: "pendiente" });
        });
    }
}
function getCategoriaSelect(subject) {
    let select = '<select onchange="setCategoria(' + subject.id + ', this.value)">';
    for (let id in categorias) {
        const selected = subject.categoria == id ? 'selected' : '';
        select += `<option value="${id}" ${selected}>${categorias[id].nombre}</option>`;
    }
    select += '</select>';
    return select;
}
function setCategoria(id, catId) {
    for (const nivel in malla) {
        const materia = malla[nivel].find(m => m.id == id);
        if (materia) {
            materia.categoria = parseInt(catId);
            saveMalla();
            renderMalla();
        }
    }
}
function createSubject(subject) {
    const div = document.createElement("div");
    div.className = `subject ${subject.estado}`;
    const color = categorias[subject.categoria]?.color || "#888";
    div.style.borderLeft = `8px solid ${color}`;
    div.innerHTML = `
        <div class="subject-name">${subject.nombre}</div>
        <div class="subject-actions">
            <button onclick="changeState(${subject.id})">🔄</button>
            <button onclick="toggleDetails(${subject.id})">🔽</button>
        </div>
        <div class="subject-details" id="details-${subject.id}">
            <p><strong>Cursada:</strong> ${subject.correlativasCursada.join(", ") || "Ninguna"}</p>
            <p><strong>Aprobada:</strong> ${subject.correlativasAprobada.join(", ") || "Ninguna"}</p>
            <p><strong>Categoría:</strong> ${getCategoriaSelect(subject)}</p>
        </div>
    `;
    div.onclick = (e) => e.stopPropagation();
    return div;
}
function renderMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";
    Object.keys(malla).sort((a, b) => a - b).forEach(nivel => {
        const col = document.createElement("div");
        col.className = "column";
        const title = document.createElement("div");
        title.className = "column-title";
        title.textContent = `Año ${nivel}`;
        col.appendChild(title);

        malla[nivel].forEach(subject => {
            const subj = createSubject(subject);
            col.appendChild(subj);
        });

        const addBtn = document.createElement("button");
        addBtn.textContent = "➕ Materia";
        addBtn.onclick = () => {
            const newId = Date.now();
            malla[nivel].push({
                id: newId,
                nombre: "Nueva Materia",
                nivel: parseInt(nivel),
                correlativasCursada: [],
                correlativasAprobada: [],
                estado: "pendiente",
                categoria: 1
            });
            saveMalla();
            renderMalla();
        };
        col.appendChild(addBtn);
        contenedor.appendChild(col);
    });
}
function changeState(id) {
    for (const nivel in malla) {
        const materia = malla[nivel].find(m => m.id === id);
        if (materia) {
            const idx = estados.indexOf(materia.estado);
            materia.estado = estados[(idx + 1) % estados.length];
            saveMalla();
            renderMalla();
            break;
        }
    }
}
function toggleDetails(id) {
    const el = document.getElementById(`details-${id}`);
    el.parentElement.classList.toggle("expanded");
}
function addYear() {
    const newNivel = Math.max(...Object.keys(malla).map(n => parseInt(n))) + 1;
    malla[newNivel] = [];
    saveMalla();
    renderMalla();
}
function resetMalla() {
    if (confirm("¿Seguro que querés borrar la malla y comenzar de cero?")) {
        localStorage.removeItem("malla");
        location.reload();
    }
}
