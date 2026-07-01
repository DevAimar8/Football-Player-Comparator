"""
Descarga el dataset público de Kaggle:
https://www.kaggle.com/datasets/davidcariboo/player-scores

Instalación:
    pip install -r requirements.txt

Uso:
    python tools/download_player_scores.py
"""

from pathlib import Path
import shutil
import kagglehub

# Download latest version
path = kagglehub.dataset_download("davidcariboo/player-scores")

print("Path to dataset files:", path)

# Copia opcional al proyecto para trabajar de forma estable.
project_root = Path(__file__).resolve().parents[1]
raw_dir = project_root / "data" / "raw" / "player-scores"
raw_dir.mkdir(parents=True, exist_ok=True)

for file in Path(path).glob("*"):
    if file.is_file():
        shutil.copy2(file, raw_dir / file.name)

print("Copied dataset files to:", raw_dir)
