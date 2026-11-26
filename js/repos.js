// Carga los repositorios públicos de GitHub y los pinta como tarjetas.
// Los privados no aparecen: la API sin autenticar solo devuelve los públicos.
(async function () {
  const USUARIO = "chachiwachi";
  const OCULTOS = ["SobreMi"]; // repos que no quiero listar
  const caja = document.getElementById("repos");

  try {
    const r = await fetch(`https://api.github.com/users/${USUARIO}/repos?per_page=100&sort=updated`);
    if (!r.ok) return; // nos quedamos con la tarjeta de reserva del HTML
    const repos = (await r.json())
      .filter(x => !x.fork && !x.archived && !OCULTOS.includes(x.name));
    if (!repos.length) return;

    caja.replaceChildren(...repos.map(tarjeta));
  } catch (e) {
    // sin red o límite de la API: se deja el contenido estático
  }

  function tarjeta(repo) {
    const art = document.createElement("article");
    art.className = "tarjeta";

    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    a.href = repo.html_url;
    a.textContent = repo.name;
    h3.append(a);

    const p = document.createElement("p");
    p.textContent = repo.description || "Sin descripción.";

    const etiquetas = document.createElement("p");
    etiquetas.className = "etiquetas";
    for (const t of [repo.language, ...(repo.topics || []).slice(0, 3)]) {
      if (!t) continue;
      const s = document.createElement("span");
      s.textContent = t;
      etiquetas.append(s);
    }
    if (repo.stargazers_count) {
      const s = document.createElement("span");
      s.textContent = `★ ${repo.stargazers_count}`;
      etiquetas.append(s);
    }

    art.append(h3, p, etiquetas);
    return art;
  }
})();
