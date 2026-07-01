"use strict";

const ROLE_PROFILES = {
  finisher_striker: {
    label: "Delantero finalizador",
    positionHints: ["ST", "CF", "FW", "DC"],
    radar: ["npxg90", "goals90", "goals_per_shot", "shot_accuracy", "touches_box90", "xg_per_shot"],
    weights: {
      npxg90: 0.22,
      goals90: 0.18,
      goals_per_shot: 0.16,
      shot_accuracy: 0.12,
      touches_box90: 0.10,
      xg_per_shot: 0.08,
      availability: 0.06,
      age_score: 0.04,
      market_score: 0.04
    },
    negative: ["dispossessed90", "miscontrols90"]
  },
  linkup_striker: {
    label: "Delantero asociativo",
    positionHints: ["ST", "CF", "FW", "DC"],
    radar: ["npxg90", "xa90", "key_passes90", "touches_box90", "assists90", "pass_accuracy"],
    weights: {
      npxg90: 0.15,
      xa90: 0.12,
      key_passes90: 0.12,
      touches_box90: 0.10,
      assists90: 0.10,
      pass_accuracy: 0.10,
      progressive_carries90: 0.08,
      goals90: 0.08,
      availability: 0.05,
      age_score: 0.05,
      market_score: 0.05
    },
    negative: ["dispossessed90", "miscontrols90"]
  },
  winger_creator: {
    label: "Extremo desequilibrante",
    positionHints: ["LW", "RW", "LM", "RM", "W"],
    radar: ["xa90", "key_passes90", "progressive_carries90", "carries_into_box90", "shots90", "successful_pressures90"],
    weights: {
      xa90: 0.14,
      key_passes90: 0.12,
      progressive_carries90: 0.14,
      carries_into_box90: 0.10,
      shots90: 0.08,
      npxg90: 0.08,
      assists90: 0.08,
      successful_pressures90: 0.08,
      goals90: 0.07,
      age_score: 0.05,
      market_score: 0.06
    },
    negative: ["dispossessed90", "miscontrols90"]
  },
  creator_midfielder: {
    label: "Mediocentro creador",
    positionHints: ["CM", "AM", "DM", "MC", "MCO", "MF"],
    radar: ["xa90", "key_passes90", "progressive_passes90", "passes_into_final_third90", "passes_into_box90", "pass_accuracy"],
    weights: {
      xa90: 0.16,
      key_passes90: 0.16,
      progressive_passes90: 0.18,
      passes_into_final_third90: 0.12,
      passes_into_box90: 0.10,
      pass_accuracy: 0.08,
      progressive_carries90: 0.08,
      assists90: 0.06,
      age_score: 0.03,
      market_score: 0.03
    },
    negative: ["dispossessed90"]
  },
  defensive_midfielder: {
    label: "Pivote defensivo",
    positionHints: ["DM", "CM", "MCD", "MC", "MF"],
    radar: ["interceptions90", "tackles90", "successful_pressures90", "duels_won_pct", "progressive_passes90", "pass_accuracy"],
    weights: {
      interceptions90: 0.16,
      tackles90: 0.14,
      successful_pressures90: 0.14,
      duels_won_pct: 0.12,
      progressive_passes90: 0.10,
      pass_accuracy: 0.08,
      fouls_inverse: 0.08,
      blocks90: 0.06,
      availability: 0.05,
      age_score: 0.03,
      market_score: 0.04
    },
    negative: ["fouls90", "cards90"]
  },
  correcting_cb: {
    label: "Central corrector",
    positionHints: ["CB", "DFC", "DF"],
    radar: ["interceptions90", "duels_won_pct", "aerials_won_pct", "tackles90", "clearances90", "blocks90"],
    weights: {
      interceptions90: 0.18,
      duels_won_pct: 0.15,
      aerials_won_pct: 0.14,
      tackles90: 0.12,
      clearances90: 0.10,
      blocks90: 0.10,
      successful_pressures90: 0.06,
      pass_accuracy: 0.05,
      cards_inverse: 0.05,
      availability: 0.05
    },
    negative: ["cards90", "fouls90"]
  },
  ball_playing_cb: {
    label: "Central con salida de balón",
    positionHints: ["CB", "DFC", "DF"],
    radar: ["progressive_passes90", "passes_into_final_third90", "pass_accuracy", "interceptions90", "aerials_won_pct", "duels_won_pct"],
    weights: {
      progressive_passes90: 0.18,
      passes_into_final_third90: 0.12,
      pass_accuracy: 0.10,
      interceptions90: 0.12,
      aerials_won_pct: 0.10,
      duels_won_pct: 0.10,
      clearances90: 0.08,
      blocks90: 0.08,
      cards_inverse: 0.05,
      availability: 0.04,
      market_score: 0.03
    },
    negative: ["cards90"]
  },
  attacking_fullback: {
    label: "Lateral ofensivo",
    positionHints: ["LB", "RB", "WB", "LI", "LD", "DF"],
    radar: ["progressive_carries90", "progressive_passes90", "passes_into_box90", "key_passes90", "xa90", "successful_pressures90"],
    weights: {
      progressive_carries90: 0.14,
      progressive_passes90: 0.12,
      passes_into_box90: 0.12,
      key_passes90: 0.10,
      xa90: 0.10,
      successful_pressures90: 0.10,
      tackles90: 0.08,
      interceptions90: 0.07,
      assists90: 0.07,
      availability: 0.05,
      market_score: 0.05
    },
    negative: ["dispossessed90", "cards90"]
  },
  goalkeeper: {
    label: "Portero",
    positionHints: ["GK", "POR"],
    radar: ["save_pct", "goals_prevented90", "clean_sheets_pct", "pass_accuracy", "long_ball_accuracy", "availability"],
    weights: {
      save_pct: 0.18,
      goals_prevented90: 0.18,
      clean_sheets_pct: 0.12,
      pass_accuracy: 0.10,
      long_ball_accuracy: 0.08,
      claims90: 0.08,
      sweeper_actions90: 0.08,
      availability: 0.08,
      age_score: 0.05,
      market_score: 0.05
    },
    negative: []
  }
};

