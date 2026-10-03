import zlib, struct, math, time

"""
Apple Minimalist Icon Generator for Gastherme / Heizkosten Tracker.
Generates pixel-perfect icons with Apple Human Interface Guidelines:
- Deep obsidian space black canvas with subtle ambient warm glow
- Golden ratio continuous curvature Apple flame glyph
- Negative-space stencil cutout for instant icon recognition
- Full-bleed square geometry optimized for iOS Home Screen squircle masking on iPhone 15 Pro Max
"""

def cubic_bezier(p0, p1, p2, p3, steps=50):
    pts = []
    for i in range(steps):
        t = i / steps
        t2 = t * t
        t3 = t2 * t
        mt = 1 - t
        mt2 = mt * mt
        mt3 = mt2 * mt
        x = mt3 * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t3 * p3[0]
        y = mt3 * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t3 * p3[1]
        pts.append((x, y))
    return pts

def build_apple_flame():
    curves = [
        # Main crest (268, 92) down right flank
        ((268, 92),  (288, 120), (322, 175), (348, 235)),
        ((348, 235), (368, 285), (372, 335), (364, 370)),
        ((364, 370), (352, 412), (312, 436), (256, 436)),
        # Bottom around to left flank
        ((256, 436), (200, 436), (160, 412), (148, 370)),
        ((148, 370), (140, 335), (144, 285), (164, 235)),
        # Up to secondary crest
        ((164, 235), (180, 195), (198, 165), (212, 146)),
        # Over secondary crest into valley
        ((212, 146), (218, 138), (228, 146), (236, 168)),
        ((236, 168), (244, 192), (250, 206), (256, 206)),
        # Up inner edge of main tongue to apex
        ((256, 206), (262, 206), (268, 192), (272, 165)),
        ((272, 165), (276, 140), (272, 112), (268, 92)),
    ]
    poly = []
    for c in curves:
        poly.extend(cubic_bezier(c[0], c[1], c[2], c[3], steps=50))
    poly.append((268, 92))
    return poly

def build_apple_droplet():
    curves = [
        ((256, 270), (266, 290), (284, 320), (284, 348)),
        ((284, 348), (284, 376), (272, 396), (256, 396)),
        ((256, 396), (240, 396), (228, 376), (228, 348)),
        ((228, 348), (228, 320), (246, 290), (256, 270)),
    ]
    poly = []
    for c in curves:
        poly.extend(cubic_bezier(c[0], c[1], c[2], c[3], steps=40))
    poly.append((256, 270))
    return poly

FLAME_POLY = build_apple_flame()
DROP_POLY = build_apple_droplet()

def lerp_color(stops, t):
    t = max(0.0, min(1.0, t))
    for i in range(len(stops) - 1):
        pos1, c1 = stops[i]
        pos2, c2 = stops[i + 1]
        if pos1 <= t <= pos2:
            f = (t - pos1) / (pos2 - pos1) if pos2 > pos1 else 0
            return (
                int(c1[0] + (c2[0] - c1[0]) * f),
                int(c1[1] + (c2[1] - c1[1]) * f),
                int(c1[2] + (c2[2] - c1[2]) * f),
            )
    return stops[-1][1]

# Apple signature fire gradient
FLAME_STOPS = [
    (0.00, (255, 230, 0)),    # Bright pure gold
    (0.16, (255, 180, 0)),    # Warm amber gold
    (0.42, (255, 110, 0)),    # Radiant orange
    (0.72, (255, 59, 48)),    # Apple Red
    (1.00, (215, 20, 45)),    # Crimson
]

