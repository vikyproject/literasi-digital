const userData = document.getElementById("userData");
const userMessage = document.getElementById("userMessage");
const moduleCards = document.getElementById("moduleCards");
const moduleMessage = document.getElementById("moduleMessage");

function getToken() {
  return localStorage.getItem("token");
}

async function ensureAdminAccess() {
  const token = getToken();
  if (!token) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return false;
  }

  const res = await fetch("/auth/me", {
    headers: { Authorization: token },
  });

  if (!res.ok) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return false;
  }

  const data = await res.json();
  if (data.role !== "admin") {
    window.location.href = "menu.html";
    return false;
  }

  return true;
}

async function loadUsers() {
  try {
    const res = await fetch("/admin/users", {
      headers: { Authorization: getToken() },
    });
    const data = await res.json();
    userData.innerHTML = data
      .map(
        (user) => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.username}</td>
                  <td>
                    <select class="role-select" data-id="${user.id}">
                      <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
                      <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" class="control-button" data-action="update" data-id="${user.id}">Ubah Role</button>
                    <button type="button" class="control-button delete-button" data-action="delete" data-id="${user.id}">Hapus</button>
                  </td>
                </tr>
              `,
      )
      .join("");

    document.querySelectorAll(".control-button").forEach((button) => {
      button.addEventListener("click", handleUserAction);
    });
  } catch (error) {
    userMessage.textContent = "Gagal memuat data pengguna.";
  }
}

let popupConfirmCallback = null;

const popupDialog = document.getElementById("popupDialog");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupConfirm = document.getElementById("popupConfirm");
const popupCancel = document.getElementById("popupCancel");
const popupClose = document.getElementById("popupClose");

function showPopup(title, message, confirmLabel, onConfirm) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popupConfirm.textContent = confirmLabel;
  popupConfirmCallback = onConfirm;
  popupDialog.classList.remove("hidden");
  popupDialog.setAttribute("aria-hidden", "false");
}

function hidePopup() {
  popupDialog.classList.add("hidden");
  popupDialog.setAttribute("aria-hidden", "true");
  popupConfirmCallback = null;
}

popupConfirm.addEventListener("click", async () => {
  if (typeof popupConfirmCallback === "function") {
    await popupConfirmCallback();
  }
  hidePopup();
});

popupCancel.addEventListener("click", hidePopup);
popupClose.addEventListener("click", hidePopup);

async function handleUserAction(event) {
  const button = event.currentTarget;
  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "update") {
    const roleSelect = document.querySelector(`select[data-id='${id}']`);
    const role = roleSelect.value;
    showPopup(
      "Konfirmasi Ubah Role",
      `Anda akan mengubah role pengguna ini menjadi ${role.toUpperCase()}. Lanjutkan?`,
      "Ubah Role",
      async () => {
        const response = await fetch(`/admin/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
          body: JSON.stringify({ role }),
        });
        const result = await response.json();
        userMessage.textContent = result.success
          ? "Role pengguna berhasil diperbarui."
          : result.error || "Gagal memperbarui role.";
        await loadUsers();
      },
    );
    return;
  }

  if (action === "delete") {
    showPopup(
      "Konfirmasi Hapus Pengguna",
      "Hapus pengguna ini? Tindakan tidak dapat dikembalikan.",
      "Hapus",
      async () => {
        const response = await fetch(`/admin/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: getToken() },
        });
        const result = await response.json();
        userMessage.textContent = result.success
          ? "Pengguna berhasil dihapus."
          : result.error || "Gagal menghapus pengguna.";
        await loadUsers();
      },
    );
  }
}

async function loadModules() {
  try {
    const res = await fetch("/admin/modules", {
      headers: { Authorization: getToken() },
    });
    const data = await res.json();
    moduleCards.innerHTML = data
      .map(
        (mod) => `
                <div class="module-card">
                  <h3>${mod.title}</h3>
                  <p>${mod.description}</p>
                  <div class="module-card-footer">
                    <span>${new Date(mod.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                    ${mod.module_url ? `<a href="${mod.module_url}" target="_blank">Buka Modul</a>` : "<span>Tanpa tautan</span>"}
                  </div>
                </div>
              `,
      )
      .join("");
  } catch (error) {
    moduleCards.innerHTML = "<p class='message'>Gagal memuat modul.</p>";
  }
}

function activateTab(tabId) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});

document
  .getElementById("moduleForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    moduleMessage.textContent = "";

    const title = document.getElementById("moduleTitle").value.trim();
    const description = document
      .getElementById("moduleDescription")
      .value.trim();
    const image_url = document.getElementById("moduleImage").value.trim();
    const module_url = document.getElementById("moduleUrl").value.trim();

    if (!title || !description) {
      moduleMessage.textContent = "Judul dan deskripsi wajib diisi.";
      return;
    }

    try {
      const response = await fetch("/admin/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify({
          title,
          description,
          image_url,
          module_url,
        }),
      });
      const result = await response.json();
      if (result.success) {
        moduleMessage.textContent = "Modul berhasil ditambahkan.";
        document.getElementById("moduleForm").reset();
        await loadModules();
      } else {
        moduleMessage.textContent = result.error || "Gagal menambahkan modul.";
      }
    } catch (error) {
      moduleMessage.textContent = "Terjadi kesalahan saat menambahkan modul.";
    }
  });

const logoutButton = document.getElementById("logoutButton");
const logoutOverlay = document.getElementById("logoutOverlay");

function animateLogout() {
  logoutOverlay.classList.add("visible");
  document.body.classList.add("fade-out");
  logoutButton.disabled = true;
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }, 450);
}

logoutButton.addEventListener("click", animateLogout);

(async () => {
  if (await ensureAdminAccess()) {
    await loadUsers();
    await loadModules();
  }
})();
