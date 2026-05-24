const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

async function loadModules() {
  try {
    const res = await fetch("/admin/modules");
    const modules = await res.json();
    const grid = document.getElementById("moduleGrid");
    const emptyState = document.getElementById("emptyState");
    const moduleCount = document.getElementById("module-count");

    if (!Array.isArray(modules) || modules.length === 0) {
      grid.innerHTML = "";
      moduleCount.textContent = "0 modul tersedia";
      emptyState.style.display = "grid";
      return;
    }

    moduleCount.textContent = `${modules.length} modul tersedia`;
    emptyState.style.display = "none";
    grid.innerHTML = modules
      .map((mod) => {
        const imageUrl =
          mod.image_url ||
          "https://via.placeholder.com/640x400.png?text=Modul+Literasi";
        const createdAt = mod.created_at
          ? new Date(mod.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "";
        return `
              <article class="module-card">
                <img class="module-card__media" src="${imageUrl}" alt="${mod.title}" />
                <div class="module-card__body">
                  <div>
                    <h3 class="module-card__title">${mod.title}</h3>
                    <p class="module-card__description">${mod.description}</p>
                  </div>
                  <div class="module-card__footer">
                    <span class="module-card__date">${createdAt}</span>
                    ${mod.module_url ? `<a href="${mod.module_url}" target="_blank" class="module-link">Buka Modul</a>` : '<span class="module-card__date">Tidak tersedia</span>'}
                  </div>
                </div>
              </article>
            `;
      })
      .join("");
  } catch (error) {
    console.error(error);
    document.getElementById("module-count").textContent = "Gagal memuat modul";
    document.getElementById("moduleGrid").innerHTML = "";
    document.getElementById("emptyState").style.display = "grid";
  }
}

loadModules();
