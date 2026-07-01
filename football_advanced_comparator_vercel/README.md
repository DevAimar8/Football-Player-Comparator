# Football Advanced Comparator — Vercel Edition

Comparador global de estadísticas avanzadas de futbolistas para usar en cualquier vídeo, equipo, liga o mercado.

Está pensado para funcionar gratis:

- Sin Streamlit.
- Sin pandas.
- Sin base de datos.
- Sin backend obligatorio.
- Sin librerías externas.
- Listo para subir a Vercel como web estática.

La app funciona directamente en el navegador con HTML, CSS y JavaScript puro.

## Qué puedes hacer

- Subir un CSV con jugadores de cualquier liga.
- Comparar jugadores de todo el mundo.
- Filtrar por posición, liga, edad, minutos, valor de mercado y contrato.
- Elegir un rol:
  - Delantero finalizador
  - Delantero asociativo
  - Extremo desequilibrante
  - Mediocentro creador
  - Pivote defensivo
  - Central corrector
  - Central con salida de balón
  - Lateral ofensivo
  - Portero
- Calcular métricas por 90 minutos.
- Calcular porcentajes: acierto a puerta, goles por disparo, duelos ganados, duelos aéreos, precisión de pase.
- Usar métricas avanzadas reales si existen:
  - xG
  - npxG
  - xA
  - pases progresivos
  - conducciones progresivas
  - presiones
  - presiones exitosas
  - toques en área
- Crear proxies cuando no existan datos premium.
- Mostrar score global, score ajustado por liga, confianza del dato y explicación.
- Comparar dos jugadores con radar SVG.
- Exportar el ranking resultante a CSV.

## Estructura

```text
football_advanced_comparator_vercel/
├── index.html
├── styles.css
├── app.js
├── vercel.json
├── data/
│   ├── demo_players.csv
│   └── template_players.csv
├── tools/
│   └── validate_csv.py
└── README.md
```

## Subir a Vercel

1. Crea un repositorio en GitHub.
2. Sube todos estos archivos.
3. Entra en Vercel.
4. Importa el repositorio.
5. Framework Preset: **Other**.
6. Build Command: vacío.
7. Output Directory: vacío o `.`
8. Deploy.

También puedes arrastrar la carpeta a Vercel desde el panel si usas deploy manual.

## Cómo usarlo

1. Abre la web.
2. Pulsa **Cargar demo** o sube tu propio CSV.
3. Elige un rol.
4. Ajusta filtros.
5. Ordena por score.
6. Selecciona jugadores para compararlos.

## Formato del CSV

Puedes usar `data/template_players.csv` como plantilla.

Columnas mínimas:

```text
player,team,league,country,season,position,age,minutes
```

Columnas recomendadas:

```text
market_value_eur,contract_status,goals,penalty_goals,assists,xg,npxg,xa,shots,shots_on_target,key_passes,progressive_passes,progressive_carries,passes_into_final_third,passes_into_box,touches_box,accurate_passes,attempted_passes,long_balls_completed,long_balls_attempted,pressures,successful_pressures,tackles,interceptions,blocks,clearances,duels_won,duels_total,aerials_won,aerials_total,carries_into_final_third,carries_into_box,dispossessed,miscontrols,fouls,yellow_cards,red_cards,save_pct,goals_prevented,clean_sheets,starts,appearances
```

## Alias de columnas

El sistema acepta nombres tipo FBref o genéricos. Por ejemplo:

- `Player` → `player`
- `Squad` → `team`
- `Comp` → `league`
- `Pos` → `position`
- `Min` → `minutes`
- `Gls` → `goals`
- `Ast` → `assists`
- `Sh` → `shots`
- `SoT` → `shots_on_target`
- `xG` → `xg`
- `npxG` → `npxg`
- `xAG` → `xa`
- `PrgP` → `progressive_passes`
- `PrgC` → `progressive_carries`

## Importante

Esta herramienta no inventa que tiene Wyscout gratis.

Hace esto:

1. Usa datos avanzados reales si vienen en tu CSV.
2. Si no existen, crea proxies razonables.
3. Marca la confianza del dato.
4. Te deja comparar jugadores de manera transparente.

Para categorías como Primera RFEF, esto es lo más realista si quieres trabajar gratis.
