//jshint esversion:6

// check game object


const checkgame = {
    players:{ player1:{
            name:'player1',
            score:0,
            numberofcards:0,
            div:"#player-1",
            cards:[]},
        player2:{
            name:'player2',
            score:0,
            numberofcards:0,
            div:"#player-2",
            cards:[]}
        },
    deck:["AH","AC","AD","AS","2H","2C","2D","2S","3H","3C","3D","3S","4H","4C","4D","4S","5H","5C","5D","5S",
            "6H","6C","6D","6S","7H","7C","7D","7S","8H","8C","8D","8S","9H","9C","9D","9S","10H","10C","10D","10S",
            "JH","JC","JD","JS","QH","QC","QD","QS","KH","KC","KD","KS","RJ","BJ"],
};

// game session play
/*
 -player1 is the first player
 -player2 is the second player
 -playing_deck is the deck that the game starts with
 -session deck is an array of all the cards that have been dealt out of the playing deck
*/
const player1 = checkgame.players.player1;
const player2 = checkgame.players.player2;
var  playing_deck = checkgame.deck;
var session_deck = [];
document.querySelector('#start-btn').addEventListener('click', start);

// start function
/*
 contains all the start function properties
*/
function start(){
    deal_to(player1,10);
    deal_to(player2,10);
    fill_dealboard();
    display_player_num_of_cards(player1);
    display_player_num_of_cards(player2);
    document.getElementById('start-btn').style.display = "none";
}

//function to allow a player to play a cardDetail
function play(){

}
// fill the deal board function
/*
 this function fills the deal board after a shuffle, or start of a new game
*/
function fill_dealboard(){
    let deck = document.createElement('img');
    deck.src = 'static/images/cards/red_back.png';
    document.getElementById('dealboard-deck').appendChild(deck);
    document.getElementById('dealbaord-card').innerHTML = playing_deck.length;
}

// deal n cards to a particular player
function deal_to(player, numberofcards){
    for(let i=1; i<=numberofcards; i++){
        let card = randomcard();
        numberofcardsNow = player.cards.length;
        showcard_to_player(card, player, numberofcardsNow+1);
        player.cards.push(card);
        remove_card_from_dealboard(card);
    }
}

// display cards to player board
// the function takes in a the card to show, the player to display it to and the position of the card in his stack
function showcard_to_player(card, player, j){
    let cardImage = document.createElement('img');
        cardImage.src = `static/images/cards/${card}.png`;
        cardImage.className = `card-${j}`;
        cardImage.setAttribute("name",card);
        cardImage.classList.add(player.name + '-card');
        const source = `static/images/cards/${card}.png`;
        document.querySelector(player.div).appendChild(cardImage);
        $(cardImage).click(move_card_to_board);
}

// select a random card from the board
function randomcard(){
    let randomindex = Math.floor(Math.random() * playing_deck.length);
    return playing_deck[randomindex];
}

// remove a card from the dealboard
function remove_card_from_dealboard(card){
    let clone = [];
    for(let item of playing_deck){
        if(item != card){
            clone.push(item);
        }
    }
    session_deck.push(card);
    playing_deck = clone;
}

// count player cards
function display_player_num_of_cards(player){
    document.querySelector(player.div + '-cardnum').innerHTML = player.cards.length;
}

//used to move a playercard to baord
function move_card_to_board(card){
  document.querySelector('.board-card').src = card.target.src;
  let name = card.target.name;
  var cardsLeft;
  if (card.target.parentNode.id === "player-1") {
    let section = document.querySelector("#player-1");
    cardsLeft = player1.cards.filter(cardName => !cardName.includes(name));
    player1.cards = cardsLeft;
    section.innerHTML = "";
    displayCards(player1, section);
    display_player_num_of_cards(player1);
   }
  else if (card.target.parentNode.id === "player-2") {
    let section = document.querySelector("#player-2");
    cardsLeft = player2.cards.filter(cardName => !cardName.includes(name));
    player2.cards = cardsLeft;
    section.innerHTML = "";
    displayCards(player2, section);
    display_player_num_of_cards(player2);
    }
}

//display cards to player
function displayCards (player, section) {
  player.cards.map((card, index) => {
    var img = document.createElement("img");
    var className = "card-" + (index + 1);
    img.src = `static/images/cards/${card}.png`;
    img.setAttribute("name",card);
    img.classList.add(player.name + '-card');
    img.setAttribute("class",className);
    $(img).click(move_card_to_board);
    section.appendChild(img);
  });
}
