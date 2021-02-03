class Character {
  constructor(name, life, damage) {
    this.name = name;
    this.life = life;
    this.damage = damage;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setLife(life) {
    this.life = life;
  }

  getLife() {
    return this.life;
  }

  setDamage(damage) {
    this.damage = damage;
  }

  getDamage() {
    return this.damage;
  }
}

class Warrior extends Character {
  constructor(name, life, damage, stamina) {
    super(name, life, damage);
    this.stamina = stamina;
  }

  setStamina = (stamina) => {
    this.stamina = stamina;
  };

  getStamina = () => {
    return this.stamina;
  };

  action() {
    if (super.getName() === "Assasin") super.setDamage(40);
    return this.checkStamina();
  }

  checkStamina() {
    if (this.getStamina() > 0) {
      this.setStamina((this.stamina -= 10));
      return `${super.getName()} attacked! Now it's got ${this.getStamina()} points of stamina left.`;
    } else {
      super.setDamage(0);
      return `${super.getName()} hasn't got any points of stamina left... can't attack!`;
    }
  }

  checkDefenseBonus(damageReceived) {
    if (super.getName() === "Warrior") {
      super.setLife((this.life -= damageReceived - 10));
    } else {
      super.setLife((this.life -= damageReceived));
    }
  }

  receivesAttack(damageReceived) {
    this.checkDefenseBonus(damageReceived);
    if (super.getLife() > 0) {
      return `${super.getName()}'s got ${super.getLife()} life points left.`;
    } else {
      return `${super.getName()} is dead!`;
    }
  }
}

class Magician extends Character {
  constructor(name, life, damage, mana, healingPoints) {
    super(name, life, damage);
    this.mana = mana;
    this.healingPoints = healingPoints;
  }

  setMana(mana) {
    this.mana = mana;
  }

  getMana() {
    return this.mana;
  }

  setHealingPoints(healingPoints) {
    this.healingPoints = healingPoints;
  }

  getHealingPoints() {
    return this.healingPoints;
  }

  action() {
    let random = Math.random();
    if (random < 0.5) {
      return this.checkMana("attack");
    } else {
      return this.checkMana("heal");
    }
  }

  checkMana(choiceOfAction) {
    if (this.getMana() > 0) {
      this.setMana((this.mana -= 10));
      return choiceOfAction === "attack" ? this.attack() : this.heal();
    } else {
      super.setDamage(0);
      return `${super.getName()} hasn't got any points of mana left... can't attack!`;
    }
  }

  attack() {
    super.getName() === "Wizard" ? super.setDamage(30) : super.setDamage(10);

    return `${super.getName()} attacked! Now it's got ${
      this.mana
    } points of mana left.`;
  }

  heal() {
    const maxLife = 50;
    const healedLife = (this.life += this.healingPoints);

    healedLife > maxLife ? super.setLife(maxLife) : super.setLife(healedLife);
    super.setDamage(0);
    return `${super.getName()} has chosen to heal, now its life points are ${super.getLife()} and it's got ${this.getMana()} mana points left`;
  }

  receivesAttack(damageReceived) {
    super.setLife((this.life -= damageReceived));
    if (super.getLife() > 0) {
      return `${super.getName()}'s got ${super.getLife()} life points left.`;
    } else {
      return `${super.getName()} is dead!`;
    }
  }
}

const newSoldier = new Warrior("Soldier", 100, 20, 30);
const newAssasin = new Warrior("Assasin", 50, 30, 50);
const newWizard = new Magician("Wizard", 50, 30, 50, 10);
const newHealer = new Magician("Healer", 50, 10, 20, 30);

class Fight {
  generateFighters() {
    let randomIndexOne = Math.floor(Math.random() * 4);
    let randomIndexTwo = Math.floor(Math.random() * 3);

    let arrayOfFighters = [newSoldier, newAssasin, newWizard, newHealer];

    let firstFighter = arrayOfFighters.splice(randomIndexOne, 1);
    let secondFighter = arrayOfFighters[randomIndexTwo];

    let finalArrayOfFighters = [...firstFighter, secondFighter];

    return finalArrayOfFighters;
  }

  generateFight() {
    let fighters = this.generateFighters();

    const checkEnergyStream = (fighter) => {
      return fighter.stamina === undefined ? fighter.mana : fighter.stamina;
    };

    while (
      fighters[0].life > 0 &&
      checkEnergyStream(fighters[0]) >= 0 &&
      checkEnergyStream(fighters[1]) >= 0
    ) {
      console.log(fighters[0].action());
      console.log(fighters[1].receivesAttack(fighters[0].getDamage()));
      [fighters[0], fighters[1]] = [fighters[1], fighters[0]];
      if (
        checkEnergyStream(fighters[0]) >= 0 &&
        checkEnergyStream(fighters[1]) <= 0
      ) {
        return `Both fighters ran out of their energy stream, the fight is over!`;
      }
    }
    return `The fight is over!`;
  }
}

/* UNCOMMENT TO DISPLAY A RANDOM FIGHT

let newFight = new Fight();
console.log(newFight.generateFight());*/
