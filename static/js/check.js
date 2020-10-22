// check game object
const checkgame = {
    players:{ player1:{
            name:'player1',       
            score:0,
            numberofcards:0,
            div:"#player-1", 
            numberofcards:0,},
        player2:{
            name:'player2',    
            score:0,
            numberofcards:0,
            div:"#player-2",
            numberofcards:0}
        },
    'deck':["AH","AC","AD","AS","2H","2C","2D","2S","3H","3C","3D","3S","4H","4C","4D","4S","5H","5C","5D","5S",
            "6H","6C","6D","6S","7H","7C","7D","7S","8H","8C","8D","8S","9H","9C","9D","9S","10H","10C","10D","10S",
            "JH","JC","JD","JS","QH","QC","QD","QS","KH","KC","KD","KS","RJ","BJ"],
}

const player1 = checkgame.players.player1;
const player2 = checkgame.players.player2;
var  playing_deck = checkgame.deck;
var session_deck = [];
document.querySelector('#start-btn').addEventListener('click', start)

function start(){
    deal_init();
    fill_dealboard();
    player_num_of_cards(player1);
    player_num_of_cards(player2);
    document.getElementById('start-btn').style.display = "none"
}

function fill_dealboard(){
    let deck = document.createElement('img');
    deck.src = 'static/images/cards/red_back.png';
    document.getElementById('dealboard-deck').appendChild(deck);
    document.getElementById('dealbaord-card').innerHTML = playing_deck.length;
}
function deal_init(){
    let i=1;
    let activeplayer = player1;
    while(i<6){
        let card = randomcard();
        showcard_init(card, activeplayer, i.toString());
        remove_card_from_dealboard(card);
        if(i==5 && activeplayer==player1){
           i=0;
            activeplayer = player2;
        }
        i=i+1;
    }
}

function showcard_init(card, activeplayer, j){
    let cardImage = document.createElement('img');
        cardImage.src = `static/images/cards/${card}.png`;
        cardImage.className = `card-${j}`;
        cardImage.id = activeplayer.name + '-card'
        document.querySelector(activeplayer.div).appendChild(cardImage);
}

function randomcard(){
    let randomindex = Math.floor(Math.random() * playing_deck.length);
    return playing_deck[randomindex];
}

function remove_card_from_dealboard(card){
    let clone = [];
    for(item of playing_deck){
        if(item != card){
            clone.push(item);
        }
    }
    session_deck.push(card);
    playing_deck = clone;
}

function player_num_of_cards(player){
    let numberofcards = document.querySelectorAll('#' + player.name + '-card');
    document.querySelector(player.div + '-cardnum').innerHTML = numberofcards.length;
}

function disable_start_button(){
    document.getElementById('start-btn').style.cursor = "not-allowed"
    document.getElementById('start-btn').style.opacity = "0.5"
}
