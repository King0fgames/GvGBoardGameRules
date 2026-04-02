"use client";

import { useEffect, useRef, useState } from "react";

const Red = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-300">{children}</span>
);

const Blue = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-300">{children}</span>
);

const Num = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-white">{children}</strong>
);

type Section = {
  id: string;
  title: string;
  content: (copyToClipboard: (value: string, label: string) => Promise<void>, copyMessage: string) => React.ReactNode;
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-3 w-3" aria-hidden="true" fill="currentColor">
    <rect x="6" y="4" width="9" height="9" rx="1.5" />
    <rect x="4" y="6" width="9" height="9" rx="1.5" />
  </svg>
);

const InlineCopyValue = ({
  value,
  label,
  copyToClipboard,
  copied,
}: {
  value: string;
  label: string;
  copyToClipboard: (value: string, label: string) => Promise<void>;
  copied: boolean;
}) => (
  <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
    <strong>{value}</strong>
    <button
      type="button"
      onClick={() => copyToClipboard(value, label)}
      aria-label={`Copy ${label.toLowerCase()}`}
      aria-pressed={copied}
      title={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-zinc-200 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:translate-y-px ${
        copied
          ? "border-emerald-400/70 bg-emerald-500/20 text-emerald-200"
          : "border-zinc-700 bg-zinc-900/90 hover:border-zinc-500 hover:bg-zinc-800"
      }`}
    >
      <CopyIcon />
    </button>
  </span>
);

const sections: Section[] = [
  {
    id: "overview",
    title: "Game Overview",
    content: (copyToClipboard, copyMessage) => (
      <div className="space-y-2">
        <p><Num>5v5</Num> team-based board game.</p>
        <p>The game lasts a maximum of <Num>60 turns</Num>.</p>
        <p>
          The game is built in the{" "}
          <InlineCopyValue
            value="ImmortalJade"
            label="Guild name"
            copyToClipboard={copyToClipboard}
            copied={copyMessage === "Guild name copied"}
          />{" "}
          guild base. GM UID is{" "}
          <InlineCopyValue
            value="1044872392"
            label="GM UID"
            copyToClipboard={copyToClipboard}
            copied={copyMessage === "GM UID copied"}
          />.
        </p>
        {copyMessage && <p className="text-sm font-medium text-emerald-300">{copyMessage}</p>}
      </div>
    ),
  },
  {
    id: "win-condition",
    title: "Win Condition",
    content: () => (
      <div className="space-y-2">
        <p>A team wins by capturing the 🍁 Tree and returning it to their Base.</p>
        <p>If no team has captured the 🍁 Tree by <Num>Turn 60</Num>, the team with the furthest 🍁 Tree wins.</p>
      </div>
    ),
  },
  {
    id: "roles",
    title: "Roles",
    content: () => (
      <div className="space-y-5">
        <p>Each player selects one role for the match.</p>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <h3 className="text-lg font-semibold">🗡️ DPS</h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><Num>+2</Num> to <Red>offensive</Red> rolls against players in open tiles.</li>
            <li><Num>+2</Num> to <Red>offensive</Red> rolls when attacking ♜ Bulwarks or 🐠 Fish.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <h3 className="text-lg font-semibold">🛡️ Tank</h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li><Num>+2</Num> to <Blue>defensive</Blue> rolls when defending ♜ Bulwark, 🐠 Fish, or 🍁 Tree.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <h3 className="text-lg font-semibold">🍃 Healer</h3>
          <p className="mb-2">On their action, a Healer may choose one:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Buff:</strong>
              <ul className="mt-1 list-disc pl-6 space-y-1">
                <li>Add <Num>+2</Num> to each allied player’s roll within <Num>1</Num> square.</li>
                <li>The Healer does not roll.</li>
                <li>If not on the same tile, the Healer cannot be targeted or knocked down.</li>
              </ul>
            </li>
            <li><strong>Revive:</strong> Revive all knocked-down allies within <Num>1</Num> square.</li>
            <li><strong>Act Normally:</strong> Roll 🎲.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "setup",
    title: "Setup",
    content: () => (
      <div className="space-y-2">
        <p>Each team selects a <strong>Team Captain</strong>.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ensures all team actions have been addressed.</li>
          <li>Announces Command Skill usage.</li>
          <li>Teams start at their respective Base.</li>
          <li>Players may exit from any of the <Num>3</Num> stair platforms.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "turn-structure",
    title: "Turn Structure",
    content: () => (
      <div className="space-y-2">
        <p>Each turn resolves in order:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Command Phase:</strong> Team Captains may activate Command Skills.</li>
          <li><strong>Movement Phase:</strong> Each player rolls 🎲 and may move up to that many spaces. All movement resolves simultaneously.</li>
          <li><strong>Action Phase:</strong> All tiles resolve simultaneously based on player positions.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "combat",
    title: "Combat System",
    content: () => (
      <div className="space-y-3">
        <p>Each tile resolves as a separate battle.</p>
        <p>Combat is sum vs. sum:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>All <Red>attacking</Red> rolls and bonuses are combined.</li>
          <li>All <Blue>defending</Blue> rolls and bonuses are combined.</li>
          <li>The higher total wins.</li>
        </ul>
        <div>
          <h3 className="text-lg font-semibold">Result</h3>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>The losing side’s players are knocked down.</li>
            <li><strong>Open Tile PvP tie:</strong> Stalemate.</li>
            <li><strong>Structure PvE tie:</strong> Player win.</li>
            <li><strong>Structure PvP tie:</strong> Structure win.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "tile-interactions",
    title: "Tile Interactions",
    content: () => (
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold">Open Combat</h3>
          <p>Players on the same tile fight using the standard combat rules.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Jungle (Drum / Coin Tiles)</h3>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>If uncontested, the player gains the coin.</li>
            <li>If contested, combat occurs. The winner gains the coin and the losers are knocked down.</li>
            <li>Jungle coins respawn on Halftime, at ⏰ <Num>Turn 30</Num>.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Defending Structures</h3>
          <p>Players on a <Blue>friendly</Blue> structure roll and add their results to that structure’s defense.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Attacking Structures</h3>
          <p>Players on an <Red>enemy</Red> structure contribute their rolls and bonuses to the attacking total.</p>
        </div>
      </div>
    ),
  },
  {
    id: "structures",
    title: "Structures & Objectives",
    content: () => (
      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <h3 className="text-lg font-semibold">♜ Bulwarks</h3>
          <div className="mt-2 space-y-1">
            <p><strong>HP:</strong> ♥ ♥ ♥ x<Num>3</Num></p>
            <p><strong>Defense:</strong> 🎲</p>
          </div>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Each successful <Red>attack</Red> removes <Num>1</Num> HP.</li>
            <li>At least <Num>1</Num> ♜ Bulwark must be destroyed before the 🐠 Fish can be attacked.</li>
            <li>Each destroyed ♜ Bulwark lowers the 🐠 Fish’s defense tier.</li>
            <li>If <Blue>defenders</Blue> win, <Red>attackers</Red> are knocked down.</li>
            <li>If a defended ♜ Bulwark is destroyed, its defenders are knocked down.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <h3 className="text-lg font-semibold">🐠 Fish</h3>
          <div className="mt-2 space-y-1">
            <p><strong>HP:</strong> ♥ ♥ ♥ ♥ ♥ ♥ x<Num>6</Num></p>
            <div>
              <p><strong>Defense by destroyed ♜ Bulwarks:</strong></p>
              <ul className="mt-1 list-disc pl-6 space-y-1">
                <li><Num>1</Num> ♜ Bulwark destroyed: 🎲 + <Num>2</Num></li>
                <li><Num>2</Num> ♜ Bulwarks destroyed: 🎲</li>
                <li><Num>3</Num> ♜ Bulwarks destroyed: 🎲 - <Num>2</Num></li>
              </ul>
            </div>
          </div>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            <li>Each successful <Red>attack</Red> removes <Num>1</Num> HP.</li>
            <li>Once destroyed, the 🍁 Tree becomes available.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
          <h3 className="text-lg font-semibold">🍁 Tree</h3>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>A player may pick up the 🍁 Tree as their action.</li>
            <li>The 🍁 Tree must be carried back to Base to win.</li>
          </ul>
          <div className="mt-3 border-t border-zinc-800/80 pt-3">
            <h4 className="text-base font-semibold">🍁 Tree Carrier</h4>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Movement: <Num>2</Num> spaces per turn.</li>
              <li>If enemies are on the 🍁 Tree’s tile at the start of the Movement Phase, movement becomes <Num>1</Num>.</li>
              <li>The 🍁 Tree adds <Num>+2</Num> to the total <Blue>defensive</Blue> roll.</li>
              <li>If the 🍁 Tree defense loses, the 🍁 Tree Carrier drops the 🍁 Tree and is knocked down.</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "boss",
    title: "Boss",
    content: () => (
      <div className="space-y-2">
        <p>Spawns on ⏰ <Num>Turn 15</Num> and ⏰ <Num>Turn 45</Num>.</p>
        <p>HP: ♥ ♥ ♥ x<Num>3</Num></p>
        <p>Defense: 🎲</p>
        <p>Reward: 🟡 <Num>2</Num> coins.</p>
        <ul className="mt-2 list-disc pl-6 space-y-1">
          <li>Location: Middle Row, coinflip determines which lane.</li>
          <li>Each team rolls against the Boss, then PvP if applicable.</li>
          <li>Successful rolls against the Boss reduce Boss HP.</li>
          <li>Successful PvP combat rolls knock down the losers.</li>
          <li>The team that lands the final blow gains the coins.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "coins",
    title: "Coins",
    content: () => (
      <div className="space-y-2">
        <p>🟡 Coins are earned from Jungle and Boss.</p>
        <p>A team’s coin count is shown by the number of drums above their Base.</p>
        <p>Coins persist until used.</p>
      </div>
    ),
  },
  {
    id: "skills",
    title: "Command Skills",
    content: () => (
      <div className="space-y-3">
        <p>Team Captain must send Command Skill usage to the game master before or by the Movement Phase.</p>
        <div className="space-y-1 border-t border-zinc-800/80 pt-3">
          <p><strong>Cooldown:</strong> ⏰ <Num>3 turns</Num></p>
          <p><strong>Duration:</strong> ⏰ <Num>1 turn</Num></p>
        </div>

        <div className="space-y-2 border-t border-zinc-800/80 pt-3">
          <p><strong>Player Speed - 🟡 <Num>1</Num></strong><br />Adds <Num>+3</Num> to all player movement rolls.</p>
          <p><strong>Healing Reduction - 🟡 <Num>1</Num></strong><br />Negates all enemy healer bonuses.</p>
          <p><strong>♜ Bulwark Damage - 🟡 <Num>1</Num></strong><br />Adds <Num>+4</Num> to total <Red>attack</Red> rolls against ♜ Bulwarks.</p>
          <p><strong>🐠 Fish Damage - 🟡 <Num>1</Num></strong><br />Adds <Num>+4</Num> to total <Red>attack</Red> rolls against 🐠 Fish.</p>
          <p><strong>City Protection - 🟡 <Num>2</Num></strong><br />All attacks against ♜ Bulwarks and 🐠 Fish are negated.</p>
          <p><strong>🍁 Tree Speed - 🟡 <Num>2</Num></strong><br />🍁 Tree Carrier movement is doubled.</p>
          <p><strong>Ballista Charges - 🟡 <Num>1</Num></strong><br />Has <Num>2 uses</Num> and does not expire. Players starting at Base may teleport anywhere on the board for their movement, but cannot act that turn.</p>
        </div>
      </div>
    ),
  },
  {
    id: "status",
    title: "Status Effects",
    content: () => (
      <div className="space-y-2">
        <p><strong>Knocked Down</strong> lasts <Num>1 turn</Num>.</p>
        <p>While knocked down, the player’s turn is skipped.</p>
        <p>If revived, they continue next turn from the same square.</p>
        <p>If not revived, they respawn at Base for the next turn.</p>
      </div>
    ),
  },
  {
    id: "halftime",
    title: "Halftime",
    content: () => (
      <div className="space-y-2">
        <p>Occurs on ⏰ <Num>Turn 30</Num>.</p>
        <p>All Jungle coins respawn.</p>
        <div>
          <p><strong>Archery Duel</strong></p>
          <p>Best of <Num>5</Num>. Each round, the player whose shot lands closest to the center scores <Num>1</Num> point. First to <Num>3</Num> points wins 🟡 <Num>2</Num> coins.</p>
        </div>
      </div>
    ),
  },
];

const initialOpenSections = Object.fromEntries(sections.map((section) => [section.id, true])) as Record<string, boolean>;

export default function Page() {
  const mobileMenuRef = useRef<HTMLDetailsElement | null>(null);
  const [copyMessage, setCopyMessage] = useState<string>("");
  const [mobileDiscordCollapsed, setMobileDiscordCollapsed] = useState(false);
  const [mobileSectionsCollapsed, setMobileSectionsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDiscordForceCollapsed = mobileDiscordCollapsed || mobileMenuOpen;

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} copied`);
    } catch {
      setCopyMessage(`Failed to copy ${label}`);
    }
    window.setTimeout(() => setCopyMessage(""), 1800);
  };

  useEffect(() => {
    const onScroll = () => {
      const collapsed = window.scrollY > 24;
      setMobileDiscordCollapsed(collapsed);
      setMobileSectionsCollapsed(collapsed);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpenSections);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

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
    window.setTimeout(() => {
      setHighlightedSection((prev) => (prev === id ? null : prev));
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 p-4 lg:block">
          <div className="sticky top-4">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
            <h1 className="mb-4 text-2xl font-bold leading-tight">WWM GvG<br />Board Game</h1>
            <nav className="space-y-2">
              {sections.map((s, i) => (
                <div key={s.id}>
                  {i !== 0 && <div className="mx-2 my-1 h-px bg-zinc-800/60" />}
                  <button
                    type="button"
                    onClick={() => {
                      expandAndJump(s.id);
                      if (mobileMenuRef.current) mobileMenuRef.current.open = false;
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                  >
                    {s.title}
                  </button>
                </div>
              ))}
            </nav>
            <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Party-Crashers Discord</p>
              <a
                href="https://discord.gg/bGBfpTEXtN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Join Discord
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-3 sm:p-5 lg:p-6">
          <div className="pointer-events-none fixed left-3 top-3 z-30 lg:hidden">
            <details
              ref={mobileMenuRef}
              className={`pointer-events-auto overflow-hidden shadow-2xl backdrop-blur-xl transition-[background-color,box-shadow] duration-200 ${
                mobileMenuOpen
                  ? "rounded-[1.35rem] border border-zinc-700 bg-zinc-900/94 shadow-black/30"
                  : "relative rounded-2xl"
              }`}
              onToggle={(event) => setMobileMenuOpen((event.currentTarget as HTMLDetailsElement).open)}
            >
              <summary
                className={`cursor-pointer list-none items-center font-semibold backdrop-blur-xl transition-[grid-template-columns,padding,background-color,box-shadow] duration-200 ${
                  mobileMenuOpen
                    ? "grid grid-cols-[14px_1fr] gap-2 border-b border-zinc-700/90 px-4 py-2.5"
                    : "rounded-2xl border border-white/10 bg-zinc-950/15 shadow-2xl shadow-black/20"
                } ${
                  mobileSectionsCollapsed && !mobileMenuOpen
                    ? "grid grid-cols-[14px_0fr] px-[16px] py-2.5"
                    : !mobileMenuOpen
                      ? "grid grid-cols-[14px_1fr] gap-2 px-4 py-2.5"
                      : ""
                }`}
              >
                <span aria-hidden="true" className="block self-center -translate-y-px leading-none">☰</span>
                <span
                  className={`min-w-0 overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-200 ${
                    mobileSectionsCollapsed && !mobileMenuOpen ? "translate-x-1 opacity-0" : "translate-x-0 opacity-100"
                  }`}
                >
                  Sections
                </span>
              </summary>
              <div
                className={`w-[min(14rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-5rem)] overflow-y-auto p-1.5 pt-2 ${
                  mobileMenuOpen ? "" : "hidden"
                }`}
              >
                <div className="space-y-1.5">
                  {sections.map((s, i) => (
                    <div key={s.id}>
                      {i !== 0 && <div className="mx-2 my-0.5 h-px bg-zinc-800/60" />}
                      <button
                        type="button"
                        onClick={() => {
                          expandAndJump(s.id);
                          if (mobileMenuRef.current) {
                            mobileMenuRef.current.open = false;
                            setMobileMenuOpen(false);
                          }
                        }}
                        className="block w-full rounded-xl px-3 py-1 text-left text-sm leading-snug text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                      >
                        {s.title}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>

          <div className="pointer-events-none fixed right-3 top-3 z-30 lg:hidden">
            <a
              href="https://discord.gg/bGBfpTEXtN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Party-Crashers Discord"
              className={`pointer-events-auto inline-grid h-[46px] items-center overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-950/15 text-sm font-semibold text-zinc-100 shadow-2xl shadow-black/20 backdrop-blur-xl transition-[grid-template-columns,padding] ${
                mobileMenuOpen ? "duration-150" : "duration-300"
              } hover:border-violet-200/35 hover:bg-violet-950/28 hover:text-white ${
                mobileDiscordForceCollapsed ? "grid-cols-[16px_0fr] px-[15px]" : "grid-cols-[16px_1fr] gap-2 px-4"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 self-center translate-y-px fill-current"
                aria-hidden="true"
              >
                <path d="M20.317 4.369A19.791 19.791 0 0 0 15.885 3c-.191.328-.403.77-.554 1.116a18.27 18.27 0 0 0-5.657 0A11.413 11.413 0 0 0 9.12 3a19.736 19.736 0 0 0-4.433 1.369C1.884 8.58 1.128 12.687 1.5 16.737a19.923 19.923 0 0 0 5.432 2.76c.438-.583.828-1.204 1.164-1.858a12.96 12.96 0 0 1-1.83-.879c.154-.113.305-.231.451-.352 3.53 1.658 7.36 1.658 10.848 0 .147.121.298.239.451.352-.585.34-1.196.634-1.832.88.337.653.726 1.273 1.165 1.857a19.884 19.884 0 0 0 5.433-2.76c.437-4.695-.746-8.764-3.465-12.368ZM9.049 14.626c-1.06 0-1.932-.973-1.932-2.169 0-1.195.85-2.168 1.932-2.168 1.09 0 1.95.982 1.931 2.168 0 1.196-.85 2.169-1.931 2.169Zm5.902 0c-1.06 0-1.931-.973-1.931-2.169 0-1.195.85-2.168 1.931-2.168 1.09 0 1.95.982 1.932 2.168 0 1.196-.842 2.169-1.932 2.169Z" />
              </svg>
              <span
                className={`min-w-0 overflow-hidden whitespace-nowrap transition-[opacity,transform] duration-200 ${
                  mobileDiscordForceCollapsed ? "translate-x-1 opacity-0" : "translate-x-0 opacity-100"
                }`}
              >
                Party-Crashers
              </span>
            </a>
          </div>

          <div className="mb-6 pt-14 lg:hidden">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
            <h1 className="mt-1 text-3xl font-bold">WWM GvG Board Game</h1>
          </div>

          <div className="space-y-4">
            {sections.map((s) => {
              const isOpen = openSections[s.id];
              return (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div
                    className={`overflow-hidden rounded-3xl border bg-zinc-900/60 shadow-xl transition-all duration-500 ${
                      highlightedSection === s.id
                        ? "border-amber-300 shadow-[0_0_0_3px_rgba(252,211,77,0.25)] shadow-amber-200/10"
                        : "border-zinc-800 shadow-black/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(s.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <h2 className="text-xl font-semibold">{s.title}</h2>
                      <span className={`rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400 transition ${isOpen ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>
                    {isOpen && <div className="border-t border-zinc-800 px-5 py-4 leading-7 text-zinc-300">{s.content(copyToClipboard, copyMessage)}</div>}
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