const LEAGUE_STRENGTH = {
  "Premier League": 1.00,
  "LaLiga": 0.96,
  "Serie A": 0.94,
  "Bundesliga": 0.94,
  "Ligue 1": 0.90,
  "Eredivisie": 0.82,
  "Liga Portugal": 0.80,
  "Championship": 0.78,
  "Segunda División": 0.72,
  "Primera Federación": 0.58,
  "MLS": 0.70,
  "Brasileirão": 0.76,
  "Argentina Primera División": 0.74
};

const COLUMN_ALIASES = {
  "Player": "player",
  "Squad": "team",
  "Team": "team",
  "Comp": "league",
  "Nation": "country",
  "Season": "season",
  "Pos": "position",
  "Age": "age",
  "Min": "minutes",
  "Mins": "minutes",
  "Gls": "goals",
  "Ast": "assists",
  "PK": "penalty_goals",
  "Sh": "shots",
  "SoT": "shots_on_target",
  "xG": "xg",
  "npxG": "npxg",
  "xAG": "xa",
  "KP": "key_passes",
  "PrgP": "progressive_passes",
  "PrgC": "progressive_carries",
  "PPA": "passes_into_box",
  "Att 3rd": "passes_into_final_third",
  "Touches Att Pen": "touches_box",
  "Tkl": "tackles",
  "Int": "interceptions",
  "Blocks": "blocks",
  "Clr": "clearances",
  "CrdY": "yellow_cards",
  "CrdR": "red_cards"
};

let rawPlayers = [];
let scoredPlayers = [];

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  [
    "csvFile", "loadDemo", "loadAdvanced", "downloadTemplate", "datasetStatus", "roleSelect",
    "scopeSelect", "leagueAdjust", "sortBy", "searchInput", "leagueFilter",
    "positionFilter", "contractFilter", "minMinutes", "maxAge", "maxValue",
    "topN", "runModel", "exportCsv", "loadedCount", "filteredCount", "bestPlayer",
    "bestScore", "rankingTable", "playerA", "playerB", "radarWrap", "playerExplanation"
  ].forEach(id => els[id] = document.getElementById(id));

  populateRoles();

  els.csvFile.addEventListener("change", handleFile);
  els.loadDemo.addEventListener("click", loadDemo);
  els.loadAdvanced.addEventListener("click", loadAdvanced);
  els.downloadTemplate.addEventListener("click", () => downloadFile("data/template_players.csv", "template_players.csv"));
  els.runModel.addEventListener("click", runModel);
  els.exportCsv.addEventListener("click", exportRanking);
  els.playerA.addEventListener("change", renderRadar);
  els.playerB.addEventListener("change", renderRadar);

  ["roleSelect","scopeSelect","leagueAdjust","sortBy","searchInput","leagueFilter","positionFilter","contractFilter","minMinutes","maxAge","maxValue","topN"].forEach(id => {
    els[id].addEventListener("input", () => {
      if (rawPlayers.length) runModel();
    });
  });
});

