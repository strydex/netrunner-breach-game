// game win triggered on upload of payload to malware tester server
// scp $payload $testerServerIP $serverPassword
//
// game loss triggered on upload of payload to reso agwe server
// scp $payload $resoAgweIP $resoAgwePassword

import { net } from "../data/network";
import { zetatechFS } from "../data/zetatechVM"

import VDBs from "../resources/resoAgwe.jpg";

import lossSound from "../resources/badAlarm.mp3";
import winSound from "../resources/msgAlarm.mp3";

const lossAlarm = new Audio(lossSound);
const winAlarm = new Audio(winSound);

export const gameStateIDs = {
  plan: "5878c69f-3996-464b-809a-042d019662a1",
  warning: "25c4319f-9994-4e8e-8cde-d8e48f0f3f1e",
};

export function gameWinMonitor(file: any, ip: string) {
  // inputs have already been checked for errors and validity when function is called
  if (file !== zetatechFS.files.bbsMaskPayload) {
    return " ";
  }
  if (ip === net.angryDaemons._ipAddress) {
    return true;
  } else if (ip === net.resoAgwe._ipAddress) {
    return false;
  } else {
    return " ";
  }
}

export function gameWinAppearance(bool: boolean) {
    // called when game ends to change the appearance of the webpage based on success / loss
  if (bool === false) {
    lossAlarm.play();
    const bg = "url(" + VDBs + ")";
    const centrePanel = document.getElementById("centrePanel");
    const body = document.querySelector("body");
    const title = document.getElementById("title");
    const footerTitle = document.getElementById("footerTitle");
    if (centrePanel) centrePanel.style.background = "url()";
    if (body) body.style.backgroundImage = bg;
    if (title) title.innerHTML = "Вы проиграли!";
    if (footerTitle) footerTitle.innerHTML = "ПОПРОБУЙТЕ СНОВА";
  } else if (bool === true) {
    winAlarm.play();
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const title = document.getElementById("title");
    const footerTitle = document.getElementById("footerTitle");
    if (header) header.style.backgroundColor = "#41F395";
    if (footer) footer.style.backgroundColor = "#41F395";
    if (title) title.innerHTML = "Поздравляю. Вы прошли игру!";
    if (footerTitle) footerTitle.innerHTML = "СПАСИБО ЗА ИГРУ!";
  }
}

export function gameStateTracker(instr: string) {
    // called as part of cat command in terminal
    // takes in command argument and checks if matches known file important to game progression
    // if yes, sets unique key to local storage
    switch (instr){
        case "task":
            window.localStorage.setItem("plan", gameStateIDs.plan)
            break;
        case "edgerunnerFTP":
            window.localStorage.setItem("warning", gameStateIDs.warning)
            break;
        default:
            console.log("gameStateTracker has recieved an invalid input")
    }
}
