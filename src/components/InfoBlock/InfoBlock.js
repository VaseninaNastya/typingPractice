import create from "../../utils/create.utils.js";
import s from "./InfoBlock.module.scss";

class InfoBlock {
  generateLayout() {
    const reloadButton = create("div", `button__prime reloadButton`, "Заново");
    const errorsCounter = create("div", s.errorsCounter, "100%");
    const timer = create("div", s.timer, "0 зн./мин.");
    const infoBlock_container = create("div", s.infoBlock_container, [
      reloadButton,
      create("span", null, "точность:"),
      errorsCounter,
      create("span", null, "скорость:"),
      timer
    ]);
    return infoBlock_container;
  }
}
export default InfoBlock;
