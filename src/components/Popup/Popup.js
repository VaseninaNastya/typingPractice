import create from "../../utils/create.utils.js";
import s from "./Popup.module.scss";

class Popup {
  generateLayout() {
    this.startButton = create("div", `button__prime ${s.startButton}`, "Начать");
    this.popup = create(
      "div",
      "popup_wrapper",
      create("div", s.popup_content, ["Вы хотите начать проверку скорости печати?", this.startButton])
    );
    this.addEventListeners()
    return this.popup;
  }
  addEventListeners(){
    this.startButton.addEventListener("click", ()=>{
      this.popup.classList.add("popup_wrapper__hidden")
    })
  }
}

export default Popup;
