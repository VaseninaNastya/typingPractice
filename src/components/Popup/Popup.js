import create from "../../utils/create.utils.js";
import s from "./Popup.module.scss";

class Popup {
  constructor(message, button){
    this.message = message;
    this.button = button
  }
  generateLayout() {
    this.startButton = create("div", `button__prime ${s.startButton}`, this.button );
    this.popup = create(
      "div",
      "popup_wrapper",
      create("div", s.popup_content, [create("div","popup_message",this.message), this.startButton])
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