function populateRoles() {
  Object.entries(ROLE_PROFILES).forEach(([key, profile]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = profile.label;
    els.roleSelect.appendChild(option);
  });
}

async function loadDemo() {
  const res = await fetch("data/demo_players.csv");
  const text = await res.text();
  rawPlayers = normalizeRows(parseCsv(text));
  onDatasetLoaded("Demo cargada");
}


async function loadAdvanced() {
  try {
    const res = await fetch("data/players_advanced.csv", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("No se encontró data/players_advanced.csv. Ejecuta: python tools/build_players_advanced.py");
    }
    const text = await res.text();
    rawPlayers = normalizeRows(parseCsv(text));
    onDatasetLoaded("players_advanced.csv cargado");
  } catch (error) {
    els.datasetStatus.textContent = error.message;
  }
}

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    rawPlayers = normalizeRows(parseCsv(e.target.result));
    onDatasetLoaded(file.name);
  };
  reader.readAsText(file);
}

function onDatasetLoaded(label) {
  els.loadedCount.textContent = rawPlayers.length;
  els.datasetStatus.textContent = `${label}: ${rawPlayers.length} jugadores cargados.`;
  populateLeagueFilter();
  runModel();
}

function parseCsv(text) {
  const rows = [];
  let current = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      current.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      current.push(value);
      if (current.some(v => v.trim() !== "")) rows.push(current);
      current = [];
      value = "";
    } else {
      value += char;
    }
  }
  current.push(value);
  if (current.some(v => v.trim() !== "")) rows.push(current);

  if (rows.length < 2) return [];

  const headers = rows[0].map(h => normalizeHeader(h));
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, idx) => obj[h] = row[idx] ?? "");
    return obj;
  });
}

function normalizeHeader(header) {
  const trimmed = String(header || "").trim();
  if (COLUMN_ALIASES[trimmed]) return COLUMN_ALIASES[trimmed];

  return trimmed
    .toLowerCase()
    .replaceAll("%", "pct")
    .replaceAll("/", "_")
    .replaceAll("-", "_")
    .replaceAll(" ", "_")
    .replace(/[^\w]/g, "");
}

function normalizeRows(rows) {
  return rows.map((row, index) => {
    const out = {};
    for (const [key, value] of Object.entries(row)) {
      out[key] = coerceValue(value);
    }

    out.player = String(out.player || `Jugador ${index + 1}`).trim();
    out.team = String(out.team || "").trim();
    out.league = String(out.league || "Unknown").trim();
    out.country = String(out.country || "").trim();
    out.season = String(out.season || "").trim();
    out.position = String(out.position || "").trim().toUpperCase();
    out.contract_status = String(out.contract_status || "").trim().toLowerCase();
    out.source = String(out.source || "").trim();

    return out;
  });
}

function coerceValue(value) {
  if (value === null || value === undefined) return "";
  const s = String(value).trim();
  if (s === "") return "";
  const cleaned = s
    .replace("€", "")
    .replaceAll(".", "")
    .replace(",", ".")
    .replace(/\s/g, "");
  if (/^-?\d+(\.\d+)?$/.test(cleaned)) return Number(cleaned);
  return s;
}

function populateLeagueFilter() {
  const leagues = Array.from(new Set(rawPlayers.map(p => p.league).filter(Boolean))).sort();
  els.leagueFilter.innerHTML = `<option value="">Todas</option>`;
  leagues.forEach(league => {
    const option = document.createElement("option");
    option.value = league;
    option.textContent = league;
    els.leagueFilter.appendChild(option);
  });
}

