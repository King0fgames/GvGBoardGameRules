"use client";

import { useEffect, useMemo, useState } from "react";

const R = (t: string) => <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-300">{t}</span>;
const B = (t: string) => <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-300">{t}</span>;
const N = (t: string) => <strong className="text-white">{t}</strong>;

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

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
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>{N("+2")} to {R("offensive")} rolls against players in open tiles.</li>
                <li>{N("+2")} to {R("offensive")} rolls when attacking Bulwarks or Fish.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">🛡️ Tank</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>{N("+2")} to {B("defensive")} rolls when defending a Bulwark, Fish, or Tree.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">🍃 Healer</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Buff</strong>
                  <ul className="mt-1 list-disc space-y-1 pl-6">
                    <li>Add {N("+2")} to each allied player’s roll within {N("1")} square.</li>
                    <li>The Healer does not roll.</li>
                    <li>If not on the same tile, the Healer cannot be targeted or knocked down.</li>
                  </ul>
                </li>
                <li><strong>Revive:</strong> Revive allies within {N("1")} square.</li>
                <li><strong>Act Normally:</strong> Roll 🎲.</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: "setup",
        title: "Setup",
        content: (
          <ul className="list-disc space-y-1 pl-6">
            <li>Teams begin at their respective Base.</li>
            <li>Players may exit from any of the {N("3")} stair platforms.</li>
          </ul>
        ),
      },
      {
        id: "turn-structure",
        title: "Turn Structure",
        content: (
          <ol className="list-decimal space-y-2 pl-6">
            <li><strong>Command Phase:</strong> Team Captains may activate Command Skills. Skills must be declared before movement.</li>
            <li><strong>Movement Phase:</strong> Each player rolls 🎲 and may move up to that many spaces. All movement resolves simultaneously.</li>
            <li><strong>Action Phase:</strong> All tiles resolve simultaneously based on final player positions.</li>
          </ol>
        ),
      },
      {
        id: "combat",
        title: "Combat",
        content: (
          <div className="space-y-3">
            <p>Each tile resolves as a separate battle.</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>{R("Attacking")} totals vs. {B("Defending")} totals.</li>
              <li>The higher total wins.</li>
              <li><strong>Open Tile PvP tie:</strong> Stalemate.</li>
              <li><strong>Structure PvE tie:</strong> Player win.</li>
              <li><strong>Structure PvP tie:</strong> Structure win.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "tile-interactions",
        title: "Tile Interactions",
        content: (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Open Combat</h3>
              <p>Players on the same tile fight using the standard combat rules.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Jungle (Drum / Coin Tiles)</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>If uncontested, the player gains the coin.</li>
                <li>If contested, combat occurs. The winner gains the coin and the losers are knocked down.</li>
                <li>Jungle coins respawn on Halftime, at ⏰ {N("Turn 30")}.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Defending Structures</h3>
              <p>Players on a {B("friendly")} structure roll and add their results to that structure’s defense.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Attacking Structures</h3>
              <p>Players on an {R("enemy")} structure contribute their rolls and bonuses to the attacking total.</p>
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
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>HP: ♥ ♥ ♥ x{N("3")}</li>
                <li>Defense: 🎲</li>
                <li>Each {R("attack")} removes {N("1")} HP.</li>
                <li>At least {N("1")} Bulwark must be destroyed before the Fish can be attacked.</li>
                <li>If {B("defenders")} win, {R("attackers")} are knocked down.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">Fish</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>HP: ♥ ♥ ♥ ♥ ♥ ♥ x{N("6")}</li>
                <li>
                  Defense by destroyed Bulwarks:
                  <ul className="mt-1 list-disc space-y-1 pl-6">
                    <li>{N("1")} Bulwark destroyed: 🎲 + {N("2")}</li>
                    <li>{N("2")} Bulwarks destroyed: 🎲</li>
                    <li>{N("3")} Bulwarks destroyed: 🎲 - {N("2")}</li>
                  </ul>
                </li>
                <li>Each {R("attack")} removes {N("1")} HP.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
              <h3 className="text-lg font-semibold">Tree</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>A player may pick up the Tree as their action.</li>
                <li>The Tree must be carried back to Base to win.</li>
                <li>Movement: {N("2")} spaces per turn.</li>
                <li>If enemies are on the same tile at the start of the turn, the Tree Carrier moves {N("1")} space instead.</li>
                <li>The Tree gives its carrier {N("+2")} to {B("defensive")} rolls.</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: "boss",
        title: "Boss",
        content: (
          <ul className="list-disc space-y-1 pl-6">
            <li>The Boss spawns on ⏰ {N("Turn 15")} and again on ⏰ {N("Turn 45")}.</li>
            <li>HP: ♥♥♥ #{N("3")}</li>
            <li>Defense: 🎲</li>
            <li>Reward: 🪙 {N("2")} coins.</li>
          </ul>
        ),
      },
      {
        id: "coins-skills",
        title: "Coins & Command Skills",
        content: (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold">Coins</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Coins are earned from Jungle Drums and Boss kills.</li>
                <li>Coins persist until used.</li>
                <li>Coins are used to activate Command Skills.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Command Skills</h3>
              <p className="mb-2 text-zinc-400">Declared before movement. The Team Captain sends the choice to the game master. Each skill has a ⏰ {N("3-turn")} cooldown. Each skill lasts ⏰ {N("1 turn")} unless noted otherwise.</p>
              <ul className="list-disc space-y-1 pl-6">
                <li><strong>Player Speed — 🪙 {N("1 coin")}:</strong> {N("+3")} to all player movement rolls.</li>
                <li><strong>Healing Reduction — 🪙 {N("1 coin")}:</strong> Negates all enemy healer bonuses.</li>
                <li><strong>Bulwark Damage — 🪙 {N("1 coin")}:</strong> {N("+4")} to total {R("attack")} rolls against Bulwarks.</li>
                <li><strong>Fish Damage — 🪙 {N("1 coin")}:</strong> {N("+4")} to total {R("attack")} rolls against Fish.</li>
                <li><strong>City Protection — 🪙 {N("2 coins")}:</strong> All attacks against Bulwarks and Fish are negated.</li>
                <li><strong>Tree Speed — 🪙 {N("2 coins")}:</strong> The Tree Carrier’s movement is doubled.</li>
                <li><strong>Ballista Charges — 🪙 {N("1 coin")}:</strong> {N("2 uses")} total, does not expire. Players starting at Base may teleport anywhere on the board for their movement, but cannot act that turn.</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: "status-effects",
        title: "Status Effects",
        content: (
          <ul className="list-disc space-y-1 pl-6">
            <li>A knocked-down player skips their next turn’s movement and action.</li>
            <li>If not revived, they respawn at Base on the following turn.</li>
          </ul>
        ),
      },
      {
        id: "halftime",
        title: "Halftime",
        content: (
          <ul className="list-disc space-y-1 pl-6">
            <li>Halftime occurs on ⏰ {N("Turn 30")}.</li>
            <li>All Jungle coins respawn.</li>
            <li>Archery Duel reward: 🪙 {N("2 coins")}.</li>
          </ul>
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
    window.setTimeout(() => setHighlightedSection((prev) => (prev === id ? null : prev)), 1800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 p-4 lg:block">
          <div className="sticky top-4">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
            <h1 className="mb-4 whitespace-nowrap text-[1.7rem] font-bold leading-tight">WWM GvG Board Game</h1>
            <nav className="space-y-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => expandAndJump(s.id)}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="pointer-events-none fixed left-3 top-3 z-30 lg:hidden">
            <details className="pointer-events-auto relative">
              <summary className="cursor-pointer list-none rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-4 py-3 font-semibold shadow-2xl shadow-black/30">☰ Sections</summary>
              <div className="absolute left-0 z-20 mt-3 max-h-[70vh] w-[min(18rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl shadow-black/40">
                <div className="space-y-2">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => expandAndJump(s.id)}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="mb-6 pt-14 lg:hidden">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
              <h1 className="mt-1 text-3xl font-bold">WWM GvG Board Game</h1>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((s) => {
              const isOpen = openSections[s.id];
              return (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div className={`overflow-hidden rounded-3xl border bg-zinc-900/60 shadow-xl transition-all duration-500 ${highlightedSection === s.id ? "border-amber-300 shadow-[0_0_0_3px_rgba(252,211,77,0.25)] shadow-amber-200/10" : "border-zinc-800 shadow-black/10"}`}>
                    <button
                      type="button"
                      onClick={() => toggleSection(s.id)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <h2 className="text-xl font-semibold">{s.title}</h2>
                      <span className={`rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400 transition ${isOpen ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>
                    {isOpen && <div className="border-t border-zinc-800 px-6 py-5 leading-7 text-zinc-300">{s.content}</div>}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
