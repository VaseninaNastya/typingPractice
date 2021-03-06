import create from "../../utils/create.utils.js";
import s from "./TextContainer.module.scss";
import TextAPI from "./../TextAPI/TextAPI";
import InfoBlock from "../InfoBlock/InfoBlock";

class TextContainer {
  constructor() {
    this.curLetterIndex = 0;
    this.int = 0;
    this.timer = 0;
    this.errorLetterPressrdCounter = 0;
    this.sounds = true;
  }
  async getData() {
    const textAPI = new TextAPI();
    this.textData =   await textAPI.text();
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
  }
  generateTextObserver() {
    this.curLetterIndex = 0;
    this.lastLetterIndex = this.textDataArr.length - 1;
    this.lettersNodes = document.querySelectorAll(".letter");
    Array.from(this.lettersNodes)[this.curLetterIndex].classList.add(
      "letter__active"
    );
  }
  generateLayout() {
    if (this.int) this.stopTimer();
    const infoBlock = new InfoBlock();
    const mainContent_container = create("div", s.mainContent_container, [
      create("div", s.text_container),
      infoBlock.generateLayout(),
    ]);  
    document.querySelector("body").append(this.createSounds());
    this.addEventListeners();
    return mainContent_container;
  }
  refresherrorsCounter() {
    document.querySelector(".errorsCounter").innerHTML = `${
      Math.round(
        (100 - (this.errorLetterPressrdCounter * 100) / this.lastLetterIndex) *
          10
      ) / 10
    }%`;
  }
  getTimer() {
    document.querySelector(".timer").innerHTML = `${Math.round(
      (this.curLetterIndex * 60) / this.timer
    )} зн./мин`;
  }
  startTimer() {
    this.int = setInterval(() => {
      this.timer++;
      this.getTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.int);
    this.timer = 0;
  }
  createSounds() {
    const fragment = document.createDocumentFragment();
    const soundPath = "audio/";
    const sounds = [
      { file: "errorLetter.wav", name: "errorLetter" }, { file: "okLetter.wav", name: "okLetter" },
      { file: "win.wav", name: "win" }]
    sounds.forEach((item) => {
      create("audio", null, null, fragment, ["src", soundPath + item.file] , ["data-key", item.name ])
    })
    return fragment;
  }
  playSound(name) {
    if (!this.sounds) return;
    const audio = document.querySelector(`audio[data-key="${name}"]`);
    audio.currentTime = 0;
    audio.play();
  }
  addEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (!this.int) this.startTimer();
      if (
        this.curLetterIndex < this.lastLetterIndex &&
        !e.key.includes("Shift")
      ) {
        if (document.querySelector(".letter__active").innerHTML == e.key) {
          this.playSound("okLetter")
          this.curLetterIndex++;
          document
            .querySelector(".letter__active")
            .classList.remove("letter__active");
          if (document.querySelector(".letter__error")) {
            document
              .querySelector(".letter__error")
              .classList.remove("letter__error");
          }
          Array.from(this.lettersNodes)[this.curLetterIndex].classList.add(
            "letter__active"
          );
        } else {
          Array.from(this.lettersNodes)[this.curLetterIndex].classList.add(
            "letter__error"
          );
          this.playSound("errorLetter")
          this.errorLetterPressrdCounter++;
          this.refresherrorsCounter();
        }
      }
      if (this.curLetterIndex == this.lastLetterIndex) {
        this.playSound("win")
        this.stopTimer();
        document.querySelector(
          ".popup_message"
        ).innerHTML = `Вы прошли проверку скорости печати! Скорость печати: ${document.querySelector(
          ".timer"
        ).textContent}. Точность печати: ${document.querySelector(
          ".errorsCounter"
        ).textContent}`;
        document
          .querySelector(".popup_wrapper__hidden")
          .classList.remove("popup_wrapper__hidden");
      }
    });
    document.querySelector("body").addEventListener('click', (e)=>{
      if(Array.from(e.target.classList).includes("sound_off")){
        this.sounds = false;
        e.target.classList.add("sound_active")
        document.querySelector(".sound_on").classList.remove("sound_active")
      }
      if(Array.from(e.target.classList).includes("sound_on")){
        this.sounds = true;
        e.target.classList.add("sound_active")
        document.querySelector(".sound_off").classList.remove("sound_active")
      }
    })
  }
}
export default TextContainer;