function runModel() {
  if (!rawPlayers.length) return;

  const roleKey = els.roleSelect.value;
  const role = ROLE_PROFILES[roleKey];

  const filtered = applyFilters(rawPlayers);
  const scope = buildScope(rawPlayers, filtered, role);
  const enrichedScope = scope.map(p => enrichPlayer(p));
  const enrichedFiltered = filtered.map(p => enrichPlayer(p));

  const scored = scorePlayers(enrichedFiltered, enrichedScope, role);
  scoredPlayers = sortPlayers(scored).slice(0, Number(els.topN.value || 50));

  renderSummary(scoredPlayers, filtered.length);
  renderTable(scoredPlayers);
  populatePlayerSelectors(scoredPlayers);
  renderRadar();
}

function applyFilters(players) {
  const search = String(els.searchInput.value || "").toLowerCase();
  const league = els.leagueFilter.value;
  const pos = String(els.positionFilter.value || "").toUpperCase();
  const contract = els.contractFilter.value;
  const minMinutes = Number(els.minMinutes.value || 0);
  const maxAge = Number(els.maxAge.value || 99);
  const maxValue = Number(els.maxValue.value || Number.MAX_SAFE_INTEGER);

  return players.filter(p => {
    const haystack = `${p.player} ${p.team} ${p.league} ${p.country}`.toLowerCase();
    if (search && !haystack.includes(search)) return false;
    if (league && p.league !== league) return false;
    if (pos && !String(p.position || "").toUpperCase().includes(pos)) return false;
    if (contract && String(p.contract_status || "").toLowerCase() !== contract) return false;
    if (num(p.minutes) < minMinutes) return false;
    if (num(p.age) > maxAge) return false;
    if (num(p.market_value_eur) > maxValue) return false;
    return true;
  });
}

function buildScope(allPlayers, filtered, role) {
  const scopeMode = els.scopeSelect.value;
  if (scopeMode === "all") return allPlayers;
  if (scopeMode === "same_position") {
    return allPlayers.filter(p => role.positionHints.some(h => String(p.position || "").toUpperCase().includes(h)));
  }
  return filtered;
}

