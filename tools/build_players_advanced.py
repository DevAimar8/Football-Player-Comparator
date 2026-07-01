"""
Genera data/players_advanced.csv a partir del dataset Kaggle:
davidcariboo/player-scores

Este dataset es muy útil para crear una base GLOBAL de jugadores, clubes,
ligas, valores de mercado, minutos, goles, asistencias y contexto de mercado.

Importante:
- player-scores NO es Wyscout.
- No trae presiones, pases progresivos reales, xG real ni tracking.
- El comparador web puede crear proxies cuando esas métricas no existen.
- Si después unes datos de FBref/StatsBomb/FotMob, el modelo usará las métricas reales.

Instalación:
    pip install -r requirements.txt

Uso:
    python tools/build_players_advanced.py

Salida:
    data/players_advanced.csv
"""

from pathlib import Path
import shutil
import pandas as pd
import kagglehub


DATASET = "davidcariboo/player-scores"


def read_csv_if_exists(path: Path) -> pd.DataFrame:
    if not path.exists():
        return pd.DataFrame()
    return pd.read_csv(path, low_memory=False)


def first_existing(df: pd.DataFrame, columns, default=None):
    for col in columns:
        if col in df.columns:
            return df[col]
    return default


def normalize_contract_status(contract_expiration_date):
    """
    Marca como 'free_candidate' contratos expirados o sin fecha.
    No es equivalente legal a 'jugador libre', pero sirve como pista inicial.
    Para fichajes reales hay que validar contrato actual en Transfermarkt/club/fuente oficial.
    """
    if pd.isna(contract_expiration_date) or str(contract_expiration_date).strip() == "":
        return "unknown"
    expiration = pd.to_datetime(contract_expiration_date, errors="coerce")
    today = pd.Timestamp.today().normalize()
    if pd.notna(expiration) and expiration < today:
        return "free_candidate"
    return "contracted"


