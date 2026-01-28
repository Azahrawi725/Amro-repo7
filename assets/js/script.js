"use strict";

/* ==========================
   Helpers
========================== */
const toggleActive = (el) => el && el.classList.toggle("active");
const addActive = (el) => el && el.classList.add("active");
const removeActive = (el) => el && el.classList.remove("active");

/* ==========================
   Sidebar (mobile)
========================== */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn?.addEventListener("click", () => toggleActive(sidebar));

/* ==========================
   Testimonials modal (Team popup)
========================== */
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const testimonialsModalContainer = document.querySelector("[data-modal-container]");
const testimonialsModalCloseBtn = document.querySelector("[data-modal-close-btn]");
const testimonialsOverlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleTestimonialsModal = () => {
  toggleActive(testimonialsModalContainer);
  toggleActive(testimonialsOverlay);
};

if (
  testimonialsItems.length &&
  testimonialsModalContainer &&
  testimonialsOverlay &&
  modalTitle &&
  modalText
) {
  testimonialsItems.forEach((item) => {
    item.addEventListener("click", () => {
      const avatar = item.querySelector("[data-testimonials-avatar]");
      const title = item.querySelector("[data-testimonials-title]");
      const text = item.querySelector("[data-testimonials-text]");

      if (modalImg && avatar && avatar.tagName.toLowerCase() === "img") {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt || "Team member";
      }

      if (title) modalTitle.innerHTML = title.innerHTML;
      if (text) modalText.innerHTML = text.innerHTML;

      toggleTestimonialsModal();
    });
  });

  testimonialsModalCloseBtn?.addEventListener("click", toggleTestimonialsModal);
  testimonialsOverlay?.addEventListener("click", toggleTestimonialsModal);
}

/* ==========================
   Portfolio filters (buttons + dropdown)
========================== */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  const value = (selectedValue || "").toLowerCase();
  filterItems.forEach((it) => {
    const cat = (it.dataset.category || "").toLowerCase();
    if (value === "all" || value === cat) addActive(it);
    else removeActive(it);
  });
};

select?.addEventListener("click", () => toggleActive(select));

if (selectItems.length && selectValue) {
  selectItems.forEach((item) => {
    item.addEventListener("click", () => {
      const v = (item.innerText || "").trim();
      selectValue.innerText = v;
      toggleActive(select);
      filterFunc(v);
    });
  });
}

let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;
if (filterBtn.length) {
  filterBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = (btn.innerText || "").trim();
      if (selectValue) selectValue.innerText = v;
      filterFunc(v);

      if (lastClickedBtn) removeActive(lastClickedBtn);
      addActive(btn);
      lastClickedBtn = btn;
    });
  });
}

/* ==========================
   Contact form: enable button when valid
========================== */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length && formBtn) {
  const updateBtn = () => {
    if (form.checkValidity()) formBtn.removeAttribute("disabled");
    else formBtn.setAttribute("disabled", "");
  };

  formInputs.forEach((inp) => inp.addEventListener("input", updateBtn));
  updateBtn();
}

/* ==========================
   Page navigation (tabs)
========================== */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = (link.textContent || "").trim().toLowerCase();

      pages.forEach((page) => {
        const isTarget = (page.dataset.page || "").toLowerCase() === target;
        page.classList.toggle("active", isTarget);
      });

      navigationLinks.forEach((lnk) => {
        const isTarget = (lnk.textContent || "").trim().toLowerCase() === target;
        lnk.classList.toggle("active", isTarget);
      });

      window.scrollTo(0, 0);
    });
  });
}