function enrichPlayer(p) {
  const minutes = Math.max(num(p.minutes), 1);
  const out = { ...p };
  const confidenceNotes = [];

  out.goals90 = per90(p.goals, minutes);
  out.assists90 = per90(p.assists, minutes);
  out.shots90 = per90(p.shots, minutes);
  out.shots_on_target90 = per90(p.shots_on_target, minutes);
  out.key_passes90 = per90(p.key_passes, minutes);
  out.tackles90 = per90(p.tackles, minutes);
  out.interceptions90 = per90(p.interceptions, minutes);
  out.blocks90 = per90(p.blocks, minutes);
  out.clearances90 = per90(p.clearances, minutes);
  out.fouls90 = per90(p.fouls, minutes);
  out.cards90 = per90(num(p.yellow_cards) + num(p.red_cards) * 2, minutes);
  out.dispossessed90 = per90(p.dispossessed, minutes);
  out.miscontrols90 = per90(p.miscontrols, minutes);

  out.npxg = has(p.npxg) ? num(p.npxg) : estimateNpxg(p, confidenceNotes);
  out.xa = has(p.xa) ? num(p.xa) : estimateXa(p, confidenceNotes);

  out.npxg90 = per90(out.npxg, minutes);
  out.xa90 = per90(out.xa, minutes);

  out.progressive_passes = has(p.progressive_passes) ? num(p.progressive_passes) : estimateProgressivePasses(p, confidenceNotes);
  out.progressive_passes90 = per90(out.progressive_passes, minutes);

  out.progressive_carries = has(p.progressive_carries) ? num(p.progressive_carries) : estimateProgressiveCarries(p, confidenceNotes);
  out.progressive_carries90 = per90(out.progressive_carries, minutes);

  out.passes_into_final_third90 = per90(p.passes_into_final_third, minutes);
  out.passes_into_box90 = per90(p.passes_into_box, minutes);
  out.touches_box = has(p.touches_box) ? num(p.touches_box) : estimateTouchesBox(p, confidenceNotes);
  out.touches_box90 = per90(out.touches_box, minutes);

  out.carries_into_box90 = per90(p.carries_into_box, minutes);
  out.carries_into_final_third90 = per90(p.carries_into_final_third, minutes);

  out.successful_pressures = has(p.successful_pressures) ? num(p.successful_pressures) : estimateSuccessfulPressures(p, confidenceNotes);
  out.successful_pressures90 = per90(out.successful_pressures, minutes);

  out.shot_accuracy = safeDiv(p.shots_on_target, p.shots);
  out.goals_per_shot = safeDiv(num(p.goals) - num(p.penalty_goals), p.shots);
  out.xg_per_shot = safeDiv(out.npxg, p.shots);

  out.pass_accuracy = safeDiv(p.accurate_passes, p.attempted_passes);
  out.long_ball_accuracy = safeDiv(p.long_balls_completed, p.long_balls_attempted);
  out.duels_won_pct = safeDiv(p.duels_won, p.duels_total);
  out.aerials_won_pct = safeDiv(p.aerials_won, p.aerials_total);

  out.save_pct = has(p.save_pct) ? normalizePct(p.save_pct) : 0;
  out.goals_prevented90 = per90(p.goals_prevented, minutes);
  out.clean_sheets_pct = safeDiv(p.clean_sheets, p.starts || p.appearances);

  out.availability = clamp(num(p.minutes) / 3000, 0, 1);
  out.age_score = ageScore(num(p.age));
  out.market_score = marketScore(num(p.market_value_eur));
  out.cards_inverse = 1 - clamp(out.cards90 / 0.5, 0, 1);
  out.fouls_inverse = 1 - clamp(out.fouls90 / 2.5, 0, 1);

  const realAdvanced = [
    "xg","npxg","xa","progressive_passes","progressive_carries",
    "pressures","successful_pressures","touches_box"
  ].filter(k => has(p[k])).length;

  const basicCompleteness = [
    "minutes","goals","assists","shots","shots_on_target","key_passes",
    "accurate_passes","attempted_passes","tackles","interceptions",
    "duels_won","duels_total"
  ].filter(k => has(p[k])).length / 12;

  out.data_confidence = clamp(0.45 + basicCompleteness * 0.35 + realAdvanced * 0.025 - confidenceNotes.length * 0.025, 0.25, 1);
  out.confidence_notes = confidenceNotes.join("; ");

  out.league_strength = LEAGUE_STRENGTH[out.league] || LEAGUE_STRENGTH.Default || 0.65;

  return out;
}

function estimateNpxg(p, notes) {
  notes.push("npxG proxy");
  if (has(p.xg)) return Math.max(num(p.xg) - num(p.penalty_goals) * 0.76, 0);
  if (has(p.shots) || has(p.shots_on_target)) {
    return Math.max((num(p.shots_on_target) * 0.22) + ((num(p.shots) - num(p.shots_on_target)) * 0.06), 0);
  }
  // Fallback para datasets globales básicos como player-scores: no es xG real.
  return Math.max((num(p.goals) - num(p.penalty_goals)) * 0.85, 0);
}

function estimateXa(p, notes) {
  notes.push("xA proxy");
  if (has(p.key_passes) || has(p.passes_into_box)) {
    return Math.max(num(p.key_passes) * 0.075 + num(p.assists) * 0.18 + num(p.passes_into_box) * 0.015, 0);
  }
  // Fallback para datasets con solo asistencias: no es xA real.
  return Math.max(num(p.assists) * 0.75, 0);
}

function estimateProgressivePasses(p, notes) {
  notes.push("pases progresivos proxy");
  return num(p.passes_into_final_third) + num(p.passes_into_box) + num(p.long_balls_completed) * 0.35 + num(p.key_passes) * 0.5;
}

function estimateProgressiveCarries(p, notes) {
  notes.push("conducciones progresivas proxy");
  return num(p.carries_into_final_third) + num(p.carries_into_box) * 1.5;
}

function estimateTouchesBox(p, notes) {
  notes.push("toques en área proxy");
  return num(p.touches_box) || (num(p.shots) * 1.7 + num(p.goals) * 3 + num(p.assists));
}

