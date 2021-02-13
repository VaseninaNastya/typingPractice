import create from "../../utils/create.utils.js";
import s from "./TextContainer.module.scss";
import TextAPI from "./../TextAPI/TextAPI";
import InfoBlock from "../InfoBlock/InfoBlock";

class TextContainer {
  async getData() {
    const textAPI = new TextAPI();
    this.textData = await textAPI.text();
    this.generateText();
  }
  generateText() {
    this.textDataArr = this.textData
      .join(" ")
      .split("")
      .map((item) => {
        document
          .querySelector(".text_container")
          .append(create("span", "letter", item));
      });
    this.generateTextObserver();
    // document.querySelector(".letter").classList.add("letter__active")
  }
  generateTextObserver() {
    this.curLetterIndex = 0;
    this.lastLetterIndex = this.textDataArr.length - 1;
    console.log("lastLetterIndex", lastLetterIndex);
    console.log(
      "document.querySelectorAll",
      document.querySelectorAll(".letter")
    );
    this.lettersNodes = document.querySelectorAll(".letter");
    this.lettersNodes[this.curLetter].classList.add("letter__active");
  }
  generateLayout() {
    const infoBlock = new InfoBlock();
    const mainContent_container = create("div", s.mainContent_container, [
      create("div", s.text_container),
      infoBlock.generateLayout(),
    ]);
    this.addEventListeners();
    return mainContent_container;
  }
  addEventListeners() {
    document.querySelector("body").addEventListener("keydown", (e) => {
      if (document.querySelector(".letter__active").innerHTML == e.key) {
        console.log("работает");
        if (this.curLetter != this.lastLetterIndex) {
          this.curLetter++;
        } else {console.log("конец");}
      }
    });
  }
}
export default TextContainer;
