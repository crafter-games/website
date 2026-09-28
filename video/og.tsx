import { SILK } from "./silk";

const F = "fonts";
const PAPER = "#f2eee8";
const VIOLET = "#a970ff";
const MUTE = "#9a97a3";
const TILES = [
  ["assets/og-smash.jpg", "#FFB23F"],
  ["assets/og-ones.jpg", "#9BE08A"],
  ["assets/og-iris.jpg", "#6FE3EC"],
  ["assets/og-learn-claude.jpg", "#FF7A4D"],
  ["assets/og-learn-aws.jpg", "#FFD23F"],
];

export default (
  <scene size={[1920, 1080]} tier="rich" bpm={60} beats={1} grid={false} bg="#0a0a0d" fonts={{ xb: `${F}/Bricolage-800.ttf`, mono: `${F}/GeistMono-600.ttf` }}>
    <shader id="silk" wgsl={SILK} uniforms={() => ({ p: { time: 14, kick: 0, mixT: 0, pad: 0, tint: [0.663, 0.439, 1, 0] } })} />
    <box left={102} top={90} direction="row" align="center" gap={26}>
      <image src="assets/logo.png" width={90} height={90} radius={22} />
      <text font="mono" size={48} color={PAPER} tracking={0.14} nowrap>CRAFTER GAMES</text>
    </box>
    <box left={102} top={236} direction="column" gap={0}>
      <text font="xb" size={166} color={PAPER} tracking={-0.05} lineHeight={0.92} nowrap>Jugamos lo que</text>
      <text font="xb" size={166} color={VIOLET} tracking={-0.05} lineHeight={0.92} nowrap>shipeamos.</text>
    </box>
    <text left={102} top={640} font="mono" size={44} color={MUTE} tracking={0.08} nowrap>JUEGOS RECREATIVOS Y EDUCATIVOS · HECHOS EN PERÚ</text>
    <box left={102} top={730} direction="row" gap={22}>
      {TILES.map(([src, c]) => (
        <box padding={5} radius={22} bg={c}>
          <image src={src} width={326} height={184} radius={18} fit="cover" />
        </box>
      ))}
    </box>
    <text right={102} top={112} font="mono" size={44} color={VIOLET} tracking={0.06} nowrap>games.crafter.run</text>
  </scene>
);
