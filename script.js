// Memory Game

// Cards

let app = new Vue({
    el: '#app',
    data: {

        cards: [
            {
                name: 'Lego 1',
                img: 'img/l1.jpg',

            },
            {
                name: 'Lego 2',
                img: 'img/l2.jpg',

            },
            {
                name: 'Lego 3',
                img: 'img/l3.jpg',

            },
            {
                name: 'Lego 4',
                img: 'img/l4.jpg',

            },
            {
                name: 'Lego 5',
                img: 'img/l5.jpg',

            },
            {
                name: 'Lego 6',
                img: 'img/l6.jpg',

            },
        ],

        memoryCards: [],

        flippedCards: [],

        finish: false,

        start: false,
        turns: 0,
        timer: {
            minutes: 0,
            seconds: 0,
        },
        
    },

    created() {

        this.cards.forEach((card) => {
            Vue.set(card, 'isFlipped', false)
        });

        this.memoryCards = _.shuffle(this.memoryCards.concat(_.cloneDeep(this.cards), _.cloneDeep(this.cards)));

        this.cards.forEach((card) => {
            Vue.set(card, 'isFlipped', false);
            Vue.set(card, 'isMatched', false);
        });
    },

    methods: {

        flipCard(card) {

            if (card.isMatched || card.isFlipped || this.flippedCards.length === 2)
                return;

            if (!this.start) {
                this._startGame();
            }

            card.isFlipped = true;

            if (this.flippedCards.length < 2)
                this.flippedCards.push(card);
            if (this.flippedCards.length === 2)
                this._match(card);
        },



        _match(card) {
            if (this.flippedCards[0].name === this.flippedCards[1].name) {
                setTimeout(() => {
                    this.flippedCards.forEach(card => card.isMatched = true);
                    this.flippedCards = [];

                    //All cards matched ?
                    if (this.memoryCards.every(card => card.isMatched === true)) {
                        clearInterval(this.interval);
                        this.finish = true;
                    }

                }, 400);
            }
            else {
                setTimeout(() => {
                    this.flippedCards.forEach((card) => { card.isFlipped = false });
                    this.flippedCards = [];
                }, 800);
            }

            this.turns++;
        },

        reset() {
            clearInterval(this.interval);

            this.cards.forEach((card) => {
                Vue.set(card, 'isFlipped', false);
                Vue.set(card, 'isMatched', false);
            });

            setTimeout(() => {
                this.memoryCards = [];
                this.memoryCards = _.shuffle(this.memoryCards.concat(_.cloneDeep(this.cards), _.cloneDeep(this.cards)));
                this.timer.minutes = 0;
                this.timer.seconds = 0;
                this.start = false;
                this.finish = false;
                this.turns = 0;
                this.flippedCards = [];

            }, 600);

        },

        _startGame() {
            this._tick();
            this.interval = setInterval(this._tick, 1000);
            this.start = true;
        },

        _tick() {
            if (this.timer.seconds !== 59) {
                this.timer.seconds++;
                return
            }

            this.timer.minutes++;
            this.timer.seconds = 0;
        },

    },

    computed: {
        sec() {
            if (this.timer.seconds < 10) {
                return '0' + this.timer.seconds;
            }
            return this.timer.seconds;
        },
        min() {
            if (this.timer.minutes < 10) {
                return '0' + this.timer.minutes;
            }
            return this.timer.minutes;
        }
    },

    

});



