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

        this.invincible = false;
        this.invinciblityTimer = 0;
        this.dogDamageCooldown = 0;

    }

    update() {
        if (this.invincible) {
            this.invinciblityTimer--;
            if (this.invinciblityTimer <= 0) {
            this.invincible = false;
        }
    }
        if (this.currHearts <= 0) {
            this.restart();
            menuID = 2;
            inMenu = true;
        }
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

        let heartX = 20;
        let heartY = 20
        image(img, heartX, heartY);

        let healthX = heartX + img.width + 10;
        let healthY = heartY + (img.height / 2 - this.healthFrameHeight / 2);

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

        image(this.healthBar, healthX, healthY, this.healthFrameWidth, this.healthFrameHeight, frame * this.healthFrameWidth, 0, this.healthFrameWidth, this.healthFrameHeight);
    }

    starshipDamage() {
        this.currHealth -= 25;
        if (this.currHealth <= 0) {
            this.currHearts -= 1;
            this.currHealth = this.maxHealth;
        }

        if (this.isDead()) {
            menuID = 2;
            inMenu = true;
        }
    }

    dogDamage() {
        if (this.dogDamageCooldown <= 0) {
            this.currHearts -= 1;
            this.dogDamageCooldown = 60;
            this.invincible = true;
            this.invinciblityTimer = 60;
        }
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
