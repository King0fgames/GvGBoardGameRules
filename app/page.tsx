// fixing structure + sidebar + command skills formatting

"use client";

import { useEffect, useMemo, useState } from "react";

const R = (t: string) => <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-300">{t}</span>;
const B = (t: string) => <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-300">{t}</span>;
const N = (t: string) => <strong>{t}</strong>;

type Section = { id: string; title: string; content: React.ReactNode };

export default function Page() {
  const sections: Section[] = useMemo(() => [

    {
      id: "boss",
      title: "Boss",
      content: (
        <>
          <p>Spawns on ⏰ {N("Turn 15")} and ⏰ {N("Turn 45")}</p>
          <p>HP: ♥ ♥ ♥ x{N("3")}</p>
          <p>Defense: 🎲</p>
          <p>Reward: 🟡 {N("2")} coins</p>
        </>
      )
    },

    {
      id: "coins",
      title: "Coins",
      content: (
        <>
          <p>Earned from Jungle and Boss</p>
          <p>Shown by drums above Base</p>
        </>
      )
    },

    {
      id: "skills",
      title: "Command Skills",
      content: (
        <div className="space-y-2">
          <p>Captain must send usage to game master before or by movement phase</p>
          <p>Cooldown: ⏰ {N("3 turns")}</p>
          <p>Duration: ⏰ {N("1 turn")}</p>

          <div className="pt-2 space-y-1">
            <p><strong>Player Speed — 🟡 {N("1")}</strong>: {N("+3")} movement</p>
            <p><strong>Healing Reduction — 🟡 {N("1")}</strong>: disable healer bonuses</p>
            <p><strong>Bulwark Damage — 🟡 {N("1")}</strong>: {N("+4")} vs Bulwarks</p>
            <p><strong>Fish Damage — 🟡 {N("1")}</strong>: {N("+4")} vs Fish</p>
            <p><strong>City Protection — 🟡 {N("2")}</strong>: negate structure damage</p>
            <p><strong>Tree Speed — 🟡 {N("2")}</strong>: double Tree movement</p>
            <p><strong>Ballista — 🟡 {N("1")}</strong>: {N("2 uses")}, teleport anywhere for movement, cannot act</p>
          </div>
        </div>
      )
    },

    {
      id: "status",
      title: "Status",
      content: (
        <>
          <p>Knocked Down lasts {N("1 turn")}</p>
          <p>Player skips that turn</p>
          <p>If revived → next turn from same square</p>
          <p>If not → respawn at Base next turn</p>
        </>
      )
    },

    {
      id: "halftime",
      title: "Halftime",
      content: (
        <>
          <p>Occurs on ⏰ {N("Turn 30")}</p>
          <p>Coins respawn</p>
          <p>Archery Duel: BO{N("5")}, closest scores {N("1")}, first to {N("3")} wins 🟡 {N("2")}</p>
        </>
      )
    }

  ], []);

  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOpen(Object.fromEntries(sections.map(s => [s.id, true])));
  }, [sections]);

  const toggle = (id: string) => setOpen(p => ({...p, [id]: !p[id]}));

  return (
    <div className="flex">

      {/* sidebar now sticky */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-zinc-800 p-4">
        <h1 className="mb-4 font-bold">WWM GvG<br/>Board Game</h1>
        {sections.map(s => (
          <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView()} className="block mb-2">
            {s.title}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6 space-y-4">
        {sections.map(s => (
          <section key={s.id} id={s.id} className="border border-zinc-800 rounded p-4">
            <button onClick={() => toggle(s.id)} className="font-bold w-full text-left">
              {s.title}
            </button>
            {open[s.id] && <div className="mt-2">{s.content}</div>}
          </section>
        ))}
      </main>

    </div>
  );
}
