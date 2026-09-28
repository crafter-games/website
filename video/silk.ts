// Violet silk: domain-warped fbm bands, a brand dot grid lit by the silk, a per-shot
// accent tint, a soft kick pulse, vignette and static grain.
export const SILK = /* wgsl */ `
struct P { time: f32, kick: f32, mixT: f32, pad: f32, tint: vec4f }
@group(0) @binding(0) var<uniform> p: P;

fn pcg(v: u32) -> u32 {
  let s = v * 747796405u + 2891336453u;
  let w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u;
  return (w >> 22u) ^ w;
}
fn h2(i: vec2i) -> f32 { return f32(pcg(bitcast<u32>(i.x) ^ pcg(bitcast<u32>(i.y)))) / 4294967295.0; }
fn noise(x: vec2f) -> f32 {
  let i = vec2i(floor(x));
  let f = fract(x);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h2(i), h2(i + vec2i(1, 0)), u.x), mix(h2(i + vec2i(0, 1)), h2(i + vec2i(1, 1)), u.x), u.y);
}
fn fbm(x0: vec2f) -> f32 {
  var x = x0;
  var v = 0.0;
  var a = 0.5;
  for (var o = 0; o < 5; o++) {
    v += a * noise(x);
    x = mat2x2f(1.6, 1.2, -1.2, 1.6) * x + vec2f(3.1, 7.7);
    a *= 0.5;
  }
  return v;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let asp = vec2f(16.0 / 9.0, 1.0);
  let q = uv * asp;
  let t = p.time * 0.06;

  // two warps give long, soft, folded bands
  let w1 = vec2f(fbm(q * 0.7 + vec2f(t, -t * 0.7)), fbm(q * 0.7 + vec2f(4.3, 2.1) - t));
  let w2 = vec2f(fbm(q * 0.6 + 1.8 * w1 + vec2f(1.7, 9.2) + t * 0.5), fbm(q * 0.6 + 1.8 * w1 + vec2f(8.3, 2.8)));
  let n = fbm(q * 0.5 + 2.0 * w2);
  let band = 0.5 + 0.5 * sin(6.2831 * (n * 1.4 + uv.x * 0.35 - t * 0.8));
  let silk = smoothstep(0.15, 0.95, n) * (0.55 + 0.45 * band);

  let ink = vec3f(0.039, 0.039, 0.051);
  let deep = vec3f(0.12, 0.06, 0.26);
  let violet = vec3f(0.663, 0.439, 1.0);
  let accent = mix(violet, p.tint.rgb, p.mixT);
  var col = mix(ink, deep, smoothstep(0.1, 0.7, silk));
  col += accent * pow(silk, 3.0) * 0.45;
  col += violet * pow(band * silk, 6.0) * 0.25;

  // dot grid, 28px pitch on 1080p, brightened by the silk underneath
  let px = uv * vec2f(1920.0, 1080.0);
  let cell = fract(px / 28.0) - 0.5;
  let dot = 1.0 - smoothstep(0.045, 0.085, length(cell));
  col += vec3f(0.42, 0.32, 0.7) * dot * (0.05 + 0.35 * silk);

  col *= 1.0 + 0.12 * p.kick;
  let v = length((uv - 0.5) * vec2f(1.0, 0.85));
  col *= 1.0 - 0.75 * v * v;
  let g = h2(vec2i(px)) - 0.5;
  col += g * 0.03;
  return vec4f(clamp(col, vec3f(0.0), vec3f(1.0)), 1.0);
}
`;
