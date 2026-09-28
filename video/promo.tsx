import { SILK } from "./silk";

const F = "fonts";
const INK = "#101014";
const PAPER = "#f2eee8";
const VIOLET = "#a970ff";
const MUTE = "#9a97a3";

type T = { t: number };
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const out3 = (x: number) => 1 - (1 - clamp(x)) ** 3;
const inOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);

// 120 BPM grid in seconds (bpm={60}): one bar = 2s.
const step = (from: number, to: number, every: number, off = 0) =>
  Array.from({ length: Math.round((to - from) / every) }, (_, i) => from + off + i * every).filter((t) => t < to);

const CUTS = [6, 10, 14, 18, 22, 26];
const ACCENTS = ["#FFB23F", "#9BE08A", "#6FE3EC", "#FF7A4D", "#FFD23F"];
const rgb = (h: string) => [1, 3, 5].map((i) => Number.parseInt(h.slice(i, i + 2), 16) / 255);
const kick = (t: number) => (t >= 6 && t < 29.5 && !(t >= 17.5 && t < 18) ? Math.exp(-((t * 2) % 1) * 6) : 0);
/** Accent of the shot on screen, eased in over half a second; violet outside the shots. */
const tintAt = (t: number) => {
  const i = CUTS.findIndex((c, k) => t >= c && t < (CUTS[k + 1] ?? 26));
  if (i < 0 || i > 4) return [0.663, 0.439, 1, 0];
  return [...rgb(ACCENTS[i]), 0.45 * out3((t - CUTS[i]) / 0.5)];
};
const WIN = { left: 568, top: 196, width: 1280, height: 720 };

/** Violet panel that sweeps across the frame, covering each cut. */
function Wipe({ at }: { at: number }) {
  const a = at - 0.3;
  return (
    <box
      in={a}
      out={at + 0.3}
      top={0}
      left={0}
      width={1920}
      height={1080}
      bg={VIOLET}
      glow={false}
      x={({ t }: T) => {
        const p = (t - a) / 0.6;
        return p < 0.5 ? -1920 * (1 - inOut(p * 2)) : 1920 * inOut((p - 0.5) * 2);
      }}
    />
  );
}

function Chrome({ from, to }: { from: number; to: number }) {
  return (
    <box in={from} out={to} top={0} left={0} width={1920} height={1080}>
      <box left={96} top={56} direction="row" align="center" gap={18}>
        <image src="assets/logo.png" width={56} height={56} radius={14} />
        <text font="mono" size={46} color={PAPER} tracking={0.14} nowrap>CRAFTER GAMES</text>
      </box>
      <text right={72} top={62} font="mono" size={46} color={MUTE} tracking={0.1} nowrap>
        {({ t }: T) => `${String(Math.max(1, CUTS.filter((c) => t >= c).length)).padStart(2, "0")} / 05`}
      </text>
      <text left={96} top={986} font="mono" size={46} color={MUTE} tracking={0.06} nowrap>games.crafter.run</text>
      <box right={72} top={1004} direction="row" gap={10}>
        {[0, 1, 2, 3, 4].map((i) => (
          <box width={64} height={8} radius={4} bg={({ t }: T) => (t >= CUTS[i] ? VIOLET : "#2a2a33")} />
        ))}
      </box>
    </box>
  );
}

function GameShot(props: {
  at: number;
  src: string;
  from: number;
  n: string;
  kind: string;
  name: string[];
  nameSize?: number;
  line: string[];
  accent: string;
}) {
  const { at, src, from, n, kind, name, nameSize = 88, line, accent } = props;
  const rise = ({ t }: T) => 60 * (1 - out3((t - at) / 0.7));
  const grow = ({ t }: T) => 0.94 + 0.06 * out3((t - at) / 0.7);
  return (
    <box in={at} out={at + 4} top={0} left={0} width={1920} height={1080}>
      <box left={96} top={WIN.top - 30} width={440} direction="column" gap={0}>
        <text font="xb" size={240} color={accent} tracking={-0.06} lineHeight={0.85} enter="slide-up" enterBeats={0.4} nowrap>{n}</text>
        <box height={20} />
        <text font="mono" size={46} color={accent} tracking={0.12} in={at + 0.25} enter="type" enterBeats={0.4} nowrap>{kind}</text>
        <box height={18} />
        {name.map((w, i) => (
          <text font="xb" size={nameSize} color={PAPER} tracking={-0.04} lineHeight={0.92} in={at + 0.35 + i * 0.1} enter="slide-up" enterBeats={0.35} nowrap>{w}</text>
        ))}
        <box height={16} />
        {line.map((w) => (
          <text font="sb" size={48} color={MUTE} lineHeight={1.1} in={at + 0.7} enter="fade" enterBeats={0.4} nowrap>{w}</text>
        ))}
      </box>
      <box left={WIN.left - 6} top={WIN.top - 6} width={WIN.width + 12} height={WIN.height + 12} y={rise} scale={grow}>
        <box top={0} left={0} width={WIN.width + 12} height={WIN.height + 12} radius={30} bg={accent} shadow={{ blur: 60, y: 24, color: "#000000", alpha: 0.55 }} />
        <clip src={src} from={from} top={6} left={6} width={WIN.width} height={WIN.height} radius={24} fit="cover" />
      </box>
    </box>
  );
}

const TILES = [
  { src: "assets/smash.mp4", from: 9, c: "#FFB23F" },
  { src: "assets/ones.mp4", from: 20, c: "#9BE08A" },
  { src: "assets/iris.mp4", from: 33, c: "#6FE3EC" },
  { src: "assets/learn-claude.mp4", from: 6, c: "#FF7A4D" },
  { src: "assets/learn-aws.mp4", from: 10, c: "#FFD23F" },
];

