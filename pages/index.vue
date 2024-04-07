<template>
  <v-container class="w-100 md:w-75 justify-center align-center">
    <v-row>
      <v-col>
        <v-text-field
          label="card number"
          v-model="numberOfDecks"
          @update:modelValue="handleChangeDecks"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-for="(counter, suit) in suitCount" no-gutters>
      <v-col v-for="(numberOfCard, symbol) in counter">
        <v-card variant="outlined">
          <v-card-item
            :style="isRedCard(suit) ? 'color : red' : 'color : black'"
          >
            <h2>{{ suit }} {{ symbol }}</h2>
            <h3>{{ numberOfCard }}</h3>
            <h4>{{ getProbability(suit, symbol) }}</h4>
            <v-row>
              <v-col>
                <v-btn
                  variant="outlined"
                  size="small"
                  @click="
                    handleInsertCard({
                      suit,
                      cardSymbol: symbol,
                      cardValue: cardRecorder.symbolToValue(symbol),
                    })
                  "
                >
                  +
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  variant="outlined"
                  size="small"
                  @click="
                    handleDeleteCard({
                      suit,
                      cardSymbol: symbol,
                      cardValue: cardRecorder.symbolToValue(symbol),
                    })
                  "
                >
                  -
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col class="total-suit">
        <v-card variant="outlined" class="h-100">
          <v-card-item style="color: blue">
            <h2>{{ suit }} T</h2>
            <h3>{{ Object.values(counter).reduce((a, b) => a + b, 0) }}</h3>
            <h4>{{ getTotalSuitProbability(suit) }}</h4>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="total-point" v-for="(counter, suit) in totalCount" no-gutters>
      <v-col v-for="(numberOfCard, symbol) in counter">
        <v-card variant="outlined" class="h-100">
          <v-card-item style="color: blue">
            <h2>{{ suit }} {{ symbol }}</h2>
            <h3>{{ numberOfCard }}</h3>
            <h4>
              {{ getTotalSymbolProbability(symbol) }}
            </h4>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col class="total-suit">
        <v-card variant="outlined" class="h-100">
          <v-card-item style="color: blue">
            <h2>{{ suit }} T</h2>
            <h3>{{ Object.values(counter).reduce((a, b) => a + b, 0) }}</h3>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {
  CardRecorder,
  suits,
  type Card,
  type CardSuit,
  type CardSymbol,
  type CardValue,
} from "../composables/CardRecorder";
import { ref } from "vue";
const numberOfDecks = ref(1);

let cardRecorder = new CardRecorder(numberOfDecks.value);

const heartCardSet = cardRecorder.getHeartsCardSet();
const spadeCardSet = cardRecorder.getSpadesCardSet();
const diamondCardSet = cardRecorder.getDiamondsCardSet();
const clubCardSet = cardRecorder.getClubsCardSet();

const cardSet = [heartCardSet, spadeCardSet, diamondCardSet, clubCardSet];

const heartSuitCount = cardRecorder.getSuitCounter(suits.hearts);
const spadeSuitCount = cardRecorder.getSuitCounter(suits.spades);
const diamondSuitCount = cardRecorder.getSuitCounter(suits.diamonds);
const clubSuitCount = cardRecorder.getSuitCounter(suits.clubs);

const totalCount = ref({
  T: cardRecorder.getTotalSuitCounter(),
});

const suitCount = ref({
  "♥": heartSuitCount,
  "♣": diamondSuitCount,
  "♦": spadeSuitCount,
  "♠": clubSuitCount,
});

function getProbability(suit: string, symbol: string) {
  const card: Card = {
    suit: suit as CardSuit,
    cardSymbol: symbol as CardSymbol,
    cardValue: cardRecorder.symbolToValue(symbol as CardSymbol),
  };
  const probability = cardRecorder.getProbabilityOfOccurrence(card);
  // round off to 2dp
  return (Number(probability.toFixed(4)) * 100).toFixed(2);
}

function isRedCard(suit: CardSuit) {
  return suit === suits.hearts || suit === suits.diamonds;
}

function updateSuitCount() {
  suitCount.value = {
    "♥": cardRecorder.getSuitCounter(suits.hearts),
    "♣": cardRecorder.getSuitCounter(suits.clubs),
    "♦": cardRecorder.getSuitCounter(suits.diamonds),
    "♠": cardRecorder.getSuitCounter(suits.spades),
  };
  totalCount.value = {
    T: cardRecorder.getTotalSuitCounter(),
  };
}

function handleInsertCard(card: Card) {
  cardRecorder.insertCard(card);
  updateSuitCount();
}

function handleDeleteCard(card: Card) {
  cardRecorder.deleteCard(card);
  updateSuitCount();
}

function handleChangeDecks() {
  cardRecorder = new CardRecorder(numberOfDecks.value);
  updateSuitCount();
}

function getTotalSuitProbability(suit: CardSuit) {
  const probability = cardRecorder.getProbabilityOfOccurrenceOfSuit(suit);
  return (Number(probability.toFixed(4)) * 100).toFixed(2);
}

function getTotalSymbolProbability(symbol: CardSymbol) {
  const probability = cardRecorder.getProbabilityOfOccurrenceOfSymbol(symbol);
  return (Number(probability.toFixed(4)) * 100).toFixed(2);
}
</script>
