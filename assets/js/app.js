/* Cellaris — small progressive-enhancement layer.
   Header, footer, product tables and product pages are rendered at build time. */
(function () {
  /* mobile menu */
  var burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var nav = document.querySelector(".nav");
      var open = nav.style.display === "flex";
      nav.style.cssText = open
        ? ""
        : "display:flex;position:absolute;top:72px;left:0;right:0;background:#0a0d10;flex-direction:column;padding:20px 24px;gap:14px;border-bottom:1px solid rgba(255,255,255,.14)";
    });
  }

  /* scroll reveal */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".rv").forEach(function (el) { el.classList.add("in"); });
  }

  /* instrument table filter */
  var chips = document.querySelectorAll("#filters .chip");
  var rows = document.querySelectorAll("#product-rows tr");
  if (chips.length && rows.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("on"); });
        chip.classList.add("on");
        var fam = chip.dataset.fam;
        rows.forEach(function (tr) {
          tr.style.display = (fam === "all" || tr.dataset.family === fam) ? "" : "none";
        });
      });
    });
  }

  /* current year where marked */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
