// Beeldbewerking voor de speelschermen: lagen, maskers en lichtlagen uit de schildering.
// Laden in PowerShell: Add-Type -ReferencedAssemblies System.Drawing -Path scripts\Toneel.cs
using System; using System.Drawing; using System.Drawing.Drawing2D; using System.Drawing.Imaging; using System.Runtime.InteropServices;

public static class Toneel {
  static byte[] Lees(Bitmap b, out int s) { var d = b.LockBits(new Rectangle(0, 0, b.Width, b.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb); s = d.Stride; var p = new byte[s * b.Height]; Marshal.Copy(d.Scan0, p, 0, p.Length); b.UnlockBits(d); return p; }
  static Bitmap Maak(int w, int h, byte[] p) { var b = new Bitmap(w, h, PixelFormat.Format32bppArgb); var d = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb); Marshal.Copy(p, 0, d.Scan0, p.Length); b.UnlockBits(d); return b; }
  static void Jpg(Bitmap b, string dst, long q) { var enc = Array.Find(ImageCodecInfo.GetImageEncoders(), e => e.MimeType == "image/jpeg"); var ep = new EncoderParameters(1); ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, q); b.Save(dst, enc, ep); }

  public static void Schaal(string src, string dst, int w, int h) {
    var im = Image.FromFile(src); var b = new Bitmap(w, h, PixelFormat.Format32bppArgb); var g = Graphics.FromImage(b);
    g.InterpolationMode = InterpolationMode.HighQualityBicubic; g.DrawImage(im, 0, 0, w, h); g.Dispose(); im.Dispose();
    if (dst.EndsWith(".jpg")) Jpg(b, dst, 84); else b.Save(dst, ImageFormat.Png); b.Dispose();
  }

  static float[] Vervaag(float[] m, int W, int H, int r) {
    var t = new float[W * H]; var o = new float[W * H];
    for (int y = 0; y < H; y++) { float s = 0; for (int x = -r; x < W; x++) { if (x + r < W) s += m[y * W + x + r]; if (x - r - 1 >= 0) s -= m[y * W + x - r - 1]; if (x >= 0) t[y * W + x] = s / (2 * r + 1); } }
    for (int x = 0; x < W; x++) { float s = 0; for (int y = -r; y < H; y++) { if (y + r < H) s += t[(y + r) * W + x]; if (y - r - 1 >= 0) s -= t[(y - r - 1) * W + x]; if (y >= 0) o[y * W + x] = s / (2 * r + 1); } }
    return o;
  }

  // Lucht = per kolom alles boven de eerste lange reeks niet-rode pixels (de boomgrens).
  public static void LuchtMasker(string src, string dst) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height; var m = new float[W * H];
    Func<int, bool> rood = i => p[i + 2] > 45 && p[i + 2] > 1.45 * p[i + 1] && p[i + 2] > 1.3 * p[i];
    var grens = new int[W];
    for (int x = 0; x < W; x++) {
      int y = (int)(H * 0.18);
      for (; y < H * 0.6; y++) {
        if (rood(y * s + x * 4)) continue;
        int run = 0; for (int k = 1; k < 14 && y + k < H; k++) if (!rood((y + k) * s + x * 4)) run++;
        if (run >= 12) break;
      }
      grens[x] = y;
    }
    // donkere wolken breken de test af: neem per kolom het 85e percentiel van de buren
    var glad = new int[W];
    for (int x = 0; x < W; x++) {
      int a = Math.Max(0, x - 50), z = Math.Min(W - 1, x + 50); var w = new int[z - a + 1];
      for (int i = a; i <= z; i++) w[i - a] = grens[i]; Array.Sort(w); glad[x] = w[(int)(w.Length * 0.85)];
    }
    for (int x = 0; x < W; x++) for (int y = 0; y < H; y++) m[y * W + x] = y < glad[x] - 6 ? 1f : 0f;
    m = Vervaag(m, W, H, 14);
    var o = new byte[W * H * 4]; for (int i = 0; i < W * H; i++) { o[i * 4] = 255; o[i * 4 + 1] = 255; o[i * 4 + 2] = 255; o[i * 4 + 3] = (byte)Math.Min(255, m[i] * 255); }
    var ob = Maak(W, H, o); ob.Save(dst, ImageFormat.Png); ob.Dispose(); b.Dispose();
  }

  // Naadloze wolkenstrook: lucht + gespiegelde lucht naast elkaar.
  public static void LuchtTegel(string src, string dst, int hoogte) {
    var im = new Bitmap(src); var b = new Bitmap(im.Width * 2, hoogte, PixelFormat.Format24bppRgb); var g = Graphics.FromImage(b);
    g.DrawImage(im, new Rectangle(0, 0, im.Width, hoogte), new Rectangle(0, 0, im.Width, hoogte), GraphicsUnit.Pixel);
    g.DrawImage(im, new Rectangle(im.Width * 2, 0, -im.Width, hoogte), new Rectangle(0, 0, im.Width, hoogte), GraphicsUnit.Pixel);
    g.Dispose(); Jpg(b, dst, 82); b.Dispose(); im.Dispose();
  }

  // Warme lichtjes (ramen, fakkels): alleen warme, heldere pixels; verdeeld over twee bestanden voor variatie in flakkeren.
  public static string Lichten(string src, string dstA, string dstB, int x0, int y0, int x1, int y1, int cel, double grMin = .42) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height; var a = new byte[W * H * 4]; var c = new byte[W * H * 4]; int n = 0;
    for (int y = y0; y < y1; y++) for (int x = x0; x < x1; x++) {
      int i = y * s + x * 4; int bb = p[i], g = p[i + 1], r = p[i + 2], al = p[i + 3];
      if (al < 200 || r < 140 || bb > 120) continue; double gr = g / (double)r; if (gr < grMin || gr > .92) continue;
      double k = Math.Min(1.0, (r - 140) / 80.0) * Math.Min(1.0, (gr - grMin) / .15); int o = (y * W + x) * 4;
      var t = (((x / cel) + (y / cel)) % 2 == 0) ? a : c; t[o] = (byte)bb; t[o + 1] = (byte)g; t[o + 2] = (byte)r; t[o + 3] = (byte)(255 * k); n++;
    }
    var ba = Maak(W, H, a); ba.Save(dstA, ImageFormat.Png); ba.Dispose(); var bc = Maak(W, H, c); bc.Save(dstB, ImageFormat.Png); bc.Dispose(); b.Dispose(); return n + " px";
  }

  // Uitsnede opschonen: alfa hard maken en naar de snijranden toe laten uitlopen (rand: px per zijde, 0 = niet).
  public static void Uitsnede(string src, string dst, int lo, int hi, int links, int rechts, int boven, int onder) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height; var o = new byte[W * H * 4];
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      int i = y * s + x * 4, q = (y * W + x) * 4; int a = p[i + 3];
      double na = a <= lo ? 0 : a >= hi ? 1 : (a - lo) / (double)(hi - lo);
      if (links > 0) na *= Math.Min(1.0, x / (double)links);
      if (rechts > 0) na *= Math.Min(1.0, (W - 1 - x) / (double)rechts);
      if (boven > 0) na *= Math.Min(1.0, y / (double)boven);
      if (onder > 0) na *= Math.Min(1.0, (H - 1 - y) / (double)onder);
      o[q] = p[i]; o[q + 1] = p[i + 1]; o[q + 2] = p[i + 2]; o[q + 3] = (byte)(255 * na);
    }
    var ob = Maak(W, H, o); ob.Save(dst, ImageFormat.Png); ob.Dispose(); b.Dispose();
  }

  // Ampul op zwart: achtergrond weg, glas binnenin doorzichtig (glanslichten blijven), plus een masker van de binnenkant.
  public static string Ampul(string src, string dstImg, string dstMasker, int x0, int x1, int y0, int y1, int[] overslaan) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height;
    var o = new byte[W * H * 4]; var m = new byte[W * H * 4]; int mx0 = W, mx1 = 0, my0 = H, my1 = 0;
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      int i = y * s + x * 4, q = (y * W + x) * 4; int bb = p[i], g = p[i + 1], r = p[i + 2];
      double lum = .3 * r + .59 * g + .11 * bb; double a;
      bool warm = r - bb > 25 && lum > 40, rood = r > 110 && g < 70;
      bool zone = x >= x0 && x <= x1 && y >= y0 && y <= y1;
      for (int k = 0; zone && k + 1 < overslaan.Length; k += 2) if (y >= overslaan[k] && y <= overslaan[k + 1]) zone = false;
      if (zone && !warm && !rood) {
        a = Math.Max(0, Math.Min(1, (lum - 12) / 75.0)) * .8;   // glas: alleen glans blijft zichtbaar
        if (a < .5) { m[q] = 255; m[q + 1] = 255; m[q + 2] = 255; m[q + 3] = 255; if (x < mx0) mx0 = x; if (x > mx1) mx1 = x; if (y < my0) my0 = y; if (y > my1) my1 = y; }
      } else a = Math.Max(0, Math.Min(1, (lum - 3) / 16.0));        // zwarte achtergrond weg
      o[q] = (byte)bb; o[q + 1] = (byte)g; o[q + 2] = (byte)r; o[q + 3] = (byte)(255 * a);
    }
    var ob = Maak(W, H, o); ob.Save(dstImg, ImageFormat.Png); ob.Dispose(); var mb = Maak(W, H, m); mb.Save(dstMasker, ImageFormat.Png); mb.Dispose(); b.Dispose();
    return string.Format(System.Globalization.CultureInfo.InvariantCulture, "binnenkant x {0:0.0}-{1:0.0}% y {2:0.0}-{3:0.0}% (W{4} H{5})", mx0 * 100.0 / W, mx1 * 100.0 / W, my0 * 100.0 / H, my1 * 100.0 / H, W, H);
  }

  // Object op groen (en eventuele witte rand) uitknippen, groene zweem van de randen halen, bijsnijden tot de inhoud.
  public static string Groen(string src, string dst) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height; var o = new byte[W * H * 4];
    int x0 = W, x1 = 0, y0 = H, y1 = 0;
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      int i = y * s + x * 4, q = (y * W + x) * 4; int bb = p[i], g = p[i + 1], r = p[i + 2];
      double groen = g - Math.Max(r, bb);                      // hoe groen
      double a = 1 - Math.Max(0, Math.Min(1, (groen - 30) / 70.0));
      if (Math.Min(r, Math.Min(g, bb)) > 225) a = 0;            // witte rand
      if (g > Math.Max(r, bb)) g = Math.Max(r, bb);             // groene zweem weg
      o[q] = (byte)bb; o[q + 1] = (byte)g; o[q + 2] = (byte)r; o[q + 3] = (byte)(255 * a);
      if (a > .5) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    var ob = Maak(W, H, o); var crop = ob.Clone(new Rectangle(x0, y0, x1 - x0 + 1, y1 - y0 + 1), PixelFormat.Format32bppArgb);
    crop.Save(dst, ImageFormat.Png); crop.Dispose(); ob.Dispose(); b.Dispose();
    return string.Format("{0}x{1}", x1 - x0 + 1, y1 - y0 + 1);
  }

  // Uitgesneden object op het 1536x1024-doek zetten, geschaald naar breedte w met linksboven (x, y).
  public static void PlaatsBreed(string src, string dst, int x, int y, int w) {
    var c = new Bitmap(1536, 1024, PixelFormat.Format32bppArgb); var g = Graphics.FromImage(c); g.Clear(Color.Transparent);
    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
    var im = Image.FromFile(src); int h = (int)Math.Round(im.Height * (double)w / im.Width);
    g.DrawImage(im, new Rectangle(x, y, w, h)); g.Dispose(); im.Dispose(); c.Save(dst, ImageFormat.Png); c.Dispose();
  }

  // Ruis (stipjes, strepen) uit een gebied halen met een mediaanfilter; schrijft ook een losse lap met zachte randen.
  public static void Ontruis(string src, string dst, string lap, int x0, int y0, int x1, int y1, int r, int veer) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height; var o = (byte[])p.Clone();
    var l = new byte[W * H * 4]; var bufR = new int[(2 * r + 1) * (2 * r + 1)]; var bufG = new int[bufR.Length]; var bufB = new int[bufR.Length];
    for (int y = y0; y < y1; y++) for (int x = x0; x < x1; x++) {
      int n = 0;
      for (int dy = -r; dy <= r; dy++) for (int dx = -r; dx <= r; dx++) {
        int yy = Math.Min(H - 1, Math.Max(0, y + dy)), xx = Math.Min(W - 1, Math.Max(0, x + dx)), j = yy * s + xx * 4;
        bufB[n] = p[j]; bufG[n] = p[j + 1]; bufR[n] = p[j + 2]; n++;
      }
      Array.Sort(bufR, 0, n); Array.Sort(bufG, 0, n); Array.Sort(bufB, 0, n);
      // zachte overgang naar de randen van het gebied
      double k = Math.Min(1, Math.Min(Math.Min(x - x0 + 1, x1 - x), Math.Min(y - y0 + 1, y1 - y)) / (double)veer);
      if (x0 == 0) k = Math.Min(1, Math.Min(Math.Min(y - y0 + 1, y1 - y), x1 - x) / (double)veer);
      int i = y * s + x * 4, q = (y * W + x) * 4;
      o[i] = (byte)(p[i] * (1 - k) + bufB[n / 2] * k); o[i + 1] = (byte)(p[i + 1] * (1 - k) + bufG[n / 2] * k); o[i + 2] = (byte)(p[i + 2] * (1 - k) + bufR[n / 2] * k);
      l[q] = (byte)bufB[n / 2]; l[q + 1] = (byte)bufG[n / 2]; l[q + 2] = (byte)bufR[n / 2]; l[q + 3] = (byte)(255 * k);
    }
    var ob = Maak(W, H, o); ob.Save(dst, ImageFormat.Png); ob.Dispose(); var lb = Maak(W, H, l); lb.Save(lap, ImageFormat.Png); lb.Dispose(); b.Dispose();
  }

  // A over B leggen (zelfde maat); resultaat ondoorzichtig.
  public static void Over(string onder, string boven, string dst) {
    var a = new Bitmap(onder); var b = Image.FromFile(boven); var c = new Bitmap(a.Width, a.Height, PixelFormat.Format32bppArgb); var g = Graphics.FromImage(c);
    g.DrawImage(a, 0, 0, a.Width, a.Height); g.DrawImage(b, 0, 0, a.Width, a.Height); g.Dispose(); c.Save(dst, ImageFormat.Png); c.Dispose(); a.Dispose(); b.Dispose();
  }

  // Kasteellaag uit een (bijgeschilderde) compositie: boven 'naad' het silhouet van de uitsnede, daaronder het hele
  // gebied tot xMax/yMax ondoorzichtig, met zachte randen rechts en onder.
  public static void KasteelLaag(string compositie, string uitsnede, string dst, int naad, int overgang, int xMax, int yMax, int veer) {
    var c = new Bitmap(compositie); int s; var p = Lees(c, out s); var u = new Bitmap(uitsnede); int su; var pu = Lees(u, out su);
    int W = c.Width, H = c.Height; var o = new byte[W * H * 4];
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      int i = y * s + x * 4, q = (y * W + x) * 4;
      double silhouet = pu[y * su + x * 4 + 3] / 255.0;
      double vlak = (x < xMax && y < yMax) ? Math.Min(1, Math.Min((xMax - x) / (double)veer, (yMax - y) / (double)veer)) : 0;
      double t = Math.Max(0, Math.Min(1, (y - naad) / (double)overgang));   // 0 boven de naad, 1 eronder
      double a = Math.Max(silhouet, vlak * t);
      o[q] = p[i]; o[q + 1] = p[i + 1]; o[q + 2] = p[i + 2]; o[q + 3] = (byte)(255 * Math.Max(0, Math.Min(1, a)));
    }
    var ob = Maak(W, H, o); ob.Save(dst, ImageFormat.Png); ob.Dispose(); c.Dispose(); u.Dispose();
  }

  // Kasteellaag: silhouet van de uitsnede plus het bijgeschilderde voetgebied (wit in 'masker'), dat zacht uitloopt.
  public static void KasteelMasker(string compositie, string uitsnede, string masker, string dst, int blur) {
    var c = new Bitmap(compositie); int s; var p = Lees(c, out s); var u = new Bitmap(uitsnede); int su; var pu = Lees(u, out su);
    var mk = new Bitmap(masker); int sm; var pm = Lees(mk, out sm); int W = c.Width, H = c.Height;
    var m = new float[W * H]; for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) m[y * W + x] = pm[y * sm + x * 4 + 2] / 255f;
    m = Vervaag(Vervaag(m, W, H, blur), W, H, blur);
    var o = new byte[W * H * 4];
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      int i = y * s + x * 4, q = (y * W + x) * 4;
      double a = Math.Max(pu[y * su + x * 4 + 3] / 255.0, Math.Min(1, m[y * W + x] * 1.4));
      o[q] = p[i]; o[q + 1] = p[i + 1]; o[q + 2] = p[i + 2]; o[q + 3] = (byte)(255 * a);
    }
    var ob = Maak(W, H, o); ob.Save(dst, ImageFormat.Png); ob.Dispose(); c.Dispose(); u.Dispose(); mk.Dispose();
  }

  public static void Plaats(string src, string dst, int ox, int oy) {
    var c = new Bitmap(1536, 1024, PixelFormat.Format32bppArgb); var g = Graphics.FromImage(c); g.Clear(Color.Transparent);
    var im = Image.FromFile(src); g.DrawImage(im, new Rectangle(ox, oy, im.Width, im.Height)); g.Dispose(); im.Dispose(); c.Save(dst, ImageFormat.Png); c.Dispose();
  }

  // Gesneden letters op het bord, als oranje gloeilaag.
  public static string Letters(string src, string dst, int x0, int y0, int x1, int y1) {
    var b = new Bitmap(src); int s; var p = Lees(b, out s); int W = b.Width, H = b.Height; var o = new byte[W * H * 4]; int n = 0;
    for (int y = y0; y < y1; y++) for (int x = x0; x < x1; x++) {
      int i = y * s + x * 4; int bb = p[i], g = p[i + 1], r = p[i + 2], al = p[i + 3];
      if (al < 200 || r < 120 || r < g || g < 70 || bb > 120) continue; double k = Math.Min(1.0, (r - 120) / 70.0);
      int q = (y * W + x) * 4; o[q] = 40; o[q + 1] = 120; o[q + 2] = 255; o[q + 3] = (byte)(255 * k); n++;
    }
    var ob = Maak(W, H, o); ob.Save(dst, ImageFormat.Png); ob.Dispose(); b.Dispose(); return n + " px";
  }
}
