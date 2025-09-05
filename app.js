const form = document.getElementById("task-form");
const lista = document.getElementById("lista-tarefas");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const tarefa = {
    data: document.getElementById("data").value,
    atividade: document.getElementById("atividade").value,
    responsavel: document.getElementById("responsavel").value,
    status: document.getElementById("status").value,
    prioridade: document.getElementById("prioridade").value,
    observacoes: document.getElementById("observacoes").value,
    fotos: [...document.getElementById("fotos").files].map(file => URL.createObjectURL(file))
  };

  salvarTarefa(tarefa);
  exibirTarefa(tarefa);
  form.reset();
});

function salvarTarefa(tarefa) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
  tarefas.push(tarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function exibirTarefa(tarefa) {
  const div = document.createElement("div");
  div.className = "task-card";
  div.innerHTML = `
    <strong>${tarefa.data}</strong> - ${tarefa.atividade}<br>
    👷‍♂️ ${tarefa.responsavel} | 🚦 ${tarefa.status} | ⚠️ ${tarefa.prioridade}<br>
    📝 ${tarefa.observacoes}<br>
    ${tarefa.fotos.map(foto => `<img src="${foto}" width="100">`).join("")}
  `;
  lista.appendChild(div);
}

// Carrega tarefas salvas
JSON.parse(localStorage.getItem("tarefas") || "[]").forEach(exibirTarefa);
