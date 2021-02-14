import create from "../../utils/create.utils.js";
import s from "./InfoBlock.module.scss";

class InfoBlock {
  generateLayout() {
    const reloadButton = create("div", `button__prime reloadButton`, "Заново");
    const errorsCounter = create("div", s.errorsCounter, "100%");
    const timer = create("div", s.timer, "0 зн./мин.");
    const sound = create("div",s.sound_container,[
        create("div", "sound_on sound_active", "вкл."),
        create("div", "sound_off", "выкл."),
    ])
    const infoBlock_container = create("div", s.infoBlock_container, [
      reloadButton,
      create("span", s.infoBlock_description, "точность:"),
      errorsCounter,
      create("span", s.infoBlock_description, "скорость:"),
      timer,
      create("span", s.infoBlock_description, "звук:"),
      sound
    ]);
    return infoBlock_container;
  }
}
export default InfoBlock;