/* ==========================
   Portfolio Gallery Modal (same HTML method)
   - Opens with: [data-gallery-open="..."]
   - Writes GOLD caption into: [data-portfolio-caption]
========================== */
(() => {
  const modal = document.querySelector("[data-portfolio-modal]");
  const overlay = document.querySelector("[data-portfolio-overlay]");
  const closeBtn = document.querySelector("[data-portfolio-close]");
  const titleEl = document.querySelector("[data-portfolio-title]");
  const viewerEl = document.querySelector("[data-portfolio-viewer]");
  const captionEl = document.querySelector("[data-portfolio-caption]");
  const thumbsEl = document.querySelector("[data-portfolio-thumbs]");
  const ctaEl = document.querySelector("[data-portfolio-cta]");

  if (!modal || !overlay || !closeBtn || !titleEl || !viewerEl || !thumbsEl || !captionEl) {
    console.warn("Portfolio modal elements not found. Check HTML markup.");
    return;
  }

  // Your folder
  const BASE = "./Work_Images/For_portfolio/";
  const AGRI_PAPER_URL = "https://www.mdpi.com/2071-1050/16/18/8271";

  // 🔴 IMPORTANT: filenames must match EXACTLY (Linux is case-sensitive)
  const GALLERIES = {
    cfd: {
      title: "CFD Simulation Work (OpenFOAM)",
      cta: null,
      items: [
        { type: "image", src: BASE + "U_t0.01.png",  thumb: BASE + "U_t0.01.png",  caption: "Velocity field (t = 0.01 s)" },
        { type: "image", src: BASE + "U_t0.38s.png", thumb: BASE + "U_t0.38s.png", caption: "Velocity field (t = 0.38 s)" },
        { type: "image", src: BASE + "U_t0.82s.png", thumb: BASE + "U_t0.82s.png", caption: "Velocity field (t = 0.82 s)" },
        { type: "image", src: BASE + "U_t1.22.png",  thumb: BASE + "U_t1.22.png",  caption: "Velocity field (t = 1.22 s)" },
        { type: "image", src: BASE + "Int_mesh.png", thumb: BASE + "Int_mesh.png", caption: "Meshed domain" },
        { type: "image", src: BASE + "Iso2.png",     thumb: BASE + "Iso2.png",     caption: "Iso-surface (1)" },
        { type: "image", src: BASE + "Iso3.png",     thumb: BASE + "Iso3.png",     caption: "Iso-surface (2)" },

        { type: "video", src: BASE + "eddy_viscousity_30fps.mp4", thumb: BASE + "Eddy_Thumb.png", caption: "Eddy viscosity animation" },
        { type: "video", src: BASE + "vid_20mps.mp4",             thumb: BASE + "Vid_20.png",      caption: "FSI case: ~20 m/s (30 fps)" },
        { type: "video", src: BASE + "Video_30.mp4",              thumb: BASE + "Vid_30.png",      caption: "FSI case: 30 fps" },
        { type: "video", src: BASE + "Video_60.mp4",              thumb: BASE + "Vid_60.png",      caption: "FSI case: 60 fps" },
        { type: "video", src: BASE + "IsoSurface1.mp4",           thumb: BASE + "Vid2.png",      caption: "Wind flow fluctuation" },
      ],
    },

    wind: {
      title: "Wind-Tunnel Tests & Instrumentation",
      cta: null,
      items: [
        { type: "image", src: BASE + "Lab1.JPG",  thumb: BASE + "Lab1.JPG",  caption: "Lab setup (1)" },
        { type: "image", src: BASE + "Lab2.JPG",  thumb: BASE + "Lab2.JPG",  caption: "Lab setup (2)" },
        { type: "image", src: BASE + "Lab3.JPG",  thumb: BASE + "Lab3.JPG",  caption: "Lab setup (3)" },
        { type: "image", src: BASE + "Lab4.JPG",  thumb: BASE + "Lab4.JPG",  caption: "Lab setup (4)" },
        { type: "image", src: BASE + "Lab5.JPG",  thumb: BASE + "Lab5.JPG",  caption: "Lab setup (5)" },
        { type: "image", src: BASE + "Lab6.JPG",  thumb: BASE + "Lab6.JPG",  caption: "Lab setup (6)" },
        { type: "image", src: BASE + "Lab7.JPG",  thumb: BASE + "Lab7.JPG",  caption: "Lab setup (7)" },
        { type: "image", src: BASE + "Lab8.JPG",  thumb: BASE + "Lab8.JPG",  caption: "Lab setup (8)" },
        { type: "image", src: BASE + "Lab9.JPG",  thumb: BASE + "Lab9.JPG",  caption: "Lab setup (9)" },
        { type: "image", src: BASE + "Lab10.JPG", thumb: BASE + "Lab10.JPG", caption: "Lab setup (10)" },
        { type: "image", src: BASE + "pic1.png",  thumb: BASE + "pic1.png",  caption: "Experimental snapshot (1)" },
        { type: "image", src: BASE + "pic2.png",  thumb: BASE + "pic2.png",  caption: "Experimental snapshot (2)" },

        { type: "video", src: BASE + "LabSmoke.mp4",  thumb: BASE + "pic1.png", caption: "Smoke visualization (1)" },
        { type: "video", src: BASE + "LabSmoke2.mp4", thumb: BASE + "pic2.png", caption: "Smoke visualization (2)" },
      ],
    },

    analysis: {
      title: "Signal Processing & Data Analysis - On Progress",
      cta: null,
      items: [
        { type: "image", src: BASE + "Present1.JPG", thumb: BASE + "Present1.JPG", caption: "Presentation / results snapshot" },
        { type: "image", src: BASE + "Accel1.png",   thumb: BASE + "Accel1.png",   caption: "Angular acceleration time histories (multi-angle)" },
        { type: "image", src: BASE + "PSD1.png",     thumb: BASE + "PSD1.png",     caption: "PSD of angular acceleration (log-log)" },
        { type: "image", src: BASE + "Accel2.png",   thumb: BASE + "Accel2.png",   caption: "Dual-sensor acceleration overlay" },
        { type: "image", src: BASE + "RMS1.png",     thumb: BASE + "RMS1.png",     caption: "RMS & peak response vs wind speed (critical speed identification)" },
        { type: "image", src: BASE + "Picture4.jpg",   thumb: BASE + "Picture4.jpg",   caption: "Surface plot of energy yield" },
        { type: "image", src: BASE + "Picture3.jpg",   thumb: BASE + "Picture3.jpg",   caption: "power generation comparison of optimum and original angles for different days" },
      ],
    },

    ai: {
      title: "AI/ML Prediction Models - On Progress",
      cta: null,
      items: [
        // add when ready
      ],
    },

    agrivoltaics: {
      title: "Agrivoltaics: Wind Impact & Reliability",
      cta: AGRI_PAPER_URL,
      items: [
        { type: "image", src: BASE + "AG1.png", thumb: BASE + "AG1.png",
          caption: "AG1 — Agrivoltaics concept and applications. Source: Zahrawi & Aly, Sustainability 16(18):8271 (2024). DOI: 10.3390/su16188271." },
        { type: "image", src: BASE + "AG2.png", thumb: BASE + "AG2.png",
          caption: "AG2 — Structure of the agrivoltaics review (scope and themes). Source: Zahrawi & Aly, Sustainability 16(18):8271 (2024). DOI: 10.3390/su16188271." },
        { type: "image", src: BASE + "Visit1.jpeg", thumb: BASE + "Visit1.jpeg", caption: "Site visit — Port Allen Solar Farm (1)" },
        { type: "image", src: BASE + "Visit2.jpeg", thumb: BASE + "Visit2.jpeg", caption: "Site visit — Port Allen Solar Farm (2)" },
        { type: "image", src: BASE + "Visit3.jpeg", thumb: BASE + "Visit3.jpeg", caption: "Site visit — Port Allen Solar Farm (3)" },
        { type: "image", src: BASE + "LSU1.jpeg",   thumb: BASE + "LSU1.jpeg",   caption: "Field notes / site context (1)" },
        { type: "image", src: BASE + "LSU2.jpeg",   thumb: BASE + "LSU2.jpeg",   caption: "Field notes / site context (2)" },
      ],
    },

    simscale: {
      title: "SimScale Models & Parametric Studies - On Progress",
      cta: null,
      items: [
        { type: "image", src: BASE + "Simscale.png", thumb: BASE + "Simscale.png",
          caption: "SimScale setup (incompressible, k-ω SST) — baseline for parametric studies" },
      ],
    },
     presentationsPhotos: {
    title: "Presentation Photos",
    cta: null,
    items: [
      { type: "image", src: BASE + "COE1.jpg",  thumb: BASE + "COE1.jpg",  caption: "College of Engineering presentation (1)" },
      { type: "image", src: BASE + "COE2.jpg",  thumb: BASE + "COE2.jpg",  caption: "College of Engineering — group photo (2)" },
      { type: "image", src: BASE + "COE3.jpg",  thumb: BASE + "COE3.jpg",  caption: "College of Engineering presentation (3)" },

      { type: "image", src: BASE + "ETRC1.jpg", thumb: BASE + "ETRC1.jpg", caption: "ERTC Research Competition — event photo (1)" },
      { type: "image", src: BASE + "ETRC2.jpg", thumb: BASE + "ETRC2.jpg", caption: "ERTC Research Competition — group photo (2)" },
      { type: "image", src: BASE + "ETRC3.jpg", thumb: BASE + "ETRC3.jpg", caption: "ERTC Research Competition — presentation (3)" },
      { type: "image", src: BASE + "ETRC4.jfif",thumb: BASE + "ETRC4.jfif",caption: "ERTC Research Competition — award / showcase (4)" },

      { type: "image", src: BASE + "GRC1.JPG",  thumb: BASE + "GRC1.JPG",  caption: "LSU Graduate School Research Competition (1)" },
      { type: "image", src: BASE + "GRC2.JPG",  thumb: BASE + "GRC2.JPG",  caption: "LSU Graduate School Research Competition (2)" },

      { type: "image", src: BASE + "MasterExp1.jpg", thumb: BASE + "MasterExp1.jpg", caption: "Master’s thesis experiments — setup (1)" },
      { type: "image", src: BASE + "MasterExp2.jpg", thumb: BASE + "MasterExp2.jpg", caption: "Master’s thesis experiments — setup (2)" },
      { type: "image", src: BASE + "MasterExp3.jpg", thumb: BASE + "MasterExp3.jpg", caption: "Master’s thesis experiments — setup (3)" },

      { type: "image", src: BASE + "MasterTh1.JPG",  thumb: BASE + "MasterTh1.JPG",  caption: "Master’s thesis presentation (1)" },
      { type: "image", src: BASE + "MasterTh2.JPG",  thumb: BASE + "MasterTh2.JPG",  caption: "Master’s thesis presentation (2)" },

      { type: "image", src: BASE + "PhdGen.JPG",     thumb: BASE + "PhdGen.JPG",     caption: "PhD general / research presentation" },
      { type: "image", src: BASE + "Present1.JPG",   thumb: BASE + "Present1.JPG",   caption: "Research results snapshot (meeting / talk)" },
    ],
  },
  };

  function stopVideo() {
    const v = viewerEl.querySelector("video");
    if (v) {
      try {
        v.pause();
        v.removeAttribute("src");
        v.load();
      } catch (_) {}
    }
  }

  function setCaption(item) {
    // Caption is GOLD via CSS (.portfolio-caption { color: #d4af37; })
    captionEl.textContent = item?.caption || "";
  }

  function renderViewer(item) {
    stopVideo();
    viewerEl.innerHTML = "";

    if (item.type === "video") {
      const v = document.createElement("video");
      v.controls = true;
      v.preload = "metadata";
      v.playsInline = true;
      v.style.width = "100%";
      v.style.maxHeight = "520px";
      v.style.display = "block";
      v.style.background = "#000";

      // Better compatibility
      const s = document.createElement("source");
      s.src = item.src;
      s.type = "video/mp4";
      v.appendChild(s);

      viewerEl.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "Portfolio media";
      img.loading = "lazy";
      img.style.width = "100%";
      img.style.maxHeight = "520px";
      img.style.objectFit = "contain";
      img.style.display = "block";
      viewerEl.appendChild(img);
    }

    // ✅ Always show caption
    setCaption(item);
  }

  function openModal(key) {
    const data = GALLERIES[key];
    if (!data) return;

    titleEl.textContent = data.title || "Project Gallery";
    thumbsEl.innerHTML = "";
    viewerEl.innerHTML = "";
    captionEl.textContent = "";

    // CTA link (only for agrivoltaics)
    if (ctaEl) {
      if (data.cta) {
        ctaEl.href = data.cta;
        ctaEl.style.display = "inline-flex";
      } else {
        ctaEl.style.display = "none";
        ctaEl.href = "#";
      }
    }

    const items = data.items || [];
    if (!items.length) {
      viewerEl.innerHTML = `<div style="padding:16px;opacity:.85;">No media added yet for <b>${key}</b>.</div>`;
      addActive(modal);
      addActive(overlay);
      return;
    }

    items.forEach((item, idx) => {
      const li = document.createElement("li");
      li.className = "clients-item";
      li.style.cursor = "pointer";

      const thumb = document.createElement("img");
      thumb.src = item.thumb || item.src;
      thumb.alt = item.caption || `Item ${idx + 1}`;
      thumb.title = item.caption || "";
      thumb.loading = "lazy";
      thumb.style.height = "62px";
      thumb.style.width = "auto";
      thumb.style.objectFit = "cover";
      thumb.style.borderRadius = "12px";
      thumb.style.display = "block";

      li.appendChild(thumb);

      li.addEventListener("click", () => {
        renderViewer(item);
      });

      thumbsEl.appendChild(li);

      if (idx === 0) renderViewer(item);
    });

    addActive(modal);
    addActive(overlay);
  }

  function closeModal() {
    stopVideo();
    removeActive(modal);
    removeActive(overlay);
    viewerEl.innerHTML = "";
    thumbsEl.innerHTML = "";
    captionEl.textContent = "";

    if (ctaEl) {
      ctaEl.style.display = "none";
      ctaEl.href = "#";
    }
  }

  // Bind openers (your current HTML uses: data-gallery-open="cfd" etc.)
  document.querySelectorAll("[data-gallery-open]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const key = el.getAttribute("data-gallery-open");
      openModal(key);
    });
  });

  // Close handlers
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
})();
// ========= Presentation Photos: Click to enlarge modal =========
(function () {
  const modal = document.querySelector("[data-pres-modal]");
  if (!modal) return;

  const overlay = modal.querySelector("[data-pres-overlay]");
  const btnClose = modal.querySelector("[data-pres-close]");
  const imgEl = modal.querySelector("[data-pres-img]");
  const capEl = modal.querySelector("[data-pres-caption]");

  const open = (src, caption) => {
    imgEl.src = src;
    imgEl.alt = caption || "Presentation photo";
    capEl.textContent = caption || "";
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const close = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    // optional cleanup:
    imgEl.src = "";
    imgEl.alt = "";
    capEl.textContent = "";
  };

  // Click any presentation thumbnail
  document.querySelectorAll(".pres-photo-link").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const src = a.getAttribute("data-pres-src");
      const caption = a.getAttribute("data-pres-caption") || "";
      if (src) open(src, caption);
    });
  });

  // Close actions
  overlay.addEventListener("click", close);
  btnClose.addEventListener("click", close);

  // ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) close();
  });
})();


