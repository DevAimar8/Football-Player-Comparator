# Football Advanced Comparator

**Comparador avanzado de futbolistas para scouting, análisis de rendimiento y creación de rankings por rol.**

Football Advanced Comparator es una herramienta web estática pensada para comparar jugadores de cualquier liga del mundo usando datos públicos, CSVs propios o exportaciones de plataformas externas.

El objetivo del proyecto es poder responder preguntas como:

* ¿Qué delantero libre encaja mejor en mi equipo?
* ¿Qué central tiene mejores datos defensivos por 90 minutos?
* ¿Qué mediocentro genera más valor con pases progresivos y creación?
* ¿Qué jugadores destacan en una liga concreta ajustando por edad, minutos, contrato y coste?
* ¿Qué candidato es mejor según datos y no solo por nombre o reputación?

La herramienta funciona directamente en el navegador, sin backend, sin base de datos y sin librerías externas.

---

## Características principales

* Comparador global de futbolistas.
* Funciona con CSVs de cualquier fuente.
* Compatible con datos básicos y avanzados.
* Cálculo automático de métricas por 90 minutos.
* Scoring por rol.
* Percentiles comparativos.
* Radar visual entre dos jugadores.
* Filtros por liga, posición, edad, minutos, contrato y valor de mercado.
* Score ajustado por fuerza de liga.
* Sistema de confianza del dato.
* Proxies avanzados cuando faltan métricas premium.
* Exportación del ranking a CSV.
* Proyecto estático listo para desplegar en Vercel.

---

## Stack tecnológico

Este proyecto está construido con tecnologías simples para que sea fácil de usar, modificar y desplegar.

```text
HTML
CSS
JavaScript
CSV
Python estándar opcional
```

No utiliza:

```text
React
Next.js
Streamlit
Pandas
Backend
Base de datos
APIs privadas
Librerías externas
```

Todo el modelo corre en el navegador.

---

## Estructura del proyecto

```text
football_advanced_comparator_vercel/
├── index.html
├── styles.css
├── app.js
├── vercel.json
├── README.md
├── data/
│   ├── demo_players.csv
│   └── template_players.csv
└── tools/
    └── validate_csv.py
```

### Archivos principales

| Archivo                     | Descripción                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| `index.html`                | Interfaz principal de la aplicación.                                        |
| `styles.css`                | Estilos del dashboard.                                                      |
| `app.js`                    | Lógica del comparador, modelo, métricas, filtros y visualización.           |
| `data/demo_players.csv`     | Datos de ejemplo para probar la herramienta.                                |
| `data/template_players.csv` | Plantilla base para cargar tus propios jugadores.                           |
| `tools/validate_csv.py`     | Script opcional para validar CSVs usando solo librerías estándar de Python. |
| `vercel.json`               | Configuración básica para despliegue en Vercel.                             |

---

## Cómo usar la herramienta

### 1. Abre la web

Puedes abrir `index.html` en local o desplegar el proyecto en Vercel.

### 2. Carga datos

Tienes dos opciones:

* Pulsar **Cargar demo** para probar con datos de ejemplo.
* Subir tu propio archivo CSV.

### 3. Elige un rol

La herramienta permite comparar jugadores según el rol que buscas:

```text
Delantero finalizador
Delantero asociativo
Extremo desequilibrante
Mediocentro creador
Pivote defensivo
Central corrector
Central con salida de balón
Lateral ofensivo
Portero
```

### 4. Aplica filtros

Puedes filtrar por:

```text
Nombre
Equipo
Liga
Posición
Edad máxima
Minutos mínimos
Valor máximo
Situación contractual
```

### 5. Ejecuta el comparador

El modelo calculará:

```text
Score ajustado
Score de rol
Confianza del dato
Goles/90
Asistencias/90
npxG/90
xA/90
Pases progresivos/90
Pases clave/90
Duelos ganados %
Duelos aéreos ganados %
Intercepciones/90
```

### 6. Compara jugadores

Selecciona dos jugadores del ranking y la herramienta generará un radar comparativo.

### 7. Exporta resultados

Puedes exportar el ranking final a CSV para usarlo en Excel, Google Sheets, Power BI o tus vídeos.

---

## Formato del CSV

El archivo CSV debe tener una fila por jugador.

### Columnas mínimas

```text
player,team,league,country,season,position,age,minutes
```

### Columnas recomendadas

