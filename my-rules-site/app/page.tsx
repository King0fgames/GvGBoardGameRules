export default function BoardGameRulesPage() {
  const sections = [
    {
      id: "overview",
      title: "Game Overview",
      content: (
        <>
          <p>5v5 team-based board game.</p>
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
        <div className="space-y-4">
          <p>Each player selects one role for the match.</p>
          <div>
            <h3 className="font-semibold text-lg">DPS</h3>
            <p>+2 to offensive rolls against players in open tiles and when attacking Bulwarks or Fish.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Tank</h3>
            <p>+2 to defensive rolls when defending a Bulwark, Fish, or Tree.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Healer</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Buff:</strong> Add +2 to each allied player’s roll within 1 square.</li>
              <li>Applies to all affected allies.</li>
              <li>The Healer does not roll.</li>
              <li>If not on the same tile, the Healer cannot be targeted or knocked down.</li>
              <li><strong>Revive:</strong> Revive all knocked-down allies within 1 square.</li>
              <li><strong>Act Normally:</strong> Participate in combat by rolling 1D6.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "setup",
      title: "Setup",
      content: (
        <ul className="list-disc pl-6 space-y-1">
          <li>Teams begin at their respective Base.</li>
          <li>Players may exit from any of the 3 stair platforms.</li>
        </ul>
      ),
    },
    {
      id: "turn-structure",
      title: "Turn Structure",
      content: (
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Command Phase:</strong> Team Captains may activate Command Skills. Skills must be declared before movement.</li>
          <li><strong>Movement Phase:</strong> Each player rolls 1D6 and may move up to that many spaces. All movement resolves simultaneously.</li>
          <li><strong>Action Phase:</strong> All tiles resolve simultaneously based on final player positions.</li>
        </ol>
      ),
    },
    {
      id: "combat",
      title: "Combat System",
      content: (
        <div className="space-y-3">
          <p>Each tile resolves as a separate battle.</p>
          <p>Combat uses <strong>sum vs. sum</strong>:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>All attacking rolls and bonuses are combined.</li>
            <li>All defending rolls and bonuses are combined.</li>
            <li>The higher total wins.</li>
          </ul>
          <div>
            <h3 className="font-semibold text-lg">Result</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
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
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Open Combat</h3>
            <p>Players on the same tile fight using the standard combat rules.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Jungle (Drum / Coin Tiles)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>If uncontested, the player gains the coin.</li>
              <li>If contested, combat occurs. The winner gains the coin and the losers are knocked down.</li>
              <li>Jungle coins respawn at Halftime (30 turns).</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Defending Structures</h3>
            <p>Players on a friendly structure roll and add their results to that structure’s defense.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Attacking Structures</h3>
            <p>Players on an enemy structure contribute their rolls and bonuses to the attacking total.</p>
          </div>
        </div>
      ),
    },
    {
      id: "structures",
      title: "Structures & Objectives",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">Bulwarks</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>HP: 3</li>
              <li>Defense: 1D6</li>
              <li>Each successful attack removes 1 HP.</li>
              <li>At least 1 Bulwark must be destroyed before the Fish can be attacked.</li>
              <li>Each destroyed Bulwark gives the Fish -2 to defensive rolls.</li>
              <li>If defenders win, attackers are knocked down.</li>
              <li>If a defended Bulwark is destroyed, its defenders are knocked down.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Fish</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>HP: 6</li>
              <li><strong>Defense depends on destroyed Bulwarks:</strong></li>
              <li>1 Bulwark destroyed: 1D6 + 2</li>
              <li>2 Bulwarks destroyed: 1D6</li>
              <li>3 Bulwarks destroyed: 1D6 - 2</li>
              <li>Each successful attack removes 1 HP.</li>
              <li>Once destroyed, the Tree becomes available.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Tree</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>A player may pick up the Tree as their action.</li>
              <li>The Tree must be carried back to Base to win.</li>
              <li>The Tree Carrier moves 2 spaces per turn.</li>
              <li>If enemies are on the same tile at the start of the turn, the Tree Carrier moves 1 space instead.</li>
              <li>The Tree gives its carrier +2 to defensive rolls.</li>
              <li>If defeated, the carrier is knocked down.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "boss",
      title: "Boss",
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-1">
            <li>The Boss spawns after turn 15 and again at turn 45.</li>
            <li>Location: middle lane</li>
            <li>HP: 3</li>
            <li>Defense: 1D6</li>
            <li>Reward: 2 coins</li>
          </ul>
          <div>
            <h3 className="font-semibold text-lg">Combat</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Each team rolls against the Boss, then PvP if applicable.</li>
              <li>Successful rolls against the Boss reduce Boss HP.</li>
              <li>Successful PvP combat rolls knock down the losers.</li>
              <li>The team that lands the final blow gains the coins.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "coins-skills",
      title: "Coins & Command Skills",
      content: (
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-lg">Coins</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Coins are earned from Jungle Drums and Boss kills.</li>
              <li>Coins persist until used.</li>
              <li>Coins are used to activate Command Skills.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Command Skills</h3>
            <p className="mb-2 text-zinc-400">Declared before movement. The Team Captain sends the choice to the game master. Each skill has a 3-turn cooldown. Each skill lasts 1 turn unless noted otherwise.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Player Speed — 1 coin:</strong> +3 to all player movement rolls.</li>
              <li><strong>Healing Reduction — 1 coin:</strong> Negates all enemy healer bonuses.</li>
              <li><strong>Bulwark Damage — 1 coin:</strong> +4 to total attack rolls against Bulwarks.</li>
              <li><strong>Fish Damage — 1 coin:</strong> +4 to total attack rolls against Fish.</li>
              <li><strong>City Protection — 2 coins:</strong> All attacks against Bulwarks and Fish are negated.</li>
              <li><strong>Tree Speed — 2 coins:</strong> The Tree Carrier’s movement is doubled.</li>
              <li><strong>Ballista Charges — 1 coin:</strong> 2 uses total and does not expire. Players starting at Base may teleport anywhere on the board, but cannot act that turn.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "status-effects",
      title: "Status Effects",
      content: (
        <div>
          <h3 className="font-semibold text-lg">Knocked Down</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Occurs during the Action Phase only.</li>
            <li>A knocked-down player skips their next turn’s movement and action.</li>
            <li>During that skipped turn, they may be revived by a Healer.</li>
            <li>If revived during that turn, they act normally on the following turn.</li>
            <li>If not revived, they respawn at Base at the start of the turn after their skipped turn.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "halftime",
      title: "Halftime Event",
      content: (
        <div className="space-y-4">
          <p>Halftime occurs after 30 turns.</p>
          <div>
            <h3 className="font-semibold text-lg">Effects</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>All Jungle coins respawn.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Archery Duel</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Each team selects 1 player.</li>
              <li>There are 5 targets.</li>
              <li>Players alternate shots.</li>
              <li>Closest to the bullseye scores 1 point.</li>
              <li>The first player to reach 3 points wins 2 coins.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-zinc-800 bg-zinc-950/95 px-6 py-8 lg:block">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
            <h1 className="mt-2 text-2xl font-bold">Board Game Rules</h1>
          </div>
          <nav className="space-y-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl shadow-black/20 lg:hidden">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
              <h1 className="mt-2 text-3xl font-bold">Board Game Rules</h1>
              <p className="mt-3 text-zinc-400">Use the sections below to jump around and expand only what you need.</p>
            </div>

            <div className="mb-10 hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl shadow-black/20 lg:block">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Rulebook</p>
              <h1 className="mt-2 text-4xl font-bold">Board Game Rules</h1>
              <p className="mt-3 max-w-2xl text-zinc-400">A clean, quick-reference version of the rules with collapsible sections for easier reading during play.</p>
            </div>

            <div className="mb-6 lg:hidden">
              <details className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <summary className="cursor-pointer list-none font-semibold">Jump to section</summary>
                <div className="mt-4 space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </details>
            </div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-6">
                  <details
                    className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 shadow-xl shadow-black/10"
                    open={index === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left">
                      <div>
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                      </div>
                      <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400 transition group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800 px-6 py-5 leading-7 text-zinc-300">
                      {section.content}
                    </div>
                  </details>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
