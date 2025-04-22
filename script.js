// Liste med flere gåter
const gåter = [
  {
    answer: "løve",
    clues: [
      "Jeg er et stort dyr.",
      "Jeg kalles ofte for jungelens konge.",
      "Jeg har en imponerende manke.",
    ],
  },
  {
    answer: "pyramide",
    clues: [
      "Jeg er gammel og laget av stein.",
      "Jeg finnes i Egypt.",
      "Jeg har en spiss topp og firkantet bunn.",
    ],
  },
  {
    answer: "elvis",
    clues: [
      "Jeg var en kjent musiker.",
      "Jeg hadde karakteristisk hår og klær.",
      "Jeg er kjent som ‘The King of Rock and Roll’.",
    ],
  },
  {
    answer: "is",
    clues: [
      "Jeg er kald og søt.",
      "Jeg smelter hvis du ikke spiser meg raskt.",
      "Jeg kommer i mange smaker og farger.",
    ],
  },
];

let valgtGåte = null;
let currentClueIndex = 0;
let gameStarted = false;

const clueDiv = document.getElementById("clue");
const messageDiv = document.getElementById("message");
const userInput = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const startButton = document.getElementById("startButton");

function startGame() {
  gameStarted = true;
  currentClueIndex = 0;
  messageDiv.textContent = "";
  userInput.value = "";
  userInput.disabled = false;
  submitButton.disabled = false;

  const randomIndex = Math.floor(Math.random() * gåter.length);
  valgtGåte = gåter[randomIndex];

  showNextClue();
}

function showNextClue() {
  if (currentClueIndex < valgtGåte.clues.length) {
    clueDiv.textContent = valgtGåte.clues[currentClueIndex];
  } else {
    clueDiv.textContent = "Ingen flere ledetråder!";
  }
}

function checkAnswer() {
  const userAnswer = userInput.value.trim().toLowerCase();
  if (userAnswer === "") return;

  if (userAnswer === valgtGåte.answer.toLowerCase()) {
    messageDiv.textContent = "Riktig! Gratulerer – du vant spillet!";
    endGame();
  } else {
    messageDiv.textContent = "Feil svar, prøv igjen!";
    currentClueIndex++;
    if (currentClueIndex < valgtGåte.clues.length) {
      setTimeout(() => {
        showNextClue();
        messageDiv.textContent = "";
      }, 1500);
    } else {
      setTimeout(() => {
        clueDiv.textContent = `Spillet er over! Det riktige svaret var: ${valgtGåte.answer.toUpperCase()}.`;
        endGame();
      }, 1500);
    }
  }

  userInput.value = "";
}

function endGame() {
  gameStarted = false;
  userInput.disabled = true;
  submitButton.disabled = true;
}

startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", checkAnswer);
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
