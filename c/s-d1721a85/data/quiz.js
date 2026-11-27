/* Quiz final (lecciones 1 a 3, sin verbos -ar de la clase 4) · 16 preguntas en 4 partes. Ítems del banco del Pedagogo (banco-quiz-ricardo.md);
   la Parte 2 («Di la hora») se pasó a opción múltiple para calificar sola;
   la Parte 4 (verbos -ar) se reemplazó por aeropuerto y números de las lecciones 1 a 3 (ítems nuevos, frases de la lección 1 y 2). */
window.QUIZ={
 id:"quiz",
 endpoint:"https://formsubmit.co/ajax/rickhazur@gmail.com",
 parts:[
  {n:1,name:"Escucha y elige",en:"Listen and choose",help:"Escucha el audio (puedes repetirlo una vez) y elige.",helpEn:"Listen (you can repeat once) and choose."},
  {n:2,name:"La hora",en:"Telling time",help:"Elige cómo se dice la hora.",helpEn:"Choose how to say the time."},
  {n:3,name:"¿Qué dices?",en:"What do you say?",help:"Elige la mejor respuesta.",helpEn:"Choose the best answer."},
  {n:4,name:"Aeropuerto y números",en:"Airport and numbers",help:"Elige la mejor respuesta.",helpEn:"Choose the best answer."}
 ],
 items:[
  {p:1,topic:"Hora",skill:"hora: «faltan… para…» (escuchar)",kind:"listen",v:"es-MX-DaliaNeural",audio:"Faltan veinte para las seis.",a:"3e8caaba93",stem:"¿Qué hora es?",en:"What time is it?",options:["5:40","6:20","5:20","6:40"],key:0},
  {p:1,topic:"Números y precios",skill:"números: precios en pesos (escuchar)",kind:"listen",v:"es-US-AlonsoNeural",audio:"Son trescientos cuarenta pesos.",a:"92e94f597b",stem:"¿Cuánto es?",en:"How much is it?",options:["$430","$340","$304","$350"],key:1},
  {p:1,topic:"Hora",skill:"hora: anuncio del aeropuerto (escuchar)",kind:"listen",v:"es-MX-DaliaNeural",audio:"Atención: el vuelo a Oaxaca sale por la sala quince a las seis y media.",a:"7f915284ed",stem:"¿A qué hora sale el vuelo?",en:"What time does the flight leave?",options:["6:15","7:30","6:30","5:30"],key:2},
  {p:1,topic:"Taxi",skill:"taxi: tiempo del viaje (escuchar)",kind:"listen",v:"es-US-AlonsoNeural",audio:"Al centro son trescientos pesos, pero hay tráfico: se hace como treinta minutos.",a:"3962d8ae3f",stem:"¿Cuánto tiempo se hace?",en:"How long does it take?",options:["13 minutos","3 minutos","40 minutos","30 minutos"],key:3},
  {p:2,topic:"Hora",skill:"hora: decir 8:50 («faltan… para…»)",kind:"mc",stem:"8:50",en:"How do you say 8:50?",options:["Son las nueve y diez.","Faltan diez para las nueve.","Faltan diez para las ocho.","Son las ocho y quince."],key:1},
  {p:2,topic:"Hora",skill:"hora: decir 1:15 («es la una»)",kind:"mc",stem:"1:15",en:"How do you say 1:15?",options:["Son las una y cuarto.","Es la una y media.","Es la una y cuarto.","Es las dos y cuarto."],key:2},
  {p:2,topic:"Hora",skill:"hora: decir 3:45 («falta un cuarto para…»)",kind:"mc",stem:"3:45",en:"How do you say 3:45?",options:["Falta un cuarto para las cuatro.","Falta un cuarto para las tres.","Son las cuatro y cuarto.","Son las tres y cuarto."],key:0},
  {p:3,topic:"Taxi",skill:"taxi: decir de dónde eres («soy de…»)",kind:"mc",stem:"El taxista pregunta: «¿De dónde es usted?»",en:"The driver asks where you are from.",options:["Vivo de Estados Unidos.","Estoy de Estados Unidos.","Soy en Estados Unidos.","Soy de Estados Unidos."],key:3},
  {p:3,topic:"Taxi",skill:"taxi: preguntar el precio («¿cuánto me cobra?»)",kind:"mc",stem:"Antes de subir, quieres saber el precio. ¿Qué preguntas?",en:"Before getting in, you want to know the price.",options:["¿Cuánto le debo?","¿Cuántos me cobra?","¿Cuánto me cobra?","¿Cuánto me debe?"],key:2},
  {p:3,topic:"Taxi",skill:"taxi: dejar el cambio («quédese con el cambio»)",kind:"mc",stem:"El viaje cuesta $450 y das $500. No quieres el cambio. ¿Qué dices?",en:"The ride is $450, you give $500 and don't want change.",options:["Quédese en el cambio.","Quédese con el cambio.","Quédese con la cambio.","Quede con el cambio."],key:1},
  {p:3,topic:"Saludos",skill:"saludos: presentarse («mucho gusto, soy…»)",kind:"mc",stem:"Conoces a una persona nueva. Te dice: «Hola, soy Laura». ¿Qué contestas?",en:"You meet someone new: «Hola, soy Laura».",options:["Mucho gusto, estoy Shannon.","Muy gusto, soy Shannon.","Mucho gusto, soy Shannon.","Mucha gusto, soy Shannon."],key:2},
  {p:3,topic:"Taxi",skill:"taxi: «ya vine antes» / «me encanta»",kind:"mc",stem:"El taxista pregunta: «¿Es su primera vez en Oaxaca?» Ya fuiste antes.",en:"The driver asks if it's your first time in Oaxaca. You've been before.",options:["No, ya vine antes. ¡Me encanta!","No, ya vino antes. ¡Me encanta!","No, ya vine antes. ¡Me encanto!","No, ya vengo antes. ¡Me encanta!"],key:0},
  {p:3,topic:"Saludos",skill:"saludos: «buenos días, ¿cómo está?»",kind:"mc",stem:"Por la mañana saludas a la señora del hotel y le preguntas cómo está ella.",en:"In the morning you greet the hotel lady and ask how she is.",options:["Buenas días, ¿cómo está?","Buenos días, ¿cómo es?","Buenos días, ¿cómo estoy?","Buenos días, ¿cómo está?"],key:3},
  {p:4,topic:"Aeropuerto",skill:"aeropuerto: pedir que repitan («¿me lo puede repetir…?»)",kind:"mc",stem:"No entendiste al agente del aeropuerto. ¿Qué dices?",en:"You didn't understand the airport agent.",options:["¿Me lo puedo repetir más despacio?","¿Me lo puede repetir más despacio?","¿Me lo puede repetido más despacio?","¿Lo me puede repetir más despacio?"],key:1},
  {p:4,topic:"Aeropuerto",skill:"aeropuerto: preguntar dónde está algo («¿dónde está…?»)",kind:"mc",stem:"Buscas la puerta 12. ¿Qué preguntas?",en:"You are looking for gate 12.",options:["¿Dónde es la puerta doce?","¿Dónde está la puerta doce?","¿Dónde están la puerta doce?","¿Qué está la puerta doce?"],key:1},
  {p:4,topic:"Números y precios",skill:"números: centenas (700 = setecientos)",kind:"mc",stem:"¿Cómo se dice $750?",en:"How do you say $750?",options:["Setecientos cincuenta pesos.","Sietecientos cincuenta pesos.","Setenta y cincuenta pesos.","Quinientos setenta pesos."],key:0},
 ]
};
