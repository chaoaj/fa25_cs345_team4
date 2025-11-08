class HealthSystem {

    constructor(healthBar, heart3, heart2, heart1, heart0 ) {
        this.maxHearts = 3;
        this.currHearts = 3;
        this.maxHealth = 100;
        this.currHealth = 100;

        this.healthBar = healthBar;
        this.heart3 = heart3;
        this.heart2 = heart2;
        this.heart1 = heart1;
        this.heart0 = heart0;

        this.healthFrames = 5;
        this.healthFrameWidth = this.healthBar.width / this.healthFrames;
        this.healthFrameHeight = this.healthBar.height;

    }

    display() {
        let img;
        if (this.currHearts === 3) {
            img = this.heart3;
        } else if (this.currHearts === 2) {
            img = this.heart2;
        } else if (this.currHearts === 1) {
            img = this.heart1;
        } else {
            img = this.heart0;
        }

        image(img, 20, 20);

        let status = this.currHealth / this.maxHealth;
        let frame;

        if (status > 0.75) {
            frame = 0;
        } else if (status > 0.50) {
            frame = 1;
        } else if (status > 0.25) {
            frame = 2;
        } else if (status > 0) {
            frame = 3;
        } else {
            frame = 4;
        }

        Image(this.healthBar, 20, 70, this.healthFrameWidth, this.healthFrameHeight, frame * this.healthFrameWidth, 0, this.healthFrameWidth, this.healthFrameHeight);
    }

    starshipDamage() {
        this.currHealth -= 25;
        if (this.currHealth <= 0) {
            this.currHearts -= 1;
            this.currHealth = this.maxHealth;
        }

        if (this.isDead()) {
            this.restart();
        }
    }

    dogDamage() {
        this.currHearts -= 1;
    }

    isDead() {
        return this.currHearts <= 0;
    }

    restart() {
        this.currHearts = 3;
        this.currHealth = 100;
        loadLevel(currentLevel);
    }
 }
