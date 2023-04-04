import data from "../data/data.json";
const AutoCompleter = require("word-search-helper");

export function extractParkName() {
  let titleOfParks = [];

  data.forEach((park) => {
    if (park.title) titleOfParks.push(park.title);
  });
  return titleOfParks;
}

let myTree = new AutoCompleter();

export function createWordsTree() {
  const titleOfParks = extractParkName();
  titleOfParks.forEach((word) => myTree.insert(word));
}

export function searchPark(park) {
  const listOfParks = myTree.autoComplete(park);
  return listOfParks;
}
