export type CardSuit = "♥" | "♦" | "♣" | "♠";

export type CardSymbol =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const cardValueList: CardSymbol[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const suits = {
  hearts: "♥" as CardSuit,
  diamonds: "♦" as CardSuit,
  clubs: "♣" as CardSuit,
  spades: "♠" as CardSuit,
};

export interface Card {
  suit: CardSuit;
  cardSymbol: CardSymbol;
  cardValue: CardValue;
}

export interface SuitSymbolCounter {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  J: number;
  Q: number;
  K: number;
}

export interface HeartsCard extends Card {
  suit: "♥";
}

export interface DiamondsCard extends Card {
  suit: "♦";
}

export interface ClubsCard extends Card {
  suit: "♣";
}

export interface SpadesCard extends Card {
  suit: "♠";
}

export class CardRecorder {
  private heartsCardSet: HeartsCard[] = [];
  private diamondsCardSet: DiamondsCard[] = [];
  private clubsCardSet: ClubsCard[] = [];
  private spadesCardSet: SpadesCard[] = [];

  constructor(numberOfDesk: number) {
    this.init(numberOfDesk);
  }

  private init(numberOfDesk: number) {
    for (let i = 0; i < numberOfDesk; i++) {
      cardValueList.forEach((value) => {
        // let said "A" equal to 1, "J" equal to 10, "Q" equal to 10, "K" equal to 10
        const cardValue =
          value === "J" || value === "Q" || value === "K"
            ? 10
            : (parseInt(value) as CardValue);
        this.insertCard({
          suit: suits.hearts,
          cardSymbol: value,
          cardValue,
        });
        this.insertCard({
          suit: suits.diamonds,
          cardSymbol: value,
          cardValue,
        });
        this.insertCard({
          suit: suits.clubs,
          cardSymbol: value,
          cardValue,
        });
        this.insertCard({
          suit: suits.spades,
          cardSymbol: value,
          cardValue,
        });
      });
    }
  }

  public insertCard(card: Card) {
    switch (card.suit) {
      case suits.hearts:
        this.heartsCardSet.push(card as HeartsCard);
        break;
      case suits.diamonds:
        this.diamondsCardSet.push(card as DiamondsCard);
        break;
      case suits.clubs:
        this.clubsCardSet.push(card as ClubsCard);
        break;
      case suits.spades:
        this.spadesCardSet.push(card as SpadesCard);
        break;
    }
  }

  // remove all the cards with the same suit and symbol
  public removeCard(card: Card) {
    switch (card.suit) {
      case suits.hearts:
        this.heartsCardSet = this.heartsCardSet.filter(
          (c) => c.cardSymbol !== card.cardSymbol,
        );
        break;
      case suits.diamonds:
        this.diamondsCardSet = this.diamondsCardSet.filter(
          (c) => c.cardSymbol !== card.cardSymbol,
        );
        break;
      case suits.clubs:
        this.clubsCardSet = this.clubsCardSet.filter(
          (c) => c.cardSymbol !== card.cardSymbol,
        );
        break;
      case suits.spades:
        this.spadesCardSet = this.spadesCardSet.filter(
          (c) => c.cardSymbol !== card.cardSymbol,
        );
        break;
    }
  }

  // only remove one card with the same suit and symbol
  public deleteCard(card: Card) {
    switch (card.suit) {
      case suits.hearts:
        // find the first card with the same suit and symbol
        const index1 = this.heartsCardSet.findIndex(
          (c) => c.cardSymbol === card.cardSymbol,
        );
        if (index1 === -1) {
          return;
        }
        // remove the card
        this.heartsCardSet.splice(index1, 1);
        break;
      case suits.diamonds:
        const index2 = this.diamondsCardSet.findIndex(
          (c) => c.cardSymbol === card.cardSymbol,
        );
        if (index2 === -1) {
          return;
        }
        this.diamondsCardSet.splice(index2, 1);
        break;
      case suits.clubs:
        const index3 = this.clubsCardSet.findIndex(
          (c) => c.cardSymbol === card.cardSymbol,
        );
        if (index3 === -1) {
          return;
        }
        this.clubsCardSet.splice(index3, 1);
        break;
      case suits.spades:
        const index4 = this.spadesCardSet.findIndex(
          (c) => c.cardSymbol === card.cardSymbol,
        );
        if (index4 === -1) {
          return;
        }
        this.spadesCardSet.splice(index4, 1);
        break;
    }
  }

  public getHeartsCardSet(): HeartsCard[] {
    return this.heartsCardSet;
  }

  public getDiamondsCardSet(): DiamondsCard[] {
    return this.diamondsCardSet;
  }

  public getClubsCardSet(): ClubsCard[] {
    return this.clubsCardSet;
  }

  public getSpadesCardSet(): SpadesCard[] {
    return this.spadesCardSet;
  }

  public getCardSet(): Card[] {
    return [
      ...this.heartsCardSet,
      ...this.diamondsCardSet,
      ...this.clubsCardSet,
      ...this.spadesCardSet,
    ];
  }

  public getCardSetLength(): number {
    return this.getCardSet().length;
  }

  public getSuitCounter(suit: CardSuit): SuitSymbolCounter {
    const suitCounter: SuitSymbolCounter = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      J: 0,
      Q: 0,
      K: 0,
    };
    this.getCardSet().forEach((card) => {
      if (card.suit === suit) {
        suitCounter[card.cardSymbol] += 1;
      }
    });
    return suitCounter;
  }

  public getTotalSuitCounter(): SuitSymbolCounter {
    const suitCounter: SuitSymbolCounter = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      J: 0,
      Q: 0,
      K: 0,
    };
    this.getCardSet().forEach((card) => {
      suitCounter[card.cardSymbol] += 1;
    });
    return suitCounter;
  }

  public symbolToValue(symbol: CardSymbol): CardValue {
    return symbol === "J" || symbol === "Q" || symbol === "K"
      ? 10
      : (parseInt(symbol) as CardValue);
  }

  public getNumberOfCardinDeck(card: Card): number {
    return this.getCardSet().filter(
      (c) => c.suit === card.suit && c.cardSymbol === card.cardSymbol,
    ).length;
  }

  public getProbabilityOfOccurrence(card: Card): number {
    // if the card is not in the card set, return 0
    if (
      !this.getCardSet().find(
        (c) => c.suit === card.suit && c.cardSymbol === card.cardSymbol,
      )
    ) {
      return 0;
    }
    // if the card is in the card set, return the probability of occurrence
    return (
      this.getCardSet().filter(
        (c) => c.suit === card.suit && c.cardSymbol === card.cardSymbol,
      ).length / this.getCardSetLength()
    );
  }

  public getProbabilityOfOccurrenceOfSuit(suit: "♥" | "♦" | "♣" | "♠"): number {
    // if the suit is not in the card set, return 0
    if (!this.getCardSet().find((c) => c.suit === suit)) {
      return 0;
    }
    // if the suit is in the card set, return the probability of occurrence
    return (
      this.getCardSet().filter((c) => c.suit === suit).length /
      this.getCardSetLength()
    );
  }

  public getProbabilityOfOccurrenceOfSymbol(symbol: CardSymbol): number {
    // if the symbol is not in the card set, return 0
    if (!this.getCardSet().find((c) => c.cardSymbol === symbol)) {
      return 0;
    }
    // if the symbol is in the card set, return the probability of occurrence
    return (
      this.getCardSet().filter((c) => c.cardSymbol === symbol).length /
      this.getCardSetLength()
    );
  }

  public getProbabilityOfOccurrenceOfPoint(point: CardValue): number {
    // if the point is not in the card set, return 0
    if (!this.getCardSet().find((c) => c.cardValue === point)) {
      return 0;
    }
    // if the point is in the card set, return the probability of occurrence
    return (
      this.getCardSet().filter((c) => c.cardValue === point).length /
      this.getCardSetLength()
    );
  }
}