function estimateSuccessfulPressures(p, notes) {
  notes.push("presiones exitosas proxy");
  if (has(p.pressures)) return num(p.pressures) * 0.32;
  return num(p.tackles) + num(p.interceptions) * 0.8 + num(p.blocks) * 0.4;
}

function scorePlayers(players, scope, role) {
  const metrics = new Set([...Object.keys(role.weights), ...(role.negative || [])]);
  const distributions = {};
  metrics.forEach(metric => {
    distributions[metric] = scope.map(p => num(p[metric])).filter(v => Number.isFinite(v));
  });

  return players.map(player => {
    let roleScore = 0;
    let totalWeight = 0;
    const metricScores = {};

    for (const [metric, weight] of Object.entries(role.weights)) {
      const raw = num(player[metric]);
      let percentile = percentileOf(raw, distributions[metric] || []);
      if (metric.endsWith("_inverse")) percentile = raw;
      metricScores[metric] = percentile;
      roleScore += percentile * weight;
      totalWeight += weight;
    }

    for (const metric of role.negative || []) {
      const raw = num(player[metric]);
      const penalty = percentileOf(raw, distributions[metric] || []);
      roleScore -= penalty * 0.035;
    }

    roleScore = totalWeight ? roleScore / totalWeight : 0;
    roleScore = clamp(roleScore, 0, 1);

    const useLeagueAdjust = els.leagueAdjust.value === "on";
    const leagueFactor = useLeagueAdjust ? player.league_strength : 1;

    const adjustedScore = clamp(roleScore * (0.75 + leagueFactor * 0.25) * (0.82 + player.data_confidence * 0.18), 0, 1);

    return {
      ...player,
      role_score: roleScore * 100,
      adjusted_score: adjustedScore * 100,
      metric_scores: metricScores
    };
  });
}

function sortPlayers(players) {
  const sortBy = els.sortBy.value;
  const sorted = [...players].sort((a, b) => {
    if (sortBy === "age" || sortBy === "market_value_eur") return num(a[sortBy]) - num(b[sortBy]);
    return num(b[sortBy]) - num(a[sortBy]);
  });
  return sorted;
}

function renderSummary(players, filteredCount) {
  els.filteredCount.textContent = filteredCount;
  if (!players.length) {
    els.bestPlayer.textContent = "—";
    els.bestScore.textContent = "—";
    return;
  }
  els.bestPlayer.textContent = players[0].player;
  els.bestScore.textContent = `${players[0].adjusted_score.toFixed(1)}`;
}

function renderTable(players) {
  const headers = [
    "#", "Jugador", "Equipo", "Liga", "Pos", "Edad", "Min",
    "Contrato", "Valor €", "Score", "Rol", "Conf.",
    "G/90", "A/90", "npxG/90", "xA/90", "PrgP/90", "KP/90",
    "Duelos %", "Aéreos %", "Int/90"
  ];

  els.rankingTable.querySelector("thead").innerHTML =
    `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

  els.rankingTable.querySelector("tbody").innerHTML = players.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${escapeHtml(p.player)}</strong></td>
      <td>${escapeHtml(p.team)}</td>
      <td>${escapeHtml(p.league)}</td>
      <td>${escapeHtml(p.position)}</td>
      <td>${fmt(p.age, 0)}</td>
      <td>${fmt(p.minutes, 0)}</td>
      <td>${contractBadge(p.contract_status)}</td>
      <td>${money(p.market_value_eur)}</td>
      <td><strong>${fmt(p.adjusted_score, 1)}</strong></td>
      <td>${fmt(p.role_score, 1)}</td>
      <td>${confidenceBadge(p.data_confidence)}</td>
      <td>${fmt(p.goals90, 2)}</td>
      <td>${fmt(p.assists90, 2)}</td>
      <td>${fmt(p.npxg90, 2)}</td>
      <td>${fmt(p.xa90, 2)}</td>
      <td>${fmt(p.progressive_passes90, 2)}</td>
      <td>${fmt(p.key_passes90, 2)}</td>
      <td>${pct(p.duels_won_pct)}</td>
      <td>${pct(p.aerials_won_pct)}</td>
      <td>${fmt(p.interceptions90, 2)}</td>
    </tr>
  `).join("");
}

