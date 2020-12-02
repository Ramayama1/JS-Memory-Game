document.addEventListener("DOMContentLoaded", () => {
  //card options
  let cardArray = [
    {
      name: "squirrel",
      img: "images/image1.jpg",
    },
    {
      name: "squirrel",
      img: "images/image1.jpg",
    },
    {
      name: "buffalo",
      img: "images/image2.jpg",
    },
    {
      name: "buffalo",
      img: "images/image2.jpg",
    },
    {
      name: "elephant",
      img: "images/image3.jpg",
    },
    {
      name: "elephant",
      img: "images/image3.jpg",
    },
    {
      name: "hedgehog",
      img: "images/image4.jpg",
    },
    {
      name: "hedgehog",
      img: "images/image4.jpg",
    },
    {
      name: "raccoon",
      img: "images/image5.jpg",
    },
    {
      name: "raccoon",
      img: "images/image5.jpg",
    },
    {
      name: "bear",
      img: "images/image6.jpg",
    },
    {
      name: "bear",
      img: "images/image6.jpg",
    },
  ];
  cardArray.sort(() => 0.5 - Math.random());
  let cardArray2 = [
    {
      name: "fox",
      img: "images/image8.jpg",
    },
    {
      name: "fox",
      img: "images/image8.jpg",
    },
    {
      name: "bunny",
      img: "images/image9.jpg",
    },
    {
      name: "bunny",
      img: "images/image9.jpg",
    },
    {
      name: "panda",
      img: "images/image10.jpg",
    },
    {
      name: "panda",
      img: "images/image10.jpg",
    },
    {
      name: "owl",
      img: "images/image11.jpg",
    },
    {
      name: "owl",
      img: "images/image11.jpg",
    },
    {
      name: "articFox",
      img: "images/image12.jpg",
    },
    {
      name: "articFox",
      img: "images/image12.jpg",
    },
    {
      name: "zebra",
      img: "images/image13.jpg",
    },
    {
      name: "zebra",
      img: "images/image13.jpg",
    },
  ];
  let level = 1;
  let sec = 30;
  let isProcessing = false;
  //create the board
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector(".result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timer;
  function createBoard() {
    resultDisplay.textContent = "Matches: 0";
    document.querySelector(".timer").innerHTML = "Timer: ";
    clearInterval(timer);
    sec;
    timer = setInterval(function () {
      document.querySelector(".timer").innerHTML = "Timer " + sec + " secs";
      sec--;
      if (sec < 0) {
        function deleteBoard() {
          cardsWon = [];
          cardsChosenId = [];
          cardsChosen = [];
          function removeAllChildNodes(parent) {
            while (parent.firstChild) {
              parent.removeChild(parent.firstChild);
            }
          }
          const grid = document.querySelector(".grid");
          removeAllChildNodes(grid);
        }
        deleteBoard();
        document.querySelector("p").innerHTML =
          "Sorry, You ran out of time!\nPress Reset to try again!";
        clearInterval(timer);
      }
    }, 1000);
    document.querySelector(".level").innerHTML = ` Level: ${level}`;
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", cardBack);
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }
  function levelUp() {
    //delete board function
    function deleteBoard() {
      cardsWon = [];
      cardsChosenId = [];
      cardsChosen = [];
      function removeAllChildNodes(parent) {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      }
      const grid = document.querySelector(".grid");
      removeAllChildNodes(grid);
      addCard();
    }
    function addCard() {
      cardArray.push(cardArray2[0]);
      cardArray.push(cardArray2[1]);
      cardArray2.shift();
      cardArray2.shift();
      cardArray.sort(() => 0.5 - Math.random());
      level++;
      sec = 30 * level;
      createBoard();
    }
    deleteBoard();
  }
  //check for match
  function checkForMatch() {
    let cards = document.querySelectorAll("img");
    let p = document.querySelector("p");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    //console.log(cardsChosenId[0], cardsChosenId[1]);
    if (optionOneId == optionTwoId) {
      cards[optionTwoId].setAttribute("src", cardBack);
      cards[optionOneId].setAttribute("src", cardBack);
      p.innerHTML = "You chose the same card!";
      isProcessing = false;
    } else if (cardsChosen[0] === cardsChosen[1]) {
      p.innerHTML = "You found a match!";
      cards[optionOneId].setAttribute("src", "images/image7.jpg");
      cards[optionTwoId].setAttribute("src", "images/image7.jpg");
      cards[optionTwoId].removeEventListener("click", flipCard);
      cards[optionOneId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      isProcessing = false;
    } else {
      cards[optionOneId].setAttribute("src", cardBack);
      cards[optionTwoId].setAttribute("src", cardBack);
      p.innerHTML = "Sorry, try again!";
      isProcessing = false;
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = `Matches: ${cardsWon.length}`;
    if (cardsWon.length === cardArray.length / 2) {
      p.innerHTML = "Congrats! You found them all!";
      resultDisplay.textContent = "";
      isProcessing = false;
      if (cardArray2.length > 0) {
        levelUp();
      } else {
        alert("Congrats! You completed all the levels!");
        window.location.reload();
      }
    }
  }
  //flip your card
  function flipCard() {
    if (isProcessing) {
      return;
    } else {
      let cardId = this.getAttribute("data-id");
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute("src", cardArray[cardId].img);
      if (cardsChosen.length === 2) {
        isProcessing = true;
        setTimeout(checkForMatch, 750);
      }
    }
  }
  //Choose a card function
  let cardBack = "";
  function setBack1(event) {
    event.preventDefault();
    cardBack = "images/image16.png";
    function removeAllChildNodes(grid) {
      while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
    }
    removeAllChildNodes(grid);
    document.querySelector("p").innerHTML = "";
    createBoard();
  }
  function setBack2(event) {
    event.preventDefault();
    cardBack = "images/image17.png";
    function removeAllChildNodes(grid) {
      while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
    }
    removeAllChildNodes(grid);
    document.querySelector("p").innerHTML = "";
    createBoard();
  }
  function setBack3(event) {
    event.preventDefault();
    cardBack = "images/image15.jpg";
    function removeAllChildNodes(grid) {
      while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
      }
    }
    removeAllChildNodes(grid);
    document.querySelector("p").innerHTML = "";
    createBoard();
  }
  document.querySelector("p").innerHTML = "Choose a deck";
  let cardBack1 = document.createElement("img");
  let cardBack2 = document.createElement("img");
  let cardBack3 = document.createElement("img");

  cardBack1.setAttribute("src", "images/image16.png");
  cardBack2.setAttribute("src", "images/image17.png");
  cardBack3.setAttribute("src", "images/image15.jpg");

  cardBack1.addEventListener("click", setBack1);
  cardBack2.addEventListener("click", setBack2);
  cardBack3.addEventListener("click", setBack3);

  grid.appendChild(cardBack1);
  grid.appendChild(cardBack2);
  grid.appendChild(cardBack3);

  //createBoard();
});
alert(
  "Welcome to Mal's Memory Game of Matches:\n\nThere are seven levels to complete.\n\nEvery time you level up, a card will be added to the game!\n\nSee if you can beat the timer to complete all seven levels!\n\nHave fun!"
);