export default (
  <scene size={[1920, 1080]} tier="rich" bpm={60} beats={30} bg="#0a0a0d" fonts={{ xb: `${F}/Bricolage-800.ttf`, sb: `${F}/Bricolage-600.ttf`, mono: `${F}/GeistMono-600.ttf` }}>
    <shader id="silk" wgsl={SILK} uniforms={({ t }: T) => ({ p: { time: t, kick: kick(t), mixT: tintAt(t)[3], pad: 0, tint: tintAt(t) } })} />

    {/* 0-3 intro */}
    <card in={0} out={3} direction="column" gap={40}>
      <image src="assets/logo.png" width={240} height={240} radius={52} in={0.5} enter="pop" enterBeats={0.5} />
      <text font="xb" size={170} color={PAPER} tracking={-0.05} in={1} enter="slide-up" enterBeats={0.4} nowrap>Crafter Games</text>
      <text font="mono" size={46} color={VIOLET} tracking={0.14} in={2} enter="type" enterBeats={0.6} nowrap>POR CRAFTER STATION · HECHO EN PERÚ</text>
    </card>

    {/* 3-6 claim, one word per beat */}
    <box in={3} out={5.7} left={96} top={200} direction="column" gap={0}>
      <text font="xb" size={220} color={PAPER} tracking={-0.055} lineHeight={0.9} enter="slide-up" enterBeats={0.25} nowrap>Jugamos</text>
      <text font="xb" size={220} color={PAPER} tracking={-0.055} lineHeight={0.9} in={3.5} enter="slide-up" enterBeats={0.25} nowrap>lo que</text>
      <text font="xb" size={220} color={VIOLET} tracking={-0.055} lineHeight={0.9} in={4} enter="slide-up" enterBeats={0.25} nowrap>shipeamos.</text>
      <text font="mono" size={46} color={MUTE} tracking={0.1} in={4.5} enter="type" enterBeats={0.5} nowrap>5 JUEGOS · RECREATIVOS Y EDUCATIVOS</text>
    </box>

    <Chrome from={6} to={26} />
    <GameShot at={6} src="assets/smash.mp4" from={2} n="01" kind="PELEA" name={["Crafter", "Smash"]} line={["los crafters,", "a golpes"]} accent="#FFB23F" />
    <GameShot at={10} src="assets/ones.mp4" from={6} n="02" kind="ARTILLERÍA" name={["Craft", "Ones"]} line={["criaturas", "peruanas, 1v1"]} accent="#9BE08A" />
    <GameShot at={14} src="assets/iris.mp4" from={27} n="03" kind="VISUAL NOVEL" name={["Iris.exe"]} line={["citas y misterio", "en un Code Brew"]} accent="#6FE3EC" />
    <GameShot at={18} src="assets/learn-claude.mp4" from={0.4} n="04" kind="EDUCATIVO" name={["learn", "claude", "code"]} nameSize={80} line={["labs en la terminal"]} accent="#FF7A4D" />
    <GameShot at={22} src="assets/learn-aws.mp4" from={0.4} n="05" kind="EDUCATIVO" name={["learn", "aws"]} line={["aprueba AWS", "SAA-C03"]} accent="#FFD23F" />

    {/* 26-30 outro */}
    <box in={26} out={30} top={0} left={0} width={1920} height={1080} direction="column" align="center" justify="center" gap={56}>
      <box direction="row" gap={20}>
        {TILES.map((k, i) => (
          <box in={26 + i * 0.125} enter="pop" enterBeats={0.35} padding={4} radius={18} bg={k.c}>
            <clip src={k.src} from={k.from} width={320} height={180} radius={14} fit="cover" />
          </box>
        ))}
      </box>
      <text font="xb" size={170} color={PAPER} tracking={-0.05} in={26.75} enter="slide-up" enterBeats={0.35} nowrap>games.crafter.run</text>
      <text font="mono" size={46} color={VIOLET} tracking={0.14} in={27.5} enter="type" enterBeats={0.6} nowrap>GRATIS · EN EL NAVEGADOR · OPEN SOURCE</text>
    </box>

    {CUTS.map((c) => (
      <Wipe at={c} />
    ))}

    {/* beat: 120 BPM, build 0-6, drop at 6, breakdown 17.5-18, final hit 29.5 */}
    <audio sound="kick" at={[...step(0, 3, 1), ...step(3, 6, 0.5), ...step(6, 17.5, 0.5), ...step(18, 29.5, 0.5), 29.5]} gain={0.8} />
    <audio sound="snare" at={[...step(6, 17.5, 1, 0.5), ...step(18, 29, 1, 0.5), ...step(5, 6, 0.125), ...step(25.5, 26, 0.125)]} gain={0.55} />
    <audio sound="hat" at={[...step(2, 6, 0.5, 0.25), ...step(6, 17.5, 0.25), ...step(18, 29.5, 0.25)]} gain={0.22} />
    <audio sound="bass" at={[...step(6, 17.5, 0.5), ...step(18, 29.5, 0.5)]} notes={[33, 33, 45, 33, 36, 36, 48, 31]} gain={0.55} />
    <audio sound="pluck" at={[...step(0, 6, 0.25), ...step(17.5, 18, 0.125)]} notes={[69, 72, 76, 81, 72, 76, 79, 84]} gain={0.3} />
    <audio sound="pluck" at={step(6, 29.5, 0.25)} notes={[81, 76, 72, 76, 84, 79, 76, 79, 81, 76, 72, 69, 72, 76, 79, 76]} gain={0.2} />
    <audio sound="blip" at={CUTS} gain={0.5} />
  </scene>
);
