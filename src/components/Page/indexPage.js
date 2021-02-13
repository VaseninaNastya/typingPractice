import create from "../../utils/create.utils.js";
import s from "./indexPage.module.scss";
import TextContainer from "../TextContainer/TextContainer";
import Popup from "../Popup/Popup.js";

class StartPage {
  generateLayout() {
    const popup = new Popup()
    this.text_container = new TextContainer();
    const container = create(
      "div",
      s.container,
      this.text_container.generateLayout()
    );
    const wrapper = create("div", "wrapper", container);
    document.body.prepend(popup.generateLayout(), wrapper);
    this.addText();
    this.addEventListeners();
  }

  addText() {
    this.text_container.getData();
  }
  addEventListeners() {
    document.querySelector(".reloadButton").addEventListener("click", () => {
      document.querySelector(".text_container").innerHTML = "";
      this.addText();
    });
  }
}
const startPage = new StartPage();
startPage.generateLayout();
export default StartPage;
