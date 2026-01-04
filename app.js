// let folders = JSON.parse(localStorage.getItem("folders")) || [];
// let currentFolder = null;

// const fileManagerBtn = document.getElementById("fileManagerBtn");
// const createFolderBtn = document.getElementById("createFolderBtn");
// const createSection = document.getElementById("createFolderSection");
// const fileManagerSection = document.getElementById("fileManagerSection");
// const insideFolderSection = document.getElementById("insideFolderSection");

// const folderInput = document.getElementById("folderNameInput");
// const saveFolderBtn = document.getElementById("saveFolderBtn");
// const foldersList = document.getElementById("foldersList");
// const searchInput = document.getElementById("searchInput");

// const fileSearchInput = document.getElementById("fileSearchInput");


// const insideFolderTitle = document.getElementById("insideFolderTitle");
// const folderPath = document.getElementById("folderPath");
// const filesList = document.getElementById("filesList");
// const uploadBtn = document.getElementById("uploadBtn");
// const fileInput = document.getElementById("fileInput");
// const uploadBox = document.getElementById("uploadBox");

// function formatDate() {
//   const d = new Date();
//   return (
//     d.toLocaleDateString() +
//     " " +
//     d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//   );
// }

// /* Navigation */
// fileManagerBtn.onclick = () => {
//   createSection.style.display = "none";
//   insideFolderSection.style.display = "none";
//   fileManagerSection.style.display = "block";
//   renderFolders();
// };

// createFolderBtn.onclick = () => {
//   fileManagerSection.style.display = "none";
//   insideFolderSection.style.display = "none";
//   createSection.style.display = "block";
// };

// /* Create Folder */
// saveFolderBtn.onclick = () => {
//   const name = folderInput.value.trim();
//   if (!name) return alert("Folder name required");
//   if (folders.some(f => f.name === name)) return alert("Folder already exists");

//   folders.push({
//     name,
//     created: formatDate(),
//     files: []
//   });

//   localStorage.setItem("folders", JSON.stringify(folders));
//   folderInput.value = "";
//   fileManagerBtn.click();
// };

// /* Render Folders */
// function renderFolders(list = folders) {
//   foldersList.innerHTML = "";

//   if (!list.length) {
//     foldersList.innerHTML = `<div class="empty-state">No folders</div>`;
//     return;
//   }

//   list.forEach(folder => {
//     const card = document.createElement("div");
//     card.className = "folder-card";
//     card.innerHTML = `
//       <div class="folder-left">
//         <img class="folder-icon" src="https://cdn-icons-png.flaticon.com/512/716/716784.png">
//         <div class="folder-info">
//           <div class="folder-name">${folder.name}</div>
//           <div class="folder-date">${folder.created}</div>
//         </div>
//       </div>
//       <button class="delete-btn">Delete</button>
//     `;

//     card.querySelector(".folder-left").onclick = () => openFolder(folder);
//     card.querySelector(".delete-btn").onclick = () => {
//       if (confirm("Delete folder?")) {
//         folders = folders.filter(f => f !== folder);
//         localStorage.setItem("folders", JSON.stringify(folders));
//         renderFolders();
//         if (fileSearchInput) fileSearchInput.value = "";

//       }
//     };

//     foldersList.appendChild(card);
//   });
// }

// /* Search */
// searchInput.oninput = e => {
//   const val = e.target.value.toLowerCase();
//   renderFolders(folders.filter(f => f.name.toLowerCase().includes(val)));
// };

// /* Open Folder */
// function openFolder(folder) {
//   currentFolder = folder;
//   fileManagerSection.style.display = "none";
//   createSection.style.display = "none";
//   insideFolderSection.style.display = "block";

//   insideFolderTitle.textContent = folder.name;
//   folderPath.textContent = `File Manager / ${folder.name}`;
//   renderFiles();
// }

// /* Upload (Button) */
// uploadBtn.onclick = () => fileInput.click();

// fileInput.onchange = () => {
//   handleFile(fileInput.files[0]);
// };

// /* ✅ DRAG & DROP (ADDED BACK — NOTHING ELSE TOUCHED) */
// uploadBox.addEventListener("dragover", e => {
//   e.preventDefault();
//   uploadBox.classList.add("dragover");
// });

// uploadBox.addEventListener("dragleave", () => {
//   uploadBox.classList.remove("dragover");
// });

// uploadBox.addEventListener("drop", e => {
//   e.preventDefault();
//   uploadBox.classList.remove("dragover");
//   handleFile(e.dataTransfer.files[0]);
// });

// function handleFile(file) {
//   if (!file || !file.name.endsWith(".zip")) {
//     alert("ZIP files only");
//     return;
//   }

//   if (currentFolder.files.some(f => f.name === file.name)) {
//     alert("Duplicate file not allowed");
//     return;
//   }

//   currentFolder.files.push({
//     name: file.name,
//     size: (file.size / 1024).toFixed(2) + " KB",
//     created: formatDate(),
//     blob: URL.createObjectURL(file)
//   });

//   localStorage.setItem("folders", JSON.stringify(folders));
//   renderFiles();
// }

