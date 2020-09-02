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
      img: "images/image8.png",
    },
    {
      name: "fox",
      img: "images/image8.png",
    },
    {
      name: "bunny",
      img: "images/image9.png",
    },
    {
      name: "bunny",
      img: "images/image9.png",
    },
    {
      name: "panda",
      img: "images/image10.png",
    },
    {
      name: "panda",
      img: "images/image10.png",
    },
    {
      name: "owl",
      img: "image/image11.jpb",
    },
    {
      name: "owl",
      img: "image/image11.jpb",
    },
    {
      name: "articFox",
      img: "image/image12.jpb",
    },
    {
      name: "articFox",
      img: "image/image12.jpb",
    },
    {
      name: "zebra",
      img: "image/image13.jpb",
    },
    {
      name: "zebra",
      img: "image/image13.jpb",
    },
  ];
  let level = 1;
  let sec = 30;
  //create the board
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector(".result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timer;
  function createBoard() {
    clearInterval(timer);
    sec;
    timer = setInterval(function () {
      document.querySelector(".timer").innerHTML = sec + " secs";
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
    document.querySelector(".level").innerHTML = level;
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/image0.jpg");
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
      cards[optionOneId].setAttribute("src", "images/image0.jpg");
      cards[optionTwoId].setAttribute("src", "images/image0.jpg");
      p.innerHTML = "You chose the same card!";
    } else if (cardsChosen[0] === cardsChosen[1]) {
      p.innerHTML = "You found a match!";
      cards[optionOneId].setAttribute("src", "images/image7.png");
      cards[optionTwoId].setAttribute("src", "images/image7.png");
      cards[optionTwoId].removeEventListener("click", flipCard);
      cards[optionOneId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "images/image0.jpg");
      cards[optionTwoId].setAttribute("src", "images/image0.jpg");
      p.innerHTML = "Sorry, try again!";
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      p.innerHTML = "Congrats! You found them all!";
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
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  createBoard();
});
alert(
  "Welcome to Mal's Memory Game of Matches:\n\nThere are seven levels to complete.\n\nEvery time you level up, a card will be added to the game!\n\nSee if you can beat the timer to complete all seven levels!\n\nHave fun!"
);
