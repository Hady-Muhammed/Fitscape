import cbum from "./assets/cbum.webp";
import arnold from "./assets/arnold.webp";
import frank from "./assets/frank-zane.webp";
import ruf from "./assets/ruf.webp";
import { Champion } from "./types/champion";

export const champions: Champion[] = [
  {
    _id: "1",
    title: "Arnold Schwarzenegger",
    name: "Arnold Schwarzenegger",
    description:
      "Schwarzenegger began lifting weights at the age of 15 and went on to win the Mr. Universe title at age 20 and subsequently won the Mr. Olympia title seven times. He is widely regarded as either the greatest[4] or one of the two greatest bodybuilders of all time along with Ronnie Coleman,[5] and has written many books and articles about bodybuilding.[6] The Arnold Sports Festival, considered the second-most important bodybuilding event after Mr. Olympia,",
    img: arnold,
  },
  {
    _id: "2",
    title: "Chris Bumstead",
    name: "Chris Bumstead",
    description:
      "Christopher Adam Bumstead, born February 2, 1995, is a Canadian IFBB professional bodybuilder. Bumstead is the reigning Mr. Olympia Classic Physique winner, having won the competition in 2019, 2020 and 2021. He was also the runner-up in 2017 and 2018. Often referred to by his nickname, CBum Bumstead maintains a large online presence with content focusing on his lifestyle and bodybuilding.[2][3]",
    img: cbum,
  },
  {
    _id: "3",
    name: "Frank Zane",
    title: "Frank Zane",
    description:
      "Frank Zane (born June 28, 1942[1]) is a retired American professional bodybuilder and author. He is a three-time Mr. Olympia, and his physique is considered one of the greatest in the history of bodybuilding due to his meticulous focus on symmetry and proportion.[4] He was inducted in the IFBB Hall of Fame in 1999.[1]",
    img: frank,
  },
  {
    _id: "4",
    name: "Terrence Ruffin",
    title: "Terrence Ruffin",
    description:
      "Terrence Ruffin is an IFBB Professional bodybuilder from Beatrice, Alabama (USA.) He was the youngest person to ever receive a Pro Card in 2014, winning the NCP Nationals at 21 years old.",
    img: ruf,
  },
];
