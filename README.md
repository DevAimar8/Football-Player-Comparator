# Football Advanced Comparator — Kaggle Ready

Comparador avanzado de futbolistas para scouting, análisis y rankings por rol.

Esta versión incluye una web estática lista para Vercel y un pipeline opcional para generar `data/players_advanced.csv` desde KaggleHub usando el dataset:

```text
davidcariboo/player-scores
```

## Qué incluye

- `index.html`: app web.
- `styles.css`: estilos.
- `app.js`: modelo de scoring, filtros, radar y exportación.
- `data/demo_players.csv`: datos demo.
- `data/players_advanced.csv`: placeholder inicial. Se reemplaza al ejecutar el pipeline.
- `tools/download_player_scores.py`: descarga el dataset de Kaggle.
- `tools/build_players_advanced.py`: genera el CSV maestro.
- `requirements.txt`: dependencias para el pipeline.
- `vercel.json`: configuración para deploy estático.

## Importante sobre los datos

El dataset `davidcariboo/player-scores` es muy útil para crear una base global de futbolistas con:

```text
jugadores
clubes
ligas
países
edades
posiciones
valores de mercado
minutos
goles
asistencias
tarjetas
apariciones
historial básico
```

Pero no es Wyscout, Opta ni StatsBomb.

Normalmente no trae métricas como:

```text
xG real
xA real
presiones reales
pases progresivos reales
conducciones progresivas reales
tracking
carreras sin balón
duelos detallados por zona
```

La herramienta funciona así:

1. Si tu CSV trae métricas avanzadas reales, las usa directamente.
2. Si no las trae, crea proxies y baja la confianza del dato.
3. Te muestra un ranking útil, pero transparente.

## Instalar dependencias para generar datos

```bash
pip install -r requirements.txt
```

## Descargar dataset de Kaggle

```bash
python tools/download_player_scores.py
```

El script incluye exactamente este bloque:

```python
import kagglehub

# Download latest version
path = kagglehub.dataset_download("davidcariboo/player-scores")

print("Path to dataset files:", path)
```

## Generar `players_advanced.csv`

```bash
python tools/build_players_advanced.py
```

El script genera dos archivos:

```text
data/players_advanced.csv
players_advanced.csv
```

Dentro del script está incluida la línea que pediste:

```python
df.to_csv("players_advanced.csv", index=False)
```

Y también guarda el archivo dentro de `data/`, que es lo que usa la web:

```python
df.to_csv(output_path, index=False)
```

## Usar en local

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

En la web puedes usar:

```text
Cargar demo
Cargar players_advanced.csv
Subir CSV propio
```

## Deploy en Vercel

Flujo recomendado:

```text
1. Ejecuta en local: pip install -r requirements.txt
2. Ejecuta: python tools/build_players_advanced.py
3. Verifica que existe data/players_advanced.csv
4. Sube todo a GitHub
5. Importa el repo en Vercel
6. Framework Preset: Other
7. Build Command: vacío
8. Output Directory: vacío o .
9. Deploy
```

Vercel no ejecuta el scraper de Kaggle en esta versión. La idea es generar el CSV en local y subirlo ya creado.

## Actualizar datos

Cuando quieras actualizar:

```bash
python tools/build_players_advanced.py
git add data/players_advanced.csv
git commit -m "Update players advanced data"
git push
```

Vercel redesplegará la app con los datos nuevos.

## Columnas del CSV maestro

```text
player
team
league
country
season
position
age
minutes
market_value_eur
contract_status
goals
penalty_goals
assists
xg
npxg
xa
shots
shots_on_target
key_passes
progressive_passes
progressive_carries
passes_into_final_third
passes_into_box
touches_box
accurate_passes
attempted_passes
long_balls_completed
long_balls_attempted
pressures
successful_pressures
tackles
interceptions
blocks
clearances
duels_won
duels_total
aerials_won
aerials_total
carries_into_final_third
carries_into_box
dispossessed
miscontrols
fouls
yellow_cards
red_cards
save_pct
goals_prevented
clean_sheets
starts
appearances
source
```

## Cómo conseguir estadística avanzada real

Para enriquecer el CSV, puedes unir `players_advanced.csv` con datos de:

```text
FBref/Kaggle: xG, xA, tiros, pases, progresivos, defensa
StatsBomb Open Data: eventos avanzados de competiciones concretas
Sofascore/FotMob/AiScore: datos exportados/manuales
Transfermarkt/player-scores: edad, club, valor, mercado
```

El objetivo es que todo acabe en un único CSV compatible con la web.

## Filosofía

No busca vender humo.

Si hay datos avanzados reales, los usa.

Si no hay datos avanzados reales, calcula proxies, baja la confianza y te deja comparar con contexto.
