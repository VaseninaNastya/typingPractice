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
    console.log("lastLetterIndex", this.lastLetterIndex);
    this.lettersNodes = document.querySelectorAll(".letter");
    console.log(
      "Array.from(this.lettersNodes)",
      Array.from(this.lettersNodes)[this.curLetterIndex]
    );
    Array.from(this.lettersNodes)[this.curLetterIndex].classList.add(
      "letter__active"
    );
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
      if (this.curLetter != this.lastLetterIndex && !e.key.includes("Shift")) {
        if (document.querySelector(".letter__active").innerHTML == e.key){
          console.log("работает", this.curLetterIndex);
          this.curLetterIndex++;
          console.log("работает   111", this.curLetterIndex);
          document
            .querySelector(".letter__active")
            .classList.remove("letter__active");
          if(document.querySelector(".letter__error")){
            document.querySelector(".letter__error").classList.remove("letter__error")
          }
          Array.from(this.lettersNodes)[this.curLetterIndex].classList.add(
            "letter__active"
          );
        } else {
          Array.from(this.lettersNodes)[this.curLetterIndex].classList.add(
            "letter__error"
          );
        }
      }
      if (this.curLetter == this.lastLetterIndex){
        console.log("конец");
      }
    });
  }
}
export default TextContainer;