def render_apple_icon(size):
    t0 = time.time()
    scale = size / 512.0
    poly_f = [(x * scale, y * scale) for x, y in FLAME_POLY]
    poly_d = [(x * scale, y * scale) for x, y in DROP_POLY]

    def to_edges(poly):
        edges = []
        for i in range(len(poly) - 1):
            p1 = poly[i]
            p2 = poly[i + 1]
            if p1[1] != p2[1]:
                edges.append((min(p1[1], p2[1]), max(p1[1], p2[1]), p1[0], p1[1], p2[0], p2[1]))
        return edges

    f_edges = to_edges(poly_f)
    d_edges = to_edges(poly_d)

    def scanline_coverage(y_sub, edges):
        xs = []
        for ymin, ymax, x1, y1, x2, y2 in edges:
            if ymin <= y_sub < ymax:
                x = (y_sub - y1) * (x2 - x1) / (y2 - y1) + x1
                xs.append(x)
        xs.sort()
        spans = []
        for i in range(0, len(xs) - 1, 2):
            spans.append((xs[i], xs[i + 1]))
        return spans

    SUB = 3
    SUB_W = 1.0 / (SUB * SUB)

    raw = bytearray()
    cx = size / 2.0
    cy = size / 2.0
    glow_cy = size * 0.58
    glow_rad = size * 0.44

    for py in range(size):
        raw.append(0)
        norm_y = py / float(size)

        f_sub = [scanline_coverage(py + (sy + 0.5) / SUB, f_edges) for sy in range(SUB)]
        d_sub = [scanline_coverage(py + (sy + 0.5) / SUB, d_edges) for sy in range(SUB)]

        for px in range(size):
            # 1. Background: Apple Space Black Graphite (#1a1a1e to #08080a)
            bg_base = 26 - int(norm_y * 18)
            r = bg_base
            g = bg_base - 1
            b = bg_base + 3

            # Top rim light (subtle Apple glass reflection)
            if py < 2:
                rim = (2 - py) * 0.12
                r = int(r + 255 * rim)
                g = int(g + 255 * rim)
                b = int(b + 255 * rim)

            # Ambient glow behind flame
            dist_g = math.hypot(px - cx, py - glow_cy)
            if dist_g < glow_rad:
                gf = (1.0 - (dist_g / glow_rad)) ** 2.2
                r += int(255 * gf * 0.28)
                g += int(140 * gf * 0.18)
                b += int(10 * gf * 0.06)

            # Subpixel coverage
            cov_f = 0
            cov_d = 0
            for sy in range(SUB):
                sp_f = f_sub[sy]
                sp_d = d_sub[sy]
                for sx in range(SUB):
                    xs = px + (sx + 0.5) / SUB
                    for x1, x2 in sp_f:
                        if x1 <= xs <= x2:
                            cov_f += 1
                            break
                    for x1, x2 in sp_d:
                        if x1 <= xs <= x2:
                            cov_d += 1
                            break

            alpha_f = cov_f * SUB_W
            alpha_d = cov_d * SUB_W

            # Minimalist Stencil Cutout
            eff_flame_alpha = max(0.0, alpha_f - alpha_d)
            if eff_flame_alpha > 0:
                flame_top = 92.0 * scale
                flame_bot = 436.0 * scale
                t_flame = max(0.0, min(1.0, (py - flame_top) / (flame_bot - flame_top)))
                fr, fg, fb = lerp_color(FLAME_STOPS, t_flame)
                r = int(r * (1.0 - eff_flame_alpha) + fr * eff_flame_alpha)
                g = int(g * (1.0 - eff_flame_alpha) + fg * eff_flame_alpha)
                b = int(b * (1.0 - eff_flame_alpha) + fb * eff_flame_alpha)

            # Subtle inner ambient shadow inside the cutout
            if alpha_d > 0 and alpha_f > 0.5:
                r = max(0, int(r * 0.85))
                g = max(0, int(g * 0.85))
                b = max(0, int(b * 0.85))

            raw.extend((min(255, max(0, r)), min(255, max(0, g)), min(255, max(0, b)), 255))

    compressed = zlib.compress(bytes(raw), 9)
    def chunk(tag, data):
        c = tag + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    ihdr = struct.pack('>IIBBBBB', size, size, 8, 6, 0, 0, 0)
    png += chunk(b'IHDR', ihdr)
    png += chunk(b'IDAT', compressed)
    png += chunk(b'IEND', b'')
    print(f"Rendered {size}x{size} in {time.time() - t0:.2f}s")
    return png

if __name__ == '__main__':
    targets = [
        (512, 'icon-512.png'),
        (192, 'icon-192.png'),
        (180, 'apple-touch-icon.png'),
        (64, 'favicon.png'),
    ]
    for size, filename in targets:
        print(f"Generating Apple Minimalist {filename} ({size}x{size})...")
        png_bytes = render_apple_icon(size)
        with open(filename, 'wb') as f:
            f.write(png_bytes)
    print("All Apple minimalist PNG icons generated successfully!")
