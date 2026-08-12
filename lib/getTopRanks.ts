/**
 * Top ranked players, from the same public Supabase RPC the desktop app's
 * Home tab uses (`get_latest_ranks`, a security-definer function that only
 * exposes public fields and excludes private-mode profiles). The anon key is
 * the same publishable key every shipped client carries.
 *
 * The ordering mirrors the desktop's sortRanks: rank class first, then tier
 * (1 is highest), then step; Mythic players order by leaderboard place when
 * they have one, percentile otherwise.
 */

const SUPABASE_URL = "https://decenyvqkbvydrrolwpk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9CgHq0DZWlYYxjH7ZDLeOw_zk4EKYKu";

const RANK_VALUE: Record<string, number> = {
  Unranked: 0,
  Bronze: 1,
  Silver: 2,
  Gold: 4,
  Platinum: 8,
  Diamond: 16,
  Mythic: 32,
};

export interface RankSide {
  class: string;
  level: number;
  step: number;
  percentile: number;
  leaderboardPlace: number;
}

export interface RankedPlayer {
  name: string;
  /** What app.mtgatool.com/profile/<id> resolves: profile name, or arena id. */
  profileId: string;
  avatar: string | null;
  rank: RankSide;
}

interface RpcRow {
  arena_id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  constructed: Partial<RankSide> | null;
  limited: Partial<RankSide> | null;
}

function side(j: Partial<RankSide> | null): RankSide {
  return {
    class: j?.class ?? "Unranked",
    level: j?.level ?? 0,
    step: j?.step ?? 0,
    percentile: j?.percentile ?? 0,
    leaderboardPlace: j?.leaderboardPlace ?? 0,
  };
}

/** Same comparison the desktop app uses; tier 1 outranks tier 4. */
function compareRanks(a: RankSide, b: RankSide): number {
  const av = RANK_VALUE[a.class] ?? 0;
  const bv = RANK_VALUE[b.class] ?? 0;
  if (av < bv) return 1;
  if (av > bv) return -1;

  if (av !== RANK_VALUE.Mythic) {
    if (a.level < b.level) return -1;
    if (a.level > b.level) return 1;
    if (a.step < b.step) return 1;
    if (a.step > b.step) return -1;
  }

  if (a.leaderboardPlace !== 0 && b.leaderboardPlace === 0) return -1;
  if (b.leaderboardPlace !== 0 && a.leaderboardPlace === 0) return 1;
  if (a.leaderboardPlace < b.leaderboardPlace) return -1;
  if (a.leaderboardPlace > b.leaderboardPlace) return 1;

  if (a.percentile < b.percentile) return 1;
  if (a.percentile > b.percentile) return -1;
  return 0;
}

function cleanUsername(str: string): string {
  const emailTest = new RegExp(/(.*)@(.*)/);
  const result = emailTest.exec(str);
  return result ? result[1] : str;
}

export interface TopRanks {
  constructed: RankedPlayer[];
  limited: RankedPlayer[];
}

export async function getTopRanks(top = 10): Promise<TopRanks> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_latest_ranks`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_limit: 200 }),
  });
  if (!res.ok) {
    throw new Error(`get_latest_ranks failed: ${res.status}`);
  }
  const rows = (await res.json()) as RpcRow[];

  const players = rows.map((r) => ({
    name: cleanUsername(r.username || r.display_name || "-"),
    // The profile page looks names up against profiles; players who never
    // made one only resolve by arena id.
    profileId: r.username || r.arena_id,
    avatar: r.avatar_url || null,
    constructed: side(r.constructed),
    limited: side(r.limited),
  }));

  const pick = (format: "constructed" | "limited"): RankedPlayer[] =>
    [...players]
      .sort((a, b) => compareRanks(a[format], b[format]))
      .slice(0, top)
      .map((p) => ({
        name: p.name,
        profileId: p.profileId,
        avatar: p.avatar,
        rank: p[format],
      }));

  return { constructed: pick("constructed"), limited: pick("limited") };
}
