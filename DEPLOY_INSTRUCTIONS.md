# Deploy rápido en Vercel

## Archivos que deben estar en la raíz

```text
index.html
app.js
styles.css
vercel.json
package.json
requirements.txt
data/
tools/
README.md
```

## Con datos de Kaggle

```bash
pip install -r requirements.txt
python tools/build_players_advanced.py
```

Después sube el proyecto a GitHub y conéctalo a Vercel.

En Vercel:

```text
Framework Preset: Other
Build Command: vacío
Output Directory: vacío o .
Install Command: vacío
```

## Importante

Vercel no ejecuta el scraper de Kaggle en esta versión estática.
Primero genera `data/players_advanced.csv` en local y luego súbelo al repo.
