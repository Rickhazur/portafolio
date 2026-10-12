# Plantilla reutilizable: prompt para escenarios ramificados en HTML

**Para qué sirve:** tú llenas el contenido (objetivos, situaciones, opciones, feedback) y cualquier IA te devuelve el HTML interactivo listo — el mismo formato de *Spot the Phish* (muestra 2 del portafolio).

**Cómo usarla:** copia el bloque "PROMPT MAESTRO", reemplaza todo lo que está entre `[CORCHETES]` con tu contenido, pégalo en la IA y pide el archivo HTML.

---

## PROMPT MAESTRO (copiar y pegar)

```
Act as an expert instructional designer and front-end developer.

Build ONE self-contained HTML file (no external dependencies except Google Fonts)
for an interactive branching scenario with these specifications:

TITLE: [Título del escenario, en inglés]
AUDIENCE: [Quién lo va a usar — ej: "B1 Latino professionals in customer service"]
LANGUAGE OF CONTENT: English only (all on-screen text in English)

LEARNING OBJECTIVES (show as a card at the start, 3-4 max):
1. [Objetivo 1 — observable, ej: "Identify 3 red flags in a phishing email"]
2. [Objetivo 2]
3. [Objetivo 3]

ROLE FRAMING: The learner plays [nombre y rol, ej: "Ana, junior accountant"].
Write a 2-sentence situational setup in second person ("You are Ana...").

INTERFACE: A realistic [tipo de interfaz — ej: "email inbox" / "chat window" /
"meeting room"]. Items must ARRIVE ONE AT A TIME (sequential reveal), each with
a subtle notification sound (Web Audio API beep, no external file).

SCENARIOS (in progressive difficulty — easy → medium → hard → discrimination test):
Design [NÚMERO, ej: 4] scenarios. For EACH scenario provide:
- The artifact (the full email / message / dialogue the learner reads)
- 2-3 decision options (buttons), each with:
  - IDEAL answer (best practice)
  - ACCEPTABLE answer (partially correct — explain what is missing)
  - WRONG answer(s)
- ANNOTATED FEEDBACK: after the learner answers, show the artifact again with the
  key clues HIGHLIGHTED IN PLACE (numbered markers on the artifact itself), each
  with a one-line explanation below
- A "WHAT HAPPENS NEXT" consequence story (2-3 sentences showing the realistic
  outcome of their choice — good or bad)

FINAL SCREEN:
- Score X out of [N] with a short encouraging message tied to the score
- POCKET CARD: 5 golden rules (one line each) the learner can screenshot
- TRANSFER REFLECTION: one open question ("When have you seen this at work?...")
  with a text box (no grading, just reflection)

TECHNICAL REQUIREMENTS:
- Single .html file, pure HTML + CSS + JavaScript, zero build step
- Mobile responsive (must work on a phone)
- Color palette: light background, teal #026A79 primary, amber accent #E8A838,
  dark ink text #123C46 — clean professional style, no dark mode
- Accessibility: all text must pass WCAG AA contrast; visible keyboard focus;
  SVG icons only (never ✓/!/emoji as icons)
- Motion with purpose only: one signature moment (typewriter intro OR arrival
  animation), everything else static — no generic scroll-reveal
- Optional: an <audio> slot at the start for an intro narration mp3
  (id="narr", src="audio/intro-en.mp3", with a play button)

CONTENT FOR THE [N] SCENARIOS (fill each one):

ESCENARIO 1 (fácil — la trampa obvia):
Artefacto: [pega aquí el email/mensaje/diálogo completo]
Pistas: [lista las 2-3 señales que el estudiante debe detectar]
Opción ideal: [texto del botón] → feedback: [qué pasa]
Opción aceptable: [texto del botón] → feedback: [qué le falta]
Opción incorrecta: [texto del botón] → consecuencia: [historia de qué pasa]

ESCENARIO 2 (medio):
[repite la estructura]

ESCENARIO 3 (difícil — la trampa sutil):
[repite la estructura — aquí la pista debe ser MUY sutil, ej: un dominio
casi idéntico al real]

ESCENARIO 4 (discriminación — el caso LEGÍTIMO):
[repite la estructura — este artefacto debe ser REAL y seguro; el estudiante
aprende a NO marcar todo como peligroso]

GOLDEN RULES (5, una línea cada una):
1. [Regla 1]
2. [Regla 2]
3. [Regla 3]
4. [Regla 4]
5. [Regla 5]

REFLECTION QUESTION: [pregunta de transferencia al trabajo real]

Deliver the complete HTML file. No explanations, no markdown fences — just the file.
```

---

## Ejemplo rellenado (un escenario, para ver el formato)

```
ESCENARIO 3 (difícil — la trampa sutil):
Artefacto:
  De: security@bancolombia-secure.com
  Asunto: Verificación requerida de su cuenta
  "Estimado cliente, detectamos actividad inusual. Verifique su identidad aquí:
  [link] — Equipo de Seguridad"
Pistas: el dominio real es bancolombia.com (este tiene "-secure" agregado);
  saludo genérico "Estimado cliente"; urgencia artificial
Opción ideal: "Reportarlo como phishing sin hacer clic" →
  feedback: "Correcto: el dominio es falso aunque se vea oficial."
Opción aceptable: "Llamar al banco para verificar" →
  feedback: "Bien, pero perdiste tiempo: el dominio falso ya era prueba suficiente."
Opción incorrecta: "Hacer clic para verificar" →
  consecuencia: "El link instala un keylogger. El lunes tu cuenta está vacía."
```

---

*Creada 2026-10-11 — basada en la estructura pedagógica de "Spot the Phish" v2
(objetivos → rol → llegada secuencial → dificultad progresiva → feedback anotado
sobre el artefacto → consecuencias → tarjeta de bolsillo → reflexión → puntaje).*
