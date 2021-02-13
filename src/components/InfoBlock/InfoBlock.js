import create from "../../utils/create.utils.js";
import s from './InfoBlock.module.scss';

class InfoBlock {
    generateLayout() {
        const reloadButton = create("div",s.reloadButton, "Заново")
        const infoBlock_container = create("div",s.infoBlock_container, reloadButton)
        return infoBlock_container
    }}
export default InfoBlock