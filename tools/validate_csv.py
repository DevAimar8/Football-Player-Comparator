#!/usr/bin/env python3
"""
Validador simple de CSV usando solo librerías estándar de Python.

Uso:
python tools/validate_csv.py data/raw/mi_archivo.csv
"""

import csv
import sys
from pathlib import Path

MIN_COLUMNS = {"player", "team", "league", "position", "age", "minutes"}

ALIASES = {
    "Player": "player",
    "Squad": "team",
    "Team": "team",
    "Comp": "league",
    "Pos": "position",
    "Min": "minutes",
    "Mins": "minutes",
    "Gls": "goals",
    "Ast": "assists",
    "Sh": "shots",
    "SoT": "shots_on_target",
    "xG": "xg",
    "npxG": "npxg",
    "xAG": "xa",
    "PrgP": "progressive_passes",
    "PrgC": "progressive_carries",
}

def normalize_header(header: str) -> str:
    header = header.strip()
    if header in ALIASES:
        return ALIASES[header]
    return (
        header.lower()
        .replace("%", "pct")
        .replace("/", "_")
        .replace("-", "_")
        .replace(" ", "_")
    )

def main() -> int:
    if len(sys.argv) < 2:
        print("Uso: python tools/validate_csv.py archivo.csv")
        return 1

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"No existe el archivo: {path}")
        return 1

    with path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        try:
            headers = next(reader)
        except StopIteration:
            print("CSV vacío.")
            return 1

        normalized = [normalize_header(h) for h in headers]
        missing = sorted(MIN_COLUMNS - set(normalized))

        rows = sum(1 for _ in reader)

    print(f"Archivo: {path}")
    print(f"Filas de jugadores: {rows}")
    print(f"Columnas detectadas: {len(normalized)}")

    if missing:
        print("Faltan columnas mínimas:", ", ".join(missing))
        return 1

    print("CSV válido para el comparador.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