function populatePlayerSelectors(players) {
  const options = players.map((p, idx) => `<option value="${idx}">${escapeHtml(p.player)} — ${escapeHtml(p.team)}</option>`).join("");
  els.playerA.innerHTML = options;
  els.playerB.innerHTML = options;
  if (players.length > 1) els.playerB.value = "1";
}

function renderRadar() {
  if (!scoredPlayers.length) {
    els.radarWrap.innerHTML = "<p class='muted'>Ejecuta el modelo para ver el radar.</p>";
    els.playerExplanation.innerHTML = "";
    return;
  }

  const a = scoredPlayers[Number(els.playerA.value || 0)];
  const b = scoredPlayers[Number(els.playerB.value || 0)] || scoredPlayers[0];
  const role = ROLE_PROFILES[els.roleSelect.value];
  const metrics = role.radar;

  els.radarWrap.innerHTML = radarSvg(a, b, metrics);
  els.playerExplanation.innerHTML = explainPlayers(a, b, metrics);
}

function radarSvg(a, b, metrics) {
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 118;
  const rings = [0.25, 0.5, 0.75, 1];

  const pointsFor = player => metrics.map((m, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / metrics.length);
    const value = clamp(num(player.metric_scores?.[m] ?? player[m]), 0, 1);
    return [
      cx + Math.cos(angle) * maxR * value,
      cy + Math.sin(angle) * maxR * value
    ];
  });

  const polygon = pts => pts.map(p => p.join(",")).join(" ");

  const axis = metrics.map((m, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI / metrics.length);
    const x = cx + Math.cos(angle) * maxR;
    const y = cy + Math.sin(angle) * maxR;
    const lx = cx + Math.cos(angle) * (maxR + 34);
    const ly = cy + Math.sin(angle) * (maxR + 34);
    return `
      <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#e5dfd3" />
      <text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#6f6a61">${labelMetric(m)}</text>
    `;
  }).join("");

  const ringEls = rings.map(r => {
    const pts = metrics.map((m, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI / metrics.length);
      return [cx + Math.cos(angle) * maxR * r, cy + Math.sin(angle) * maxR * r];
    });
    return `<polygon points="${polygon(pts)}" fill="none" stroke="#e5dfd3" stroke-width="1" />`;
  }).join("");

  const pA = polygon(pointsFor(a));
  const pB = polygon(pointsFor(b));

  return `
    <div>
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img">
        ${ringEls}
        ${axis}
        <polygon points="${pB}" fill="rgba(119,119,119,0.20)" stroke="#777" stroke-width="2" />
        <polygon points="${pA}" fill="rgba(17,17,17,0.20)" stroke="#111" stroke-width="2" />
      </svg>
      <div class="radar-legend">
        <span class="legend-a">${escapeHtml(a.player)}</span>
        <span class="legend-b">${escapeHtml(b.player)}</span>
      </div>
    </div>
  `;
}

function explainPlayers(a, b, metrics) {
  const bestA = topMetrics(a, metrics, 3);
  const bestB = topMetrics(b, metrics, 3);

  return `
    <strong>${escapeHtml(a.player)}</strong>: score ajustado ${fmt(a.adjusted_score, 1)}, confianza ${pct(a.data_confidence)}.
    Destaca en ${bestA.map(labelMetric).join(", ")}.
    <br><br>
    <strong>${escapeHtml(b.player)}</strong>: score ajustado ${fmt(b.adjusted_score, 1)}, confianza ${pct(b.data_confidence)}.
    Destaca en ${bestB.map(labelMetric).join(", ")}.
    <br><br>
    ${a.confidence_notes ? `<strong>Notas de datos:</strong> ${escapeHtml(a.confidence_notes)}.` : ""}
  `;
}

function topMetrics(player, metrics, n) {
  return [...metrics].sort((m1, m2) => num(player.metric_scores?.[m2] ?? player[m2]) - num(player.metric_scores?.[m1] ?? player[m1])).slice(0, n);
}