// /* Render Files */
// function renderFiles() {
//   filesList.innerHTML = "";

//   if (!currentFolder.files.length) {
//     filesList.innerHTML = `<div class="empty-state">No files</div>`;
//     return;
//   }

//   currentFolder.files.forEach(file => {
//     const div = document.createElement("div");
//     div.className = "file-card";
//     div.innerHTML = `
//       <div>
//         <div class="file-name">${file.name}</div>
//         <div class="folder-date">${file.created} • ${file.size}</div>
//       </div>
//       <div class="file-actions">
//         <button class="download-btn">⬇ Download</button>
//         <button class="delete-btn">🗑 Delete</button>
//       </div>
//     `;

//     div.querySelector(".download-btn").onclick = () => {
//       const a = document.createElement("a");
//       a.href = file.blob;
//       a.download = file.name;
//       a.click();
//     };

//     div.querySelector(".delete-btn").onclick = () => {
//       if (confirm("Delete file?")) {
//         currentFolder.files = currentFolder.files.filter(f => f !== file);
//         localStorage.setItem("folders", JSON.stringify(folders));
//         renderFiles();
//       }
//     };

//     filesList.appendChild(div);
//   });
// }

// /* Init */
// renderFolders();


// /* File Search */
// if (fileSearchInput) {
//   fileSearchInput.oninput = e => {
//     const val = e.target.value.toLowerCase();
//     const filteredFiles = currentFolder.files.filter(f =>
//       f.name.toLowerCase().includes(val)
//     );
//     renderFilteredFiles(filteredFiles);
//   };
// }


// function renderFilteredFiles(list) {
//   filesList.innerHTML = "";

//   if (!list.length) {
//     filesList.innerHTML = `<div class="empty-state">No matching files</div>`;
//     return;
//   }

//   list.forEach(file => {
//     const div = document.createElement("div");
//     div.className = "file-card";
//     div.innerHTML = `
//       <div>
//         <div class="file-name">${file.name}</div>
//         <div class="folder-date">${file.created} • ${file.size}</div>
//       </div>
//       <div class="file-actions">
//         <button class="download-btn">⬇ Download</button>
//         <button class="delete-btn">🗑 Delete</button>
//       </div>
//     `;

//     div.querySelector(".download-btn").onclick = () => {
//       const a = document.createElement("a");
//       a.href = file.blob;
//       a.download = file.name;
//       a.click();
//     };

//     div.querySelector(".delete-btn").onclick = () => {
//       if (confirm("Delete file?")) {
//         currentFolder.files = currentFolder.files.filter(f => f !== file);
//         localStorage.setItem("folders", JSON.stringify(folders));
//         renderFiles();
//       }
//     };

//     filesList.appendChild(div);
//   });
// }

let folders = JSON.parse(localStorage.getItem("folders")) || [];
let currentFolder = null;

const fileManagerBtn = document.getElementById("fileManagerBtn");
const createFolderBtn = document.getElementById("createFolderBtn");
const createSection = document.getElementById("createFolderSection");
const fileManagerSection = document.getElementById("fileManagerSection");
const insideFolderSection = document.getElementById("insideFolderSection");

const folderInput = document.getElementById("folderNameInput");
const saveFolderBtn = document.getElementById("saveFolderBtn");
const foldersList = document.getElementById("foldersList");
const searchInput = document.getElementById("searchInput");

const fileSearchInput = document.getElementById("fileSearchInput");

const insideFolderTitle = document.getElementById("insideFolderTitle");
const folderPath = document.getElementById("folderPath");
const filesList = document.getElementById("filesList");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");

