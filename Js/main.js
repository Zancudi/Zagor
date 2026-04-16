window.gameState = "intro";
window.musicStarted = false;

window.setGameState = function(state) {
  window.gameState = state;

  // Changement automatique de musique selon l'état
  switch(state) {
    case "intro":
      AudioManager.play("intro");
      break;
    case "intro1":
      AudioManager.crossFadeTo("intro1", 3000);
      break;
    case "rablaix":
      AudioManager.crossFadeTo("rablaix", 3000);
      break;
    case "anvar":
      AudioManager.crossFadeTo("anvar", 3000);
      break;
    case "braxus":
      AudioManager.crossFadeTo("braxus", 3000);
      break;
    case "sallazar":
      AudioManager.crossFadeTo("sallazar", 3000);
      break;
    case "wind1":
      AudioManager.crossFadeTo("wind1", 1500);
      break;
    case "flash":
      AudioManager.play("flash");
      break;
    // Ajoutez d'autres états et musiques si nécessaire  
  }
};

window.onload = function() {
  AudioManager.init();
  InputManager.init();
};

window.modifyStat = function(stat, value) {
  const current = State.variables[stat];
  const max = State.variables[stat + "Max"];

  let newValue = current + value;

  if (newValue > max) newValue = max;
  if (newValue < 0) newValue = 0;

  State.variables[stat] = newValue;
};

window.rollDice = function(number, sides = 6) {
  let results = [];
  let total = 0;

  for (let i = 0; i < number; i++) {
    let roll = Math.floor(Math.random() * sides) + 1;
    results.push(roll);
    total += roll;
  }

  return {
    results: results,
    total: total
  };
};
