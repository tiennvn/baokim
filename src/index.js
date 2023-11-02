import "./index.scss";
import "./js/menu";
import "./js/scrolltotop";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}