def main():
    project_root = Path(__file__).resolve().parents[1]
    raw_dir = project_root / "data" / "raw" / "player-scores"
    output_path = project_root / "data" / "players_advanced.csv"

    # Si no existe el dataset en data/raw, lo descargamos con kagglehub.
    if not raw_dir.exists() or not any(raw_dir.glob("*.csv")):
        path = kagglehub.dataset_download(DATASET)
        print("Path to dataset files:", path)

        raw_dir.mkdir(parents=True, exist_ok=True)
        for file in Path(path).glob("*.csv"):
            shutil.copy2(file, raw_dir / file.name)

    players = read_csv_if_exists(raw_dir / "players.csv")
    appearances = read_csv_if_exists(raw_dir / "appearances.csv")
    games = read_csv_if_exists(raw_dir / "games.csv")
    competitions = read_csv_if_exists(raw_dir / "competitions.csv")
    valuations = read_csv_if_exists(raw_dir / "player_valuations.csv")

    if players.empty:
        raise FileNotFoundError("No se encontró players.csv en el dataset.")

    p = players.copy()

    if "name" not in p.columns:
        first = first_existing(p, ["first_name"], "")
        last = first_existing(p, ["last_name"], "")
        p["name"] = (first.fillna("").astype(str) + " " + last.fillna("").astype(str)).str.strip()

    p_base = pd.DataFrame()
    p_base["player_id"] = p["player_id"]
    p_base["player"] = p["name"]
    p_base["position"] = first_existing(p, ["position"], "")
    p_base["sub_position"] = first_existing(p, ["sub_position"], "")
    p_base["team"] = first_existing(p, ["current_club_name"], "")
    p_base["country"] = first_existing(p, ["country_of_citizenship", "country_of_birth"], "")
    p_base["date_of_birth"] = first_existing(p, ["date_of_birth"], "")
    p_base["height_cm"] = first_existing(p, ["height_in_cm"], "")
    p_base["foot"] = first_existing(p, ["foot"], "")
    p_base["market_value_eur"] = first_existing(p, ["market_value_in_eur"], 0)
    p_base["highest_market_value_eur"] = first_existing(p, ["highest_market_value_in_eur"], 0)
    p_base["contract_expiration_date"] = first_existing(p, ["contract_expiration_date"], "")
    p_base["contract_status"] = p_base["contract_expiration_date"].apply(normalize_contract_status)
    p_base["source"] = "kagglehub:davidcariboo/player-scores"

    dob = pd.to_datetime(p_base["date_of_birth"], errors="coerce")
    today = pd.Timestamp.today()
    p_base["age"] = ((today - dob).dt.days / 365.25).round(0)

    # Última valoración de mercado
    if not valuations.empty and {"player_id", "market_value_in_eur"}.issubset(valuations.columns):
        v = valuations.copy()
        if "date" in v.columns:
            v["date"] = pd.to_datetime(v["date"], errors="coerce")
            v = v.sort_values(["player_id", "date"])
            last_v = v.groupby("player_id").tail(1)[["player_id", "market_value_in_eur"]]
        else:
            last_v = v.groupby("player_id", as_index=False)["market_value_in_eur"].last()

        last_v = last_v.rename(columns={"market_value_in_eur": "latest_market_value_eur"})
        p_base = p_base.merge(last_v, on="player_id", how="left")
        p_base["market_value_eur"] = p_base["latest_market_value_eur"].fillna(p_base["market_value_eur"])
        p_base = p_base.drop(columns=["latest_market_value_eur"])

    # Agregado de apariciones
    if appearances.empty:
        df = p_base.copy()
        df["league"] = ""
        df["season"] = ""
        df["minutes"] = 0
        df["goals"] = 0
        df["assists"] = 0
        df["yellow_cards"] = 0
        df["red_cards"] = 0
        df["appearances"] = 0
    else:
        a = appearances.copy()

        if "date" in a.columns:
            a["date"] = pd.to_datetime(a["date"], errors="coerce")
            a["season"] = a["date"].apply(
                lambda d: f"{d.year}-{d.year + 1}" if pd.notna(d) and d.month >= 7
                else (f"{d.year - 1}-{d.year}" if pd.notna(d) else "")
            )
        else:
            a["season"] = ""

        if not games.empty and "game_id" in a.columns and "game_id" in games.columns:
            g_cols = [c for c in ["game_id", "competition_id", "season"] if c in games.columns]
            a = a.merge(games[g_cols].drop_duplicates("game_id"), on="game_id", how="left", suffixes=("", "_game"))
            if "season_game" in a.columns:
                a["season"] = a["season"].replace("", pd.NA).fillna(a["season_game"].astype(str))

        if not competitions.empty and "competition_id" in a.columns and "competition_id" in competitions.columns:
            comp_cols = [c for c in ["competition_id", "name", "country_name"] if c in competitions.columns]
            comp = competitions[comp_cols].drop_duplicates("competition_id")
            comp = comp.rename(columns={"name": "league", "country_name": "league_country"})
            a = a.merge(comp, on="competition_id", how="left")
        else:
            a["league"] = ""

        numeric_cols = ["minutes_played", "goals", "assists", "yellow_cards", "red_cards"]
        for col in numeric_cols:
            if col not in a.columns:
                a[col] = 0
            a[col] = pd.to_numeric(a[col], errors="coerce").fillna(0)

        if "game_id" in a.columns:
            agg = a.groupby(["player_id", "season", "league"], as_index=False).agg(
                minutes=("minutes_played", "sum"),
                goals=("goals", "sum"),
                assists=("assists", "sum"),
                yellow_cards=("yellow_cards", "sum"),
                red_cards=("red_cards", "sum"),
                appearances=("game_id", "count"),
            )
        else:
            agg = a.groupby(["player_id", "season", "league"], as_index=False).agg(
                minutes=("minutes_played", "sum"),
                goals=("goals", "sum"),
                assists=("assists", "sum"),
                yellow_cards=("yellow_cards", "sum"),
                red_cards=("red_cards", "sum"),
                appearances=("player_id", "count"),
            )

        df = p_base.merge(agg, on="player_id", how="left")
        for col in ["minutes", "goals", "assists", "yellow_cards", "red_cards", "appearances"]:
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

    # Columnas compatibles con la web
    df["team"] = df["team"].fillna("")
    df["league"] = df.get("league", "").fillna("")
    df["season"] = df.get("season", "").fillna("")
    df["position"] = df["sub_position"].fillna("").where(df["sub_position"].fillna("") != "", df["position"].fillna(""))

    advanced_columns = [
        "penalty_goals", "xg", "npxg", "xa", "shots", "shots_on_target",
        "key_passes", "progressive_passes", "progressive_carries",
        "passes_into_final_third", "passes_into_box", "touches_box",
        "accurate_passes", "attempted_passes", "long_balls_completed",
        "long_balls_attempted", "pressures", "successful_pressures",
        "tackles", "interceptions", "blocks", "clearances", "duels_won",
        "duels_total", "aerials_won", "aerials_total",
        "carries_into_final_third", "carries_into_box", "dispossessed",
        "miscontrols", "fouls", "save_pct", "goals_prevented",
        "clean_sheets", "starts"
    ]

    for col in advanced_columns:
        if col not in df.columns:
            df[col] = ""

    final_cols = [
        "player", "team", "league", "country", "season", "position", "age",
        "minutes", "market_value_eur", "contract_status", "goals",
        "penalty_goals", "assists", "xg", "npxg", "xa", "shots",
        "shots_on_target", "key_passes", "progressive_passes",
        "progressive_carries", "passes_into_final_third", "passes_into_box",
        "touches_box", "accurate_passes", "attempted_passes",
        "long_balls_completed", "long_balls_attempted", "pressures",
        "successful_pressures", "tackles", "interceptions", "blocks",
        "clearances", "duels_won", "duels_total", "aerials_won",
        "aerials_total", "carries_into_final_third", "carries_into_box",
        "dispossessed", "miscontrols", "fouls", "yellow_cards",
        "red_cards", "save_pct", "goals_prevented", "clean_sheets",
        "starts", "appearances", "source"
    ]

    df = df[final_cols].copy()
    df = df[df["player"].fillna("").astype(str).str.strip() != ""]
    df = df.sort_values(["season", "league", "minutes"], ascending=[False, True, False])

    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Guardado principal dentro de la carpeta data.
    df.to_csv(output_path, index=False)

    # Línea pedida explícitamente.
    df.to_csv("players_advanced.csv", index=False)

    print(f"Created: {output_path}")
    print(f"Rows: {len(df):,}")
    print("Also created: players_advanced.csv")


if __name__ == "__main__":
    main()