```text
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

---

## Ejemplo de CSV

```csv
player,team,league,country,season,position,age,minutes,market_value_eur,contract_status,goals,assists,shots,shots_on_target,key_passes,progressive_passes,duels_won,duels_total
Iker Unzueta,CD Lugo,Primera Federación,Spain,2025-2026,ST,27,2500,500000,free,11,2,62,27,18,42,160,310
Javier Ajenjo,CP Cacereño,Primera Federación,Spain,2025-2026,CM/AM,25,2070,200000,free,8,5,50,20,46,88,145,270
Álvaro Mayorga,Algeciras CF,Primera Federación,Spain,2025-2026,CB,27,2481,200000,free,2,0,12,4,4,20,205,360
```

---

## Compatibilidad con nombres de columnas

La herramienta reconoce varios alias comunes.

Por ejemplo:

| Columna original | Columna interna       |
| ---------------- | --------------------- |
| `Player`         | `player`              |
| `Squad`          | `team`                |
| `Team`           | `team`                |
| `Comp`           | `league`              |
| `Pos`            | `position`            |
| `Min`            | `minutes`             |
| `Gls`            | `goals`               |
| `Ast`            | `assists`             |
| `Sh`             | `shots`               |
| `SoT`            | `shots_on_target`     |
| `xG`             | `xg`                  |
| `npxG`           | `npxg`                |
| `xAG`            | `xa`                  |
| `PrgP`           | `progressive_passes`  |
| `PrgC`           | `progressive_carries` |

Esto permite usar datos exportados de distintas fuentes con menos trabajo de limpieza.

---

## Cómo calcula el modelo

El modelo sigue cuatro pasos:

### 1. Normalización

Convierte los datos brutos del CSV en métricas comparables.

Ejemplo:

```text
Goles/90 = goles / minutos * 90
Asistencias/90 = asistencias / minutos * 90
Intercepciones/90 = intercepciones / minutos * 90
```

### 2. Percentiles

Cada jugador se compara contra el grupo seleccionado.

Por ejemplo, si un delantero está en el percentil 90 de `goles/90`, significa que supera al 90% de los jugadores comparados en esa métrica.

### 3. Scoring por rol

Cada rol tiene pesos diferentes.

Ejemplo para un delantero finalizador:

```text
npxG/90
Goles/90
Goles por disparo
Tiros a puerta %
Toques en área/90
xG por disparo
Disponibilidad
Edad
Valor de mercado
```

Ejemplo para un central corrector:

```text
Intercepciones/90
Duelos ganados %
Duelos aéreos ganados %
Entradas/90
Despejes/90
Bloqueos/90
Tarjetas/90 inverso
Disponibilidad
```

### 4. Ajuste por contexto

El score final se ajusta según:

```text
Fuerza de liga
Confianza del dato
Edad
Valor de mercado
Minutos jugados
Situación contractual
```

---

## Métricas avanzadas reales y proxies

La herramienta puede trabajar con dos tipos de datos.

### Datos avanzados reales

Si tu CSV incluye métricas como:

```text
xg
npxg
xa
progressive_passes
progressive_carries
pressures
successful_pressures
touches_box
```

El modelo las utilizará directamente.

### Proxies avanzados

Si esas métricas no existen, la herramienta crea estimaciones razonables usando datos disponibles.

Ejemplo:

```text
npxG proxy = tiros a puerta * 0.22 + tiros fuera * 0.06
xA proxy = pases clave * 0.075 + asistencias * 0.18 + pases al área * 0.015
pases progresivos proxy = pases al último tercio + pases al área + balones largos completados * 0.35
presiones exitosas proxy = entradas + intercepciones * 0.8 + bloqueos * 0.4
```

Importante: los proxies no sustituyen a plataformas profesionales como Wyscout, StatsBomb, Opta o BeSoccer Pro. Sirven para construir un modelo gratuito, transparente y útil cuando no hay datos premium disponibles.

---

## Confianza del dato

Cada jugador recibe un valor de confianza.

La confianza sube cuando el CSV incluye:

```text
xG
npxG
xA
pases progresivos
conducciones progresivas
presiones
presiones exitosas
toques en área
datos defensivos completos
minutos suficientes
```

La confianza baja cuando:

```text
faltan métricas avanzadas
se usan muchos proxies
hay pocos minutos
faltan tiros, pases o duelos
```

Esto evita comparar como iguales a un jugador con datos completos y a otro con datos incompletos.

---

## Roles disponibles

### Delantero finalizador

Busca delanteros con alta producción de gol y buen volumen de remate.

Métricas principales:

```text
npxG/90
Goles/90
Goles por disparo
Tiros a puerta %
Toques en área/90
xG por disparo
```

### Delantero asociativo

Busca delanteros que, además de rematar, participen en la creación.

Métricas principales:

```text
npxG/90
xA/90
Pases clave/90
Asistencias/90
Precisión de pase
Toques en área/90
```

### Extremo desequilibrante

Busca jugadores capaces de progresar, generar y finalizar.

Métricas principales:

```text
xA/90
Pases clave/90
Conducciones progresivas/90
Conducciones al área/90
Tiros/90
Presiones exitosas/90
```

### Mediocentro creador

Busca centrocampistas con capacidad para progresar y crear ocasiones.

Métricas principales:

```text
xA/90
Pases clave/90
Pases progresivos/90
Pases al último tercio/90
Pases al área/90
Precisión de pase
```

### Pivote defensivo

Busca mediocentros con impacto defensivo y seguridad con balón.

Métricas principales:

```text
Intercepciones/90
Entradas/90
Presiones exitosas/90
Duelos ganados %
Pases progresivos/90
Precisión de pase
```

### Central corrector

Busca centrales fuertes en defensa, duelos y protección del área.

Métricas principales:

```text
Intercepciones/90
Duelos ganados %
Duelos aéreos ganados %
Entradas/90
Despejes/90
Bloqueos/90
```

### Central con salida de balón

Busca centrales defensivamente fiables y capaces de progresar con pase.

Métricas principales:

```text
Pases progresivos/90
Pases al último tercio/90
Precisión de pase
Intercepciones/90
Duelos aéreos ganados %
Duelos ganados %
```

### Lateral ofensivo

Busca laterales con recorrido, progresión y producción ofensiva.

Métricas principales:

```text
Conducciones progresivas/90
Pases progresivos/90
Pases al área/90
Pases clave/90
xA/90
Presiones exitosas/90
```

### Portero

Busca porteros con rendimiento bajo palos y capacidad para evitar goles.

Métricas principales:

```text
Porcentaje de paradas
Goles evitados/90
Porterías a cero %
Precisión de pase
Precisión de balón largo
Disponibilidad
```

---

## Cómo desplegar en Vercel

### Opción 1: desde GitHub

1. Crea un repositorio en GitHub.
2. Sube todos los archivos del proyecto.
3. Entra en Vercel.
4. Pulsa **Add New Project**.
5. Importa el repositorio.
6. En Framework Preset selecciona **Other**.
7. Deja el Build Command vacío.
8. Deja Output Directory vacío o usa `.`.
9. Pulsa **Deploy**.

### Opción 2: deploy manual

1. Entra en Vercel.
2. Crea un nuevo proyecto.
3. Arrastra la carpeta del proyecto.
4. Publica.

---

## Uso local

Puedes abrir directamente el archivo:

```text
index.html
```

También puedes levantar un servidor local con Python:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

---

## Validar un CSV

El proyecto incluye un validador opcional hecho con librerías estándar de Python.

Uso:

```bash
python tools/validate_csv.py data/template_players.csv
```

El script comprueba que existan las columnas mínimas:

```text
player
team
league
position
age
minutes
```

---

## Fuentes de datos recomendadas

La herramienta no depende de una fuente concreta. Puedes construir tus CSVs con datos de:

```text
Transfermarkt
FotMob
Sofascore
AiScore
BeSoccer
FBref
FootyStats
Datos propios
Exportaciones manuales
Informes internos
```

Para scouting gratuito, una estrategia útil es:

```text
Transfermarkt → contrato, edad, valor y situación de mercado
FotMob / Sofascore → rendimiento, minutos, goles, asistencias y ratings
AiScore / BeSoccer → datos adicionales de partido
FootyStats → contexto de equipo y xG agregado
CSV propio → limpieza y unificación
Football Advanced Comparator → ranking final
```

---

## Limitaciones

Esta herramienta no hace magia.

No puede obtener métricas privadas si no están en el CSV.

No garantiza que los datos sean correctos si la fuente original está incompleta.

No sustituye el análisis de vídeo.

No sustituye herramientas profesionales como:

```text
Wyscout
StatsBomb
Opta
BeSoccer Pro
Driblab
SkillCorner
InStat
```

Su objetivo es ofrecer un comparador gratuito, flexible y transparente para proyectos personales, vídeos, análisis amateur o scouting inicial.

---

## Buenas prácticas

Para obtener mejores resultados:

```text
Usa jugadores con al menos 900 minutos.
Compara jugadores de posiciones similares.
No mezcles porteros con jugadores de campo.
Revisa siempre la confianza del dato.
No tomes decisiones solo por el score.
Combina datos con vídeo.
Ten en cuenta edad, salario, contrato y contexto de equipo.
```

---

## Ejemplo de uso real

Supongamos que quieres buscar un delantero libre para un equipo con poco presupuesto.

Filtros:

```text
Posición: ST
Contrato: free
Edad máxima: 29
Minutos mínimos: 1200
Valor máximo: 700000
Rol: Delantero finalizador
```

El modelo ordenará candidatos usando:

```text
npxG/90
Goles/90
Goles por disparo
Tiros a puerta %
Toques en área/90
Disponibilidad
Edad
Valor de mercado
Confianza del dato
```

Después puedes comparar los dos mejores candidatos en el radar visual.

---

## Posibles mejoras futuras

Ideas para próximas versiones:

```text
Modo equipo objetivo
Ajuste por estilo de juego del equipo
Carga de varios CSVs a la vez
Histórico por temporadas
Comparador de evolución
Radar personalizable
Pesos editables desde la interfaz
Scraping controlado desde Python
Importador de FBref
Importador de Transfermarkt
Generador de informe PDF
Modo oscuro
Autoguardado local
```

---

## Filosofía del proyecto

Football Advanced Comparator parte de una idea simple:

> No siempre necesitas tener la herramienta más cara para tomar mejores decisiones.
> Necesitas datos bien estructurados, métricas comparables, contexto y transparencia.

El modelo no pretende decir “este jugador es bueno” de forma absoluta.

Pretende ayudarte a responder:

```text
Qué jugador encaja mejor
en qué rol
con qué datos
contra qué comparación
con qué nivel de confianza
y a qué coste
```

---

## Autor

Proyecto creado para análisis futbolístico, scouting basado en datos y creación de contenido deportivo.

**Aimar Football Data Lab**
# Football-Player-Comparator