function formatDate() {
  const d = new Date();
  return (
    d.toLocaleDateString() +
    " " +
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

/* Navigation */
fileManagerBtn.onclick = () => {
  createSection.style.display = "none";
  insideFolderSection.style.display = "none";
  fileManagerSection.style.display = "block";
  renderFolders();
};

createFolderBtn.onclick = () => {
  fileManagerSection.style.display = "none";
  insideFolderSection.style.display = "none";
  createSection.style.display = "block";
};

/* Create Folder */
saveFolderBtn.onclick = () => {
  const name = folderInput.value.trim();
  if (!name) return alert("Folder name required");
  if (folders.some(f => f.name === name)) return alert("Folder already exists");

  folders.push({
    name,
    created: formatDate(),
    files: []
  });

  localStorage.setItem("folders", JSON.stringify(folders));
  folderInput.value = "";
  fileManagerBtn.click();
};

/* Render Folders */
function renderFolders(list = folders) {
  foldersList.innerHTML = "";

  if (!list.length) {
    foldersList.innerHTML = `<div class="empty-state">No folders</div>`;
    return;
  }

  list.forEach(folder => {
    const card = document.createElement("div");
    card.className = "folder-card";
    card.innerHTML = `
      <div class="folder-left">
        <img class="folder-icon" src="https://cdn-icons-png.flaticon.com/512/716/716784.png">
        <div class="folder-info">
          <div class="folder-name">${folder.name}</div>
          <div class="folder-date">${folder.created}</div>
        </div>
      </div>
      <button class="delete-btn">Delete</button>
    `;

    card.querySelector(".folder-left").onclick = () => openFolder(folder);
    card.querySelector(".delete-btn").onclick = () => {
      if (confirm("Delete folder?")) {
        folders = folders.filter(f => f !== folder);
        localStorage.setItem("folders", JSON.stringify(folders));
        renderFolders();
        if (fileSearchInput) fileSearchInput.value = "";
      }
    };

    foldersList.appendChild(card);
  });
}

/* Search */
searchInput.oninput = e => {
  const val = e.target.value.toLowerCase();
  renderFolders(folders.filter(f => f.name.toLowerCase().includes(val)));
};

/* Open Folder */
function openFolder(folder) {
  currentFolder = folder;
  fileManagerSection.style.display = "none";
  createSection.style.display = "none";
  insideFolderSection.style.display = "block";

  insideFolderTitle.textContent = folder.name;
  folderPath.textContent = `File Manager / ${folder.name}`;
  renderFiles();
}

/* Upload (Button) */
uploadBtn.onclick = () => fileInput.click();

fileInput.onchange = () => {
  handleFile(fileInput.files[0]);
};

/* ✅ DRAG & DROP */
uploadBox.addEventListener("dragover", e => {
  e.preventDefault();
  uploadBox.classList.add("dragover");
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("dragover");
});

uploadBox.addEventListener("drop", e => {
  e.preventDefault();
  uploadBox.classList.remove("dragover");
  handleFile(e.dataTransfer.files[0]);
});

/* 🔹 Modified handleFile: adds local + uploads to Vercel API */
function handleFile(file) {
  if (!file || !file.name.endsWith(".zip")) {
    alert("ZIP files only");
    return;
  }

  if (currentFolder.files.some(f => f.name === file.name)) {
    alert("Duplicate file not allowed");
    return;
  }

  // Add file locally in browser first
  currentFolder.files.push({
    name: file.name,
    size: (file.size / 1024).toFixed(2) + " KB",
    created: formatDate(),
    blob: URL.createObjectURL(file)
  });

  localStorage.setItem("folders", JSON.stringify(folders));
  renderFiles();

  // ✅ Upload to Vercel API (/api/upload) after adding locally
  const formData = new FormData();
  formData.append("folderName", currentFolder.name);
  formData.append("file", file);

  fetch("/api/upload", {
    method: "POST",
    body: formData
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        console.log("File uploaded successfully:", data);
      } else {
        console.error("Upload failed:", data);
        alert(`Upload failed: ${data.error || JSON.stringify(data)}`);
      }
    })
    .catch(err => {
      console.error("Error uploading file:", err);
      alert("Error uploading file. Check console for details.");
    });
}

/* Render Files */
function renderFiles() {
  filesList.innerHTML = "";

  if (!currentFolder.files.length) {
    filesList.innerHTML = `<div class="empty-state">No files</div>`;
    return;
  }

  currentFolder.files.forEach(file => {
    const div = document.createElement("div");
    div.className = "file-card";
    div.innerHTML = `
      <div>
        <div class="file-name">${file.name}</div>
        <div class="folder-date">${file.created} • ${file.size}</div>
      </div>
      <div class="file-actions">
        <button class="download-btn">⬇ Download</button>
        <button class="delete-btn">🗑 Delete</button>
      </div>
    `;

    div.querySelector(".download-btn").onclick = () => {
      const a = document.createElement("a");
      a.href = file.blob;
      a.download = file.name;
      a.click();
    };

    div.querySelector(".delete-btn").onclick = () => {
      if (confirm("Delete file?")) {
        currentFolder.files = currentFolder.files.filter(f => f !== file);
        localStorage.setItem("folders", JSON.stringify(folders));
        renderFiles();
      }
    };

    filesList.appendChild(div);
  });
}

/* Init */
renderFolders();

/* File Search */
if (fileSearchInput) {
  fileSearchInput.oninput = e => {
    const val = e.target.value.toLowerCase();
    const filteredFiles = currentFolder.files.filter(f =>
      f.name.toLowerCase().includes(val)
    );
    renderFilteredFiles(filteredFiles);
  };
}

function renderFilteredFiles(list) {
  filesList.innerHTML = "";

  if (!list.length) {
    filesList.innerHTML = `<div class="empty-state">No matching files</div>`;
    return;
  }

  list.forEach(file => {
    const div = document.createElement("div");
    div.className = "file-card";
    div.innerHTML = `
      <div>
        <div class="file-name">${file.name}</div>
        <div class="folder-date">${file.created} • ${file.size}</div>
      </div>
      <div class="file-actions">
        <button class="download-btn">⬇ Download</button>
        <button class="delete-btn">🗑 Delete</button>
      </div>
    `;

    div.querySelector(".download-btn").onclick = () => {
      const a = document.createElement("a");
      a.href = file.blob;
      a.download = file.name;
      a.click();
    };

    div.querySelector(".delete-btn").onclick = () => {
      if (confirm("Delete file?")) {
        currentFolder.files = currentFolder.files.filter(f => f !== file);
        localStorage.setItem("folders", JSON.stringify(folders));
        renderFiles();
      }
    };

    filesList.appendChild(div);
  });
}


