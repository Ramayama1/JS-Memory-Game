document.addEventListener("DOMContentLoaded", () => {
  //card options
  const cardArray = [
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
  //create the board
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector(".result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/image0.jpg");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
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
