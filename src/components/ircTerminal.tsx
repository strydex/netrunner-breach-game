import "../seventhCircle.scss";
import Fire from "../resources/fire-57.gif";

import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { net } from "../data/network";
import { charsSeventhCircle as chars } from "../data/seventhCircle";
import { irc } from "../data/seventhCircle";

import UserDisplayStatus from "./ircUserDisplay";
import UserPrivateMessage from "./ircPrivateMessage";

import { ircCommandParser } from "../functions/cmdParser";
import { sectionSelector } from "../functions/sectionSelector";
import { toggleElement, uiElements } from "../functions/toggleElement";

interface IrcTerminalProps {
  alert: (message: string) => void;
  ircLoc: string;
  username: string;
}

function IrcTerminal(props: IrcTerminalProps) {
  const isUiElementKey = (value: string): value is keyof typeof uiElements =>
    value in uiElements;
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // INPUT HANDLING
  //

  const [cmdHistory, setCmdHistory] = useState("введите команду");

  function inputHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cmdInput = e.currentTarget.elements.namedItem("cmd") as HTMLInputElement | null;
    const input = cmdInput?.value.toString() ?? "";
    if (cmdInput) {
      cmdInput.value = "";
    }
    if (input.length === 0) {
      return cmdFlasher("команда пустая");
    } else if (input.length > 100) {
      return cmdFlasher("длина команды не может превышать 100 символов");
    } else {
      const parsedCmd = ircCommandParser(input); // checks to see if input matches a correct command, checks for correct number of command arguments and tag to output a help statement about a command then outputs an object of command and argument(s)
      commandHandler(parsedCmd); // handles the bulk of the argument logic
    }
  }

  function commandHandler(command: any) {
    // assess object input for recognised commands and handles the logic for the command and its arguments.
    let result = " ";
    if (Object.keys(command)[1] === "helpStatement") {
      result = command.helpStatement;
    } else {
      switch (command.cmd) {
        case "cmds": // outputs a list of possible commands
          result = "cmds exit messages pm private t toggle users";
          break;
        case "exit": // exit back to main shell session
          result = "Выход из IRC-сессии...";
          setTimeout(() => {
            navigate("/");
          }, 2000);
          break;
        case "messages": // shows irc channel messages window
          result = "переход к окну сообщений";
          sectionSelector(
            sections,
            sections[1],
            headerSections,
            headerSections[1],
            "red"
          );
          break;
        case "pm": // initiates a private conversation with a given user
          let findUser: any = null;
          if (command.arg1 === currentUser._name) {
            result = "Нельзя начать приватный чат с самим собой!";
          } else {
            findUser = currentIRC.findUser(command.arg1);
          }
          if (findUser === " ~~ нет такого пользователя") {
            result = findUser;
          } else if (findUser && typeof findUser === "object") {
            result = "Начинаю приватный чат с пользователем: " + findUser._name;
            setPMTarget(findUser);
            setPM(true);
            sectionSelector(
              sections,
              sections[2],
              headerSections,
              headerSections[2],
              "red"
            );
          }
          break;
        case "private": // shows private conversation window
          result = "переход к окну приватных сообщений";
          sectionSelector(
            sections,
            sections[2],
            headerSections,
            headerSections[2],
            "red"
          );
          break;
        case "t": // sends a message to the irc channel | in this case, the user is not permitted to message because of in game context
          result = "У ВАС НЕТ ПРАВ НА ОТПРАВКУ СООБЩЕНИЙ В ЭТОМ КАНАЛЕ";
          break;
        case "toggle": // shows/hides page ui elements
          const uiElement = String(command.arg1);
          if (isUiElementKey(uiElement)) {
            result = "переключен элемент UI " + uiElement;
            toggleElement(uiElements[uiElement]);
          } else {
            result = " ~~ нет такого элемента UI";
          }
          break;
        case "users": // shows irc channel users window
          result = "переход к окну пользователей";
          sectionSelector(
            sections,
            sections[0],
            headerSections,
            headerSections[0],
            "red"
          );
          break;
        default: // shouldn't ever show, but just in case - errors should be caught earlier in the chain
          result = "что-то пошло не так...";
      }
    }
    cmdFlasher(result);
  }

  function cmdFlasher(message: string) {
    // basic checking and sets input box placeholder as the result of the last entered command if that produced an output message
    if (
      typeof message === "string" &&
      message.length > 0 &&
      message.length < 200
    ) {
      const input = document.getElementById("commandInput") as HTMLInputElement | null;
      if (input) {
        input.placeholder = message;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // OBJECT STATEs
  //
  const [currentNetworkLocation, setCurrentNetworkLocation] = useState<any>("");
  const [currentIRC, setCurrentIRC] = useState<any>("");
  const [characters, setCharacters] = useState<any[]>([]);
  const currentUser = chars.aaaUser;

  function assignIrcLoc(loc: string) {
    // checks that location passed in fits known locatins and assigns relevant data to controlling state variables
    switch (loc) {
      case "7th-Circle":
        setCurrentNetworkLocation(net.seventhCircle);
        setCurrentIRC(irc.seventhCircle);
        setCharacters(Object.entries(irc.seventhCircle._members).sort());
        break;
      default:
        props.alert(
          "Не удалось загрузить IRC-клиент по указанному IP-адресу. Возврат в хост-терминал"
        );
        navigate("/");
    }
  }

  useEffect(() => {
    //  if current network location is at its initialised state => set states based on data passed in as props
    if (currentNetworkLocation === "") {
      assignIrcLoc(props.ircLoc);
    }
  }, [props.ircLoc]);

  // array of DOM element ids for controlling subsection visibility and styling
  const headerSections = [
    "userHeader",
    "messagesHeader",
    "privateMessagesHeader",
  ];
  const sections = ["users", "messages", "privateMessages"];

  //boolean state for private message visibility
  const [pm, setPM] = useState(false);
  const [pmTarget, setPMTarget] = useState<any>({});

  return (
    <>
      <div className="border centrePanel hover panel scroll">
        <div className="sevenBG">
          <div className="titleBar">
            <img src={Fire} width="100px" alt="fire gif" />
            <h1 className="channelTitle">
              {currentNetworkLocation._netLocName}
            </h1>
            <img src={Fire} width="100px" alt="fire gif" />
          </div>
          <p className="subtitleText">{currentIRC._tagline?.toLowerCase()}</p>
        </div>
        <div id="cmdInput" className="cmdInput">
          <span className="uname">
            {currentUser._name}@{currentNetworkLocation._netLocName} $:
          </span>
          <form className="form" onSubmit={(e) => inputHandler(e)}>
            <input
              id="commandInput"
              className="commands"
              autoFocus
              name="cmd"
              placeholder={cmdHistory}
              type="text"
            />
          </form>
        </div>
        <div className="panel">
          <div className="headers">
            <span
              className="ircHeaderText headerButton"
              id="userHeader"
              style={{
                color: "white",
                outline: "1px solid white",
                backgroundColor: "rgba(255,0,85,0.2)",
                zIndex: "3",
              }}
              onClick={() =>
                sectionSelector(
                  sections,
                  sections[0],
                  headerSections,
                  headerSections[0],
                  "red"
                )
              }
            >
              Пользователи
            </span>
            <span
              className="ircHeaderText headerButton"
              id="messagesHeader"
              onClick={() =>
                sectionSelector(
                  sections,
                  sections[1],
                  headerSections,
                  headerSections[1],
                  "red"
                )
              }
            >
              Сообщения канала
            </span>
            <span
              className="ircHeaderText headerButton"
              id="privateMessagesHeader"
              onClick={() =>
                sectionSelector(
                  sections,
                  sections[2],
                  headerSections,
                  headerSections[2],
                  "red"
                )
              }
            >
              Приватные сообщения
            </span>
          </div>
          <div id="users">
            {characters?.map((char) => {
              const displayStatus = char[1];
              return (
                <div key={crypto.randomUUID()}>
                  <UserDisplayStatus user={displayStatus} />
                </div>
              );
            })}
          </div>
          <div id="messages" style={{ display: "none" }}>
            {currentIRC._messageHistory?.map((msg: string) => {
              return <p className="ircText item">{msg}</p>;
            })}
          </div>
          <div id="privateMessages" style={{ display: "none" }}>
            {pm === false ? (
              <div key={crypto.randomUUID()}>
                <p className="ircText ircHighlightText" style={{ textAlign: "center" }}>
                  Чтобы начать приватный чат, используйте команду "pm",
                  затем имя пользователя.
                </p>
              </div>
            ) : (
              <div key={crypto.randomUUID()}>
                <UserPrivateMessage
                  currentUser={currentIRC._members.aaaUser}
                  netLoc={currentNetworkLocation}
                  targetUser={pmTarget}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default IrcTerminal;
