"use client";

import { useEffect, useMemo, useState } from "react";

const R = (t: string) => <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-300">{t}</span>;
const B = (t: string) => <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-300">{t}</span>;
const N = (t: string) => <strong className="text-white">{t}</strong>;

type Section = { id: string; title: string; content: React.ReactNode };

export default function BoardGameRulesPage() {
  const sections: Section[] = useMemo(
    () => [
      {
        id: "overview",
        title: "Game Overview",
        content: (
          <>
            <p>{N("5v5")} team-based board game.</p>
            <p>Each team selects a <strong>Team Captain</strong> who declares the end of the strategy phase and announces Command Skill usage.</p>
          </>
        ),
      },
      {
        id: "win-condition",
        title: "Win Condition",
        content: <p>A team wins by capturing the Tree and returning it to their Base.</p>,
      },
      {
        id: "roles",
        title: "Roles",
        content: (
          <div className="space-y-5">
            <p>Each player selects one role for the match.</p>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">🗡️ DPS</h3>
              <p>{N("+2")} to {R("offensive")} rolls vs players in open tiles and when attacking Bulwarks or Fish.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">🛡️ Tank</h3>
              <p>{N("+2")} to {B("defensive")} rolls when defending Bulwark, Fish, or Tree.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">🍃 Healer</h3>
              <p><strong>Buff:</strong> Add {N("+2")} to each allied player within {N("1")} square. Healer does not roll. If not on the same tile, cannot be targeted.</p>
              <p><strong>Revive:</strong> Revive allies within {N("1")} square.</p>
              <p><strong>Act Normally:</strong> Roll 🎲.</p>
            </div>
          </div>
        ),
      },
      {
        id: "structures",
        title: "Structures",
        content: (
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">Bulwarks</h3>
              <p>HP: ♥ ♥ ♥ x{N("3")}</p>
              <p>Defense: 🎲</p>
              <p>Each {R("attack")} removes {N("1")} HP.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">Fish</h3>
              <p>HP: ♥ ♥ ♥ ♥ ♥ ♥ x{N("6")}</p>
              <p>{N("1")} Bulwark destroyed: 🎲 + {N("2")}</p>
              <p>{N("2")} Bulwarks destroyed: 🎲</p>
              <p>{N("3")} Bulwarks destroyed: 🎲 - {N("2")}</p>
              <p>Each {R("attack")} removes {N("1")} HP.</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">Tree</h3>
              <p>Pick up as action. Return to Base to win.</p>
              <p>Movement: {N("2")} per turn.</p>
              <p>If enemies are on the Tree’s tile at the start of the movement phase → movement is {N("1")}.</p>
              <p>Tree adds {N("+2")} to total {B("defensive")} roll.</p>
              <p>If defense loses → carrier drops Tree and is knocked down.</p>
            </div>
          </div>
        ),
      },
      {
        id: "boss",
        title: "Boss",
        content: (
          <div>
            <p>Spawns on ⏰ {N("Turn 15")} and ⏰ {N("Turn 45")}</p>
            <p>HP: ♥ ♥ ♥ x{N("3")}</p>
            <p>Defense: 🎲</p>
            <p>Reward: 🟡 {N("2")} coins</p>
          </div>
        ),
      },
      {
        id: "coins",
        title: "Coins",
        content: (
          <div>
            <p>Earned from Jungle and Boss.</p>
            <p>Shown by drums above Base.</p>
          </div>
        ),
      },
      {
        id: "skills",
        title: "Command Skills",
        content: (
          <div className="space-y-2">
            <p>Captain must send skill usage to game master before or by movement phase.</p>
            <p>Cooldown: ⏰ {N("3 turns")}</p>
            <p>Duration: ⏰ {N("1 turn")}</p>

            <p><strong>Player Speed — 🟡 {N("1")}</strong>: {N("+3")} movement</p>
            <p><strong>Healing Reduction — 🟡 {N("1")}</strong>: disables healer bonuses</p>
            <p><strong>Bulwark Damage — 🟡 {N("1")}</strong>: {N("+4")} vs Bulwarks</p>
            <p><strong>Fish Damage — 🟡 {N("1")}</strong>: {N("+4")} vs Fish</p>
            <p><strong>City Protection — 🟡 {N("2")}</strong>: negate structure damage</p>
            <p><strong>Tree Speed — 🟡 {N("2")}</strong>: double Tree speed</p>
            <p><strong>Ballista — 🟡 {N("1")}</strong>: {N("2 uses")}, teleport anywhere on board for movement, cannot act</p>
          </div>
        ),
      },
      {
        id: "status",
        title: "Status",
        content: (
          <div>
            <p>Knocked Down lasts {N("1 turn")}.</p>
            <p>Player skips that turn.</p>
            <p>If revived → continue next turn from same square.</p>
            <p>If not → respawn at Base next turn.</p>
          </div>
        ),
      },
      {
        id: "halftime",
        title: "Halftime",
        content: (
          <div>
            <p>Occurs on ⏰ {N("Turn 30")}</p>
            <p>Coins respawn.</p>
            <p>Archery Duel: best of {N("5")}. Each round, closest to center scores {N("1")} point. First to {N("3")} wins 🟡 {N("2")} coins.</p>
          </div>
        ),
      },
    ],
    []
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((section) => [section.id, true]))
  );
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  useEffect(() => {
    setOpenSections(Object.fromEntries(sections.map((section) => [section.id, true])));
  }, [sections]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAndJump = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: true }));
    setHighlightedSection(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
    setTimeout(() => setHighlightedSection(null), 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 border-r border-zinc-800 p-4 lg:block">
          <h1 className="mb-4 text-2xl font-bold">WWM GvG<br/>Board Game</h1>
          {sections.map((s) => (
            <button key={s.id} onClick={() => expandAndJump(s.id)} className="block mb-2 text-left">
              {s.title}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className={`mb-4 transition ${highlightedSection===s.id?"ring-2 ring-yellow-300":""}`}>
              <button onClick={() => toggleSection(s.id)} className="w-full text-left font-bold">
                {s.title}
              </button>
              {openSections[s.id] && <div className="mt-2">{s.content}</div>}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
