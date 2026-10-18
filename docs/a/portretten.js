// The Wachters' portraits (Jean's paintings). The images themselves are never in this public repo:
// the regie uploads them once to Firebase (/portretten, readable only when logged in) and every page gets them from there.
//   Portret.url(naam)             → data URL or null
//   Portret.rond(el, naam, ruimte) → turns el into a round face crop (background), the face in the middle at half the circle (ruimte > 1: more around it)
//   Portret.op(fn)                → fn() runs whenever the portraits arrive or change
(() => {
  // per portrait: face centre (x, y as a fraction of the 2:3 painting) and face width (fraction of the painting's width),
  // so every face fills the same share of its circle however big it was painted
  const GEZICHT = { Geert: [.565, .165, .145], Roy: [.48, .13, .128], Martin: [.62, .29, .175], Stefan: [.52, .19, .235], Jeroen: [.5, .15, .128], Ivo: [.55, .3, .206],
    Johan: [.57, .18, .1375], Robin: [.515, .225, .14], Rob: [.555, .182, .14], Jean: [.575, .27, .18], Roland: [.33, .24, .132] };
  let data = {}; const wachters = [];
  window.Portret = {
    zet(p) { data = p || {}; wachters.forEach((fn) => { try { fn(); } catch {} }); },
    url: (naam) => data[naam] || null,
    aantal: () => Object.keys(data).length,
    op(fn) { wachters.push(fn); },
    rond(el, naam, ruimte = 1) {
      const u = data[naam]; if (!u) return false; const [fx, fy, fw] = GEZICHT[naam] || [.5, .2, .15], S = Math.max(1.05, .5 / fw / ruimte);
      el.style.backgroundImage = `url(${u})`; el.style.backgroundSize = `${S * 100}% auto`; el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = `${((.5 - fx * S) / (1 - S)) * 100}% ${((.5 - fy * 1.5 * S) / (1 - 1.5 * S)) * 100}%`;
      return true;
    },
    // the regie: a picked file → a small webp (480 px wide) as data URL, for /portretten
    async verklein(bestand, breed = 480) {
      const img = await createImageBitmap(bestand), c = document.createElement("canvas");
      c.width = breed; c.height = Math.round(img.height * breed / img.width); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/webp", .74);
    },
  };
})();
