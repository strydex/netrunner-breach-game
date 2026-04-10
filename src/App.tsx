import "./App.scss";
import { ReactNode, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// component imports
import Alert from "./components/alert";
import Bootup from "./components/boot";
import Header from "./components/header";
import HelpSidebar from "./components/helpSidebar";
import Terminal from "./components/terminal";
import SshTerminal from "./components/sshTerminal";
import IrcTerminal from "./components/ircTerminal";
import SoftwareSidebar from "./components/softwareSidebar";
import Footer from "./components/footer";

import { shutDown } from "./functions/shutDown";
import { gameWinAppearance } from "./functions/gameWinState";
import { themer } from "./functions/toggleElement";

type WinState = "unset" | boolean;
type NetLocationName = string;
type ScpTransfer =
  | ""
  | {
      loc: any;
      file: any;
    };

function App() {
  type AlertContent = string | ReactNode;
  const [username, setUserName] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // if username exists within localstorage on page load - assign to state
    const userGet = window.localStorage.getItem("username");
    if (userGet !== null) {
      setUserName(userGet);
    }
  }, []);

  useEffect(() => {
    // if notes exists within localstorage on page load - assign to state
    const notesGet = window.localStorage.getItem("notes");
    if (notesGet !== null) {
      setNotes(notesGet);
    }
  }, [username]);

  useEffect(() => {
    // assign alias to state based on username
    if (username) {
      const split = username?.split("@");
      setUserAlias(split[0] ?? "");
    }
  }, [username]);

  useEffect(() => {
    const themeGet = window.localStorage.getItem("theme");
    if (themeGet !== null) {
      themer(themeGet);
    } else {
      themer("thRed");
    }
  }, []);

  const [sshLoc, setSshLoc] = useState<NetLocationName>("");
  const [ircLoc, setIrcLoc] = useState<NetLocationName>("");
  const [OSalert, setAlert] = useState<AlertContent>("");
  const [scp, setSCP] = useState<ScpTransfer>("");
  const [winState, changeWinState] = useState<WinState>("unset");
  const kiwiPoemMessage =
    "Серебряной нитью, мерцающий тред,\n" +
    "Паук собирал свой уютный subnet.\n" +
    "Спица за спицей, петля за петлей,\n" +
    "Но лапка попала во вражеский рой.\n\n" +
    "Во мраке летел, к пустоте был готов\n" +
    "Но что-то сверкнуло, и то был не ров:\n" +
    "Упал в море пищи, вокруг сладкий сок\n" +
    "Так ешь до отвала, мой паучок.";
  const kiwiPoemLink =
    "https://t.me/Strydex?text=" + encodeURIComponent(kiwiPoemMessage);

  useEffect(() => {
    // trigger game win / loss effects based on state being updated to bool and value of bool
    if (winState === false) {
      setTimeout(() => {
        gameWinAppearance(winState);
        setAlert(
          "ОБНАРУЖЕНО ВТОРЖЕНИЕ. ВНЕШНЯЯ SHELL-СЕССИЯ ПОЛУЧИЛА ROOT-ПРАВА. УДАЛЕНИЕ ВИРТУАЛЬНОЙ МАШИНЫ..."
        );
      }, 1000);
      setTimeout(() => {
        shutDown();
      }, 11000);
    } else if (winState === true) {
      setTimeout(() => {
        gameWinAppearance(winState);
        setAlert(
          <>
            {"Привет, " + userAlias + ". Это K1W1. Я проанализировала dat-файл, который ты загрузил. Детали есть на сервере Angry Daemon, если хочешь посмотреть. Zer0 творит с этим какую-то опасную дичь. Извини за каламбур. Возможно, ты только что спас свою жизнь - и, возможно, жизнь самого Zer0 - просто не выполнив его инструкции. Мой совет: больше никогда не трогай эту виртуальную машину. И больше никогда не разговаривай с Zer0..."}
            <br />
            <br />
            {
              "В качестве благодарности за пройденную игру мне есть чем тебя порадовать: я дам тебе доступ к моему приватному VPN-серверу. Чтобы получить его, напиши "
            }
            <a
              className="alertCyberLink"
              href={kiwiPoemLink}
              target="_blank"
              rel="noreferrer"
            >
              сюда
            </a>
            {" и отправь вставленный текст без изменений."}
            <br />
          </>
        );
      }, 10000);
    }
  }, [winState]);

  return !username ? (
    <>
      <div className="page welcome">
        <div id="bootCont" className="welcome">
          <Bootup alert={(alertMessage: string) => setAlert(alertMessage)} />
          {OSalert ? (
            <Alert alert={OSalert} setAlert={() => setAlert("")} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="page">
        <div className="border content">
          <Header />
          <div className="inlineBox panels">
            <HelpSidebar />
            <Routes>
              <Route
                path="/"
                element={
                  <Terminal
                    alert={(alertMessage: string) => setAlert(alertMessage)}
                    ircLoc={(loc: NetLocationName) => setIrcLoc(loc)}
                    scp={(scpOutput: ScpTransfer) => setSCP(scpOutput)}
                    sshLoc={(loc: NetLocationName) => setSshLoc(loc)}
                    username={username}
                    winState={(state: WinState) => changeWinState(state)}
                  />
                }
              />
              <Route
                path="/ssh"
                element={
                  <SshTerminal
                    alert={(alertMessage: string) => setAlert(alertMessage)}
                    scp={scp}
                    sshLoc={sshLoc}
                    username={username}
                  />
                }
              />
              <Route
                path="/irc"
                element={
                  <IrcTerminal
                    alert={(alertMessage: string) => setAlert(alertMessage)}
                    ircLoc={ircLoc}
                    username={username}
                  />
                }
              />
            </Routes>
            <SoftwareSidebar notes={notes} />
          </div>
          <Footer />
        </div>
      </div>
      {OSalert ? <Alert alert={OSalert} setAlert={() => setAlert("")} /> : <></>}
    </>
  );
}
export default App;
