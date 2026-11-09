/* CELLARIS — site behaviour */
(function () {
  const lang = document.body.dataset.lang || "en";
  const page = document.body.dataset.page || "home";
  const N = NAV[lang] || NAV.en;
  const F = FOOTER[lang] || FOOTER.en;

  /* ---------- header ---------- */
  function header() {
    const cur = (href) => (href.replace(".html", "") === page ? ' aria-current="page"' : "");
    const items = N.items
      .map(([label, href]) => `<a href="${href}"${cur(href)}>${label}</a>`)
      .join("");
    const langLinks =
      lang === "en"
        ? `<a href="index.html" class="on">EN</a><a href="ru/index.html">RU</a><a href="es/index.html">ES</a>`
        : lang === "ru"
        ? `<a href="../index.html">EN</a><a href="index.html" class="on">RU</a><a href="../es/index.html">ES</a>`
        : `<a href="../index.html">EN</a><a href="../ru/index.html">RU</a><a href="index.html" class="on">ES</a>`;
    return `
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="index.html"><span class="mark"></span>CELLARIS</a>
        <nav class="nav">${items}</nav>
        <div class="lang">${langLinks}</div>
        <button class="burger" aria-label="Menu" id="burger"><span></span><span></span><span></span></button>
      </div>
    </header>`;
  }

  /* ---------- footer ---------- */
  function footer() {
    const cols = F.cols
      .map(
        ([title, links]) => `
        <div><h4>${title}</h4>${links.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</div>`
      )
      .join("");
    return `
    <footer class="site-footer">
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <a class="brand" href="index.html" style="margin-bottom:18px"><span class="mark"></span>CELLARIS</a>
            <p style="max-width:38ch;line-height:1.7">${F.tag}</p>
          </div>
          ${cols}
        </div>
        <div class="foot-note">
          <span>${F.legal}</span>
          <span>Cellaris Instruments · Fremont · Aachen · Hong Kong</span>
        </div>
      </div>
    </footer>`;
  }

  const h = document.getElementById("site-header");
  if (h) h.innerHTML = header();
  const f = document.getElementById("site-footer");
  if (f) f.innerHTML = footer();

  const burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const nav = document.querySelector(".nav");
      const open = nav.style.display === "flex";
      nav.style.cssText = open
        ? ""
        : "display:flex;position:absolute;top:72px;left:0;right:0;background:#0a0d10;flex-direction:column;padding:20px 24px;gap:14px;border-bottom:1px solid rgba(255,255,255,.14)";
    });
  }

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));

  /* ---------- product table ---------- */
  const rowsEl = document.getElementById("product-rows");
  if (rowsEl) {
    const chipBox = document.getElementById("filters");
    const labels = (typeof FAMILY_LABELS !== "undefined" && FAMILY_LABELS[lang]) || FAMILY_LABELS.en;
    FAMILIES.forEach((fam, i) => {
      const b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " on" : "");
      b.textContent = labels[i] || fam.label;
      b.dataset.fam = fam.id;
      b.addEventListener("click", () => {
        document.querySelectorAll("#filters .chip").forEach((c) => c.classList.remove("on"));
        b.classList.add("on");
        paint(fam.id);
      });
      chipBox.appendChild(b);
    });

    function paint(fam) {
      const list = fam === "all" ? MODELS : MODELS.filter((m) => m.family === fam);
      rowsEl.innerHTML = list
        .map(
          (m) => `
        <tr onclick="location.href='product.html?model=${m.id}'" style="cursor:pointer">
          <td class="model">${m.model}<span>${m.series} series</span></td>
          <td>${m.familyLabel}</td>
          <td class="num">${m.volt}</td>
          <td class="num">${m.curr}</td>
          <td class="num">${m.ranges}</td>
          <td class="num">${m.accuracy}</td>
          <td class="num">${m.response}</td>
          <td class="num">${m.regen}</td>
        </tr>`
        )
        .join("");
    }
    paint("all");
  }

  /* ---------- product detail ---------- */
  const pd = document.getElementById("product-detail");
  if (pd) {
    const id = new URLSearchParams(location.search).get("model") || "ct-9000-5v15a";
    const m = MODELS.find((x) => x.id === id) || MODELS[2];
    document.title = m.model + " — Cellaris Instruments";
    pd.innerHTML = `
      <div class="pd">
        <div class="pd-media rv in"><img src="${m.img}" alt="${m.model}"></div>
        <div>
          <div class="mono" style="font-size:11.5px;letter-spacing:.18em;color:var(--accent);text-transform:uppercase">${m.series} series · ${m.familyLabel}</div>
          <h1 style="font-size:clamp(32px,4vw,52px);margin:16px 0 18px">${m.model}</h1>
          <p style="color:var(--muted);font-size:16px;max-width:52ch">${m.blurb}</p>
          <div class="pd-cta">
            <a class="btn primary" href="contact.html">Request a quote <span class="arw">→</span></a>
            <a class="btn" style="border-color:var(--line);color:var(--ink)" href="support.html">Datasheet & manuals</a>
          </div>
          <table class="tbl pd-specs">
            <tbody>
              <tr><th>DUT</th><td>${m.dut}</td></tr>
              <tr><th>Voltage</th><td class="num">${m.volt}</td></tr>
              <tr><th>Current</th><td class="num">${m.curr}</td></tr>
              <tr><th>Ranges</th><td class="num">${m.ranges}</td></tr>
              <tr><th>Channels</th><td class="num">${m.channels}</td></tr>
              <tr><th>Accuracy</th><td class="num">${m.accuracy}</td></tr>
              <tr><th>Current response</th><td class="num">${m.response}</td></tr>
              <tr><th>Data logging</th><td class="num">${m.dataRate}</td></tr>
              <tr><th>Energy recovery</th><td>${m.regen}</td></tr>
            </tbody>
          </table>
          <p class="note-line" style="margin-top:26px">Full specifications, calibration certificates and configuration options are provided with the quotation. Values shown are for the standard configuration.</p>
        </div>
      </div>`;
  }

  /* ---------- year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