function exportRanking() {
  if (!scoredPlayers.length) return;
  const cols = [
    "player","team","league","country","season","position","age","minutes",
    "market_value_eur","contract_status","adjusted_score","role_score","data_confidence",
    "goals90","assists90","npxg90","xa90","shots90","shot_accuracy","goals_per_shot",
    "progressive_passes90","progressive_carries90","key_passes90","pass_accuracy",
    "successful_pressures90","tackles90","interceptions90","blocks90","clearances90",
    "duels_won_pct","aerials_won_pct","confidence_notes"
  ];

  const csv = [
    cols.join(","),
    ...scoredPlayers.map(p => cols.map(c => csvCell(p[c])).join(","))
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "football_advanced_ranking.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadFile(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

function csvCell(value) {
  const s = String(value ?? "");
  return `"${s.replaceAll('"', '""')}"`;
}

function has(v) {
  return v !== undefined && v !== null && v !== "" && Number.isFinite(Number(v));
}

function num(v) {
  if (v === undefined || v === null || v === "") return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function per90(v, minutes) {
  return num(v) / Math.max(num(minutes), 1) * 90;
}

function safeDiv(a, b) {
  const den = num(b);
  if (!den) return 0;
  return clamp(num(a) / den, 0, 999);
}

function normalizePct(v) {
  const n = num(v);
  if (n > 1) return n / 100;
  return n;
}

function ageScore(age) {
  if (!age) return 0.5;
  if (age <= 18) return 0.62;
  if (age <= 23) return 1.0;
  if (age <= 27) return 0.92;
  if (age <= 30) return 0.74;
  if (age <= 33) return 0.52;
  return 0.30;
}

function marketScore(value) {
  if (!value) return 0.92;
  if (value <= 100000) return 1;
  if (value >= 5000000) return 0.1;
  return 1 - Math.log10(value / 100000) / Math.log10(50) * 0.9;
}

function percentileOf(value, arr) {
  if (!arr.length) return 0;
  const v = num(value);
  const sorted = [...arr].sort((a, b) => a - b);
  let count = 0;
  for (const x of sorted) {
    if (x <= v) count++;
  }
  return clamp(count / sorted.length, 0, 1);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function pct(v) {
  return `${fmt(normalizePct(v) * 100, 0)}%`;
}

function fmt(v, digits = 1) {
  const n = num(v);
  return Number.isFinite(n) ? n.toLocaleString("es-ES", { maximumFractionDigits: digits, minimumFractionDigits: digits }) : "—";
}

function money(v) {
  const n = num(v);
  if (!n) return "—";
  if (n >= 1000000) return `${fmt(n / 1000000, 1)}M`;
  if (n >= 1000) return `${fmt(n / 1000, 0)}k`;
  return `${fmt(n, 0)}`;
}

function contractBadge(status) {
  const s = String(status || "—").toLowerCase();
  let cls = "";
  if (s === "free") cls = "good";
  else if (s === "loan") cls = "warn";
  return `<span class="badge ${cls}">${escapeHtml(s || "—")}</span>`;
}

function confidenceBadge(v) {
  const n = normalizePct(v);
  let cls = "bad";
  if (n >= 0.75) cls = "good";
  else if (n >= 0.55) cls = "warn";
  return `<span class="badge ${cls}">${pct(n)}</span>`;
}

function labelMetric(metric) {
  const labels = {
    npxg90: "npxG/90",
    goals90: "Goles/90",
    goals_per_shot: "Gol/tiro",
    shot_accuracy: "Tiros puerta %",
    touches_box90: "Toques área/90",
    xg_per_shot: "xG/tiro",
    xa90: "xA/90",
    key_passes90: "Pases clave/90",
    pass_accuracy: "Precisión pase",
    progressive_passes90: "PrgP/90",
    progressive_carries90: "PrgC/90",
    passes_into_final_third90: "Pases ⅓/90",
    passes_into_box90: "Pases área/90",
    successful_pressures90: "Presión éxito/90",
    duels_won_pct: "Duelos %",
    aerials_won_pct: "Aéreos %",
    tackles90: "Entradas/90",
    interceptions90: "Intercep./90",
    clearances90: "Despejes/90",
    blocks90: "Bloqueos/90",
    carries_into_box90: "Carries área/90",
    shots90: "Tiros/90",
    assists90: "Asist./90",
    save_pct: "Paradas %",
    goals_prevented90: "Goles evit./90",
    clean_sheets_pct: "Port. cero %",
    availability: "Disponibilidad",
    market_score: "Precio",
    age_score: "Edad"
  };
  return labels[metric] || metric;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
