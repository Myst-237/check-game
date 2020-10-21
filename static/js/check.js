// check game object
const checkgame = {
    players:{
        player1:{
            score:0,
            numberofcards:0,
            div:"#player-1",
        },
        player2:{
            score:0,
            numberofcards:0,
            div:"#player-2",
        },
        play: function(){

        },
        finish: function(){

        }
    },
    gamescore:{

    },
    messages:{

    },
    'deck':["AH","AC","AD","AS","2H","2C","2D","2S","3H","3C","3D","3S","4H","4C","4D","4S","5H","5C","5D","5S",
            "6H","6C","6D","6S","7H","7C","7D","7S","8H","8C","8D","8S","9H","9C","9D","9S","10H","10C","10D","10S",
            "JH","JC","JD","JS","QH","QC","QD","QS","KH","KC","KD","KS","RJ","BJ"],
    cardtable:{
        deal_to: function(){

        },
        shuffle: function(){

        },
        tap_to: function(){

        }
    }
}

const player1 = checkgame.players.player1
const player2 = checkgame.players.player2
var  playing_deck = checkgame.deck
document.querySelector('#start-btn').addEventListener('click', start)

function start(){
    fill_deal_board();
    deal_init();
}

function fill_deal_board(){
    let deck = document.createElement('img');
    deck.src = 'static/images/cards/red_back.png';
    document.getElementById('dealboard-deck').appendChild(deck);
    document.getElementById('dealbaord-card').innerHTML = 54;
}
function deal_init(){
    let i=1;
    let activeplayer = player1;
    while(i<7){
        let card = randomcard();
        showcard_init(card, activeplayer, i.toString());
        if(i==6 && activeplayer==player1){
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
        document.querySelector(activeplayer.div).appendChild(cardImage);
}

function randomcard(){
    let randomindex = Math.floor(Math.random() * 52);
    return checkgame['deck'][randomindex];
}

