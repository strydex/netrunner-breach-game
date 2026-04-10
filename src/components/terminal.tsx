import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";
import { dnsTransfer, ircTransfer } from "../functions/dnsTransfer";
import { gameStateTracker } from "../functions/gameWinState";
import { gameWinMonitor } from "../functions/gameWinState";
import { isObjectEmpty } from "../functions/isEmpty";
import { passwdParser } from "../functions/passwdParser";
import { shutDown } from "../functions/shutDown";
import { toggleElement } from "../functions/toggleElement";
import { uiElements } from "../functions/toggleElement";

import { net } from "../data/network";
import { zetatechDir } from "../data/zetatechVM";

interface TerminalProps {
  username: string;
  alert: (message: string) => void;
  ircLoc: (loc: string) => void;
  scp: (output: any) => void;
  sshLoc: (loc: string) => void;
  winState: (state: boolean) => void;
}

function Terminal(props: TerminalProps) {
  const isUiElementKey = (value: string): value is keyof typeof uiElements =>
    value in uiElements;
  net.zombie.linkNetworkedDirectories(zetatechDir.homeDir);
  ////////////// COMMANDS INPUT HANDLING /////////////////////////////////////////////////////////
  const [cmdHistory, setCmdHistory] = useState<any[]>([{}]);
  const uname = props.username + " $: ";
  const navigate = useNavigate();

  const inputHandler = (e: FormEvent<HTMLFormElement>) => {
    // takes input from command line
    e.preventDefault();
    const cmdInput = e.currentTarget.elements.namedItem("cmd") as HTMLInputElement | null;
    const input = cmdInput?.value.toString() ?? "";
    if (cmdInput) {
      cmdInput.value = "";
    }
    if (input.length === 0) {
      return cmdLogger({ cmd: uname, result: "команда пустая" });
    } else if (input.length > 100) {
      return cmdLogger({
        cmd: uname,
        result: "длина команды не может превышать 100 символов",
      });
    } else {
      const parsedCmd = commandParser(input); // checks input commands for correct number of arguments and outputs an object
      commandHandler(parsedCmd, input); // logic of handling commands and arguments based on object states
    }
  };

  function commandHandler(instr: any, command: string) {
    // assess object input for recognised commands and handles the logic for the command and its arguments.
    const input = command.toLowerCase();
    let result = " ";
    let result2 = "";
    let result3 = "";
    let result4 = "";
    let result5 = "";
    if (Object.keys(instr)[1] === "helpStatement") {
      result = instr.helpStatement;
    } else {
      switch (instr.cmd) {
        case "cat":
          // concatenate file - output file contents | checking for file in directory occurs in constructor method
          result = currentDirectory.cat(instr.arg1);
          if (instr.arg1 === "task" || instr.arg1 === "edgerunnerFTP") {
            gameStateTracker(instr.arg1);
          }
          break;
        case "cd":
          // change directory
          const changeDirectory = currentDirectory.cd(instr.arg1);
          if (isObjectEmpty(changeDirectory) === false) {
            setCurrentDirectory(changeDirectory);
            if (changeDirectory._dirName === currentDirectory._dirName) {
              result = "~~ нет такой директории";
            } else result = changeDirectory._dirName;
          } else {
            result = "вы уже в корневой директории";
          }
          break;
        case "clear":
          // clear the terminal history
          return setCmdHistory([{}]);
        case "cmds":
          // returns list of possible commands
          result = "cat cd clear cmds exit file irc ls scp ssh steghide toggle";
          break;
        case "exit":
          // exit vm session and navigates back to login page
          result = "Выход из сессии виртуальной машины...";
          shutDown();
          break;
        case "file": // checks if file exists in current directory and outputs its metadata if it does
          const file = currentDirectory.file(instr.arg1);
          if (typeof file !== "object") {
            result = "~~ нет такого файла";
          } else {
            console.log(file);
            result = "имя: " + file._fileName;
            result2 = "тип: " + file._fileType;
            result3 = "доступ: " + file._fileAccess;
            result4 = "владелец: " + file._fileOwner;
            result5 = "создатель: " + file._fileCreator;
          }
          break;
        case "irc":
          // checks if argumet matches irc ip and outputs success/failure message. on success navigate to irc passing dat aup as props
          const ircLoc = ircTransfer(instr.arg1);
          if (typeof ircLoc !== "object") {
            result = ircLoc;
          } else {
            props.ircLoc(ircLoc._netLocName);
            result = "Переход в IRC-систему...";
            setTimeout(() => {
              navigate("irc");
            }, 2000);
          }
          break;
        case "ls": // lists file contents of current directory | empty checkin handled in constructor method
          result = currentDirectory.ls();
          break;
        case "scp":
          // secure copy. sets parsed arguments to states and procedurally checks those states to see if the argument outputs are valid
          // if arguments are valid, passes data up as props and checks if data meets game win/loss criteria
          // inputs parsing
          const fileToCopy = currentDirectory.file(instr.arg1);
          const serverLocation = dnsTransfer(instr.arg2);
          const passwordCorrect = passwdParser(serverLocation, instr.arg3);
          // input error checking
          if (passwordCorrect === false) {
            result = "неверный пароль сервера";
          }
          if (typeof serverLocation !== "object") {
            result = serverLocation;
          }
          if (typeof fileToCopy !== "object") {
            result = fileToCopy;
          }
          // output
          if (
            result === " " &&
            typeof fileToCopy === "object" &&
            typeof serverLocation === "object"
          ) {
            result =
              "файл " +
              fileToCopy._fileName +
              " безопасно скопирован в " +
              serverLocation._netLocName;
            props.scp({ loc: serverLocation, file: fileToCopy });
            // win state monitoring
            const winCheck = gameWinMonitor(
              fileToCopy,
              serverLocation._ipAddress
            );
            if (typeof winCheck === "boolean") {
            props.winState(winCheck);
            }
          }
          break;
        case "ssh": // secure shell. checks if argument is valid ssh ip, if so passes data up as props and navigates to ssh
          const ipLoc = dnsTransfer(instr.arg1);
          if (typeof ipLoc != "object") {
            result = ipLoc;
          } else {
            props.sshLoc(ipLoc._netLocName);
            result = "Запуск secure shell в удаленной локации...";
            setTimeout(() => {
              navigate("/ssh");
            }, 2000);
          }
          break;
        case "steghide": // lists "hidden file info" | checking for file in current directory happens in constructor method
          result = currentDirectory.steghide(instr.arg1);
          break;
        case "toggle": // checks if argument matched list of ui elements and toggles element visibititly if true
          const uiElement = String(instr.arg1);
          if (isUiElementKey(uiElement)) {
            result = "переключен элемент UI " + uiElement;
            toggleElement(uiElements[uiElement]);
          } else {
            result = " ~~ нет такого элемента UI";
          }
          break;
        default: // should never show, error checking mostly occurs earlier in chain
          console.log(
            "Произошла ошибка. commandParser вернул недопустимую команду"
          );
      }
    }
    const output = {
      cmd: uname + input,
      result: result,
      result2: result2,
      result3: result3,
      result4: result4,
      result5: result5,
    };
    cmdLogger(output);
  }

  function cmdLogger(cmd: any) {
    const newCmd = [...cmdHistory];
    newCmd.unshift(cmd);
    setCmdHistory(newCmd);
  }

  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  const [currentDirectory, setCurrentDirectory] = useState(zetatechDir.homeDir);
  const childDirs = Object.entries(currentDirectory._linkedDirs);

  return (
    <>
      <div
        id="centrePanel"
        className="border centrePanel panel scroll centreImage hover"
      >
        <div className="terminalText" style={{ lineHeight: "0.5" }}>
          <p>
            <strong>РОДИТЕЛЬСКАЯ ДИРЕКТОРИЯ: </strong>
            {currentDirectory._linkedParentDir._dirName}
          </p>
          <p>
            <strong>ТЕКУЩАЯ ДИРЕКТОРИЯ: </strong> {currentDirectory._dirName}
          </p>
          <span>
            <strong>ДОЧЕРНИЕ ДИРЕКТОРИИ: </strong>
          </span>
          {childDirs?.map((dir) => {
            return <span key={crypto.randomUUID()}>{dir[0]} </span>;
          })}
        </div>
        <div id="cmdInput" className="cmdInput">
          <span className="uname">{uname}</span>
          <form className="form" onSubmit={(e) => inputHandler(e)}>
            <input
              id="commandInput"
              className="commands"
              autoFocus
              name="cmd"
              placeholder="введите команду"
              type="text"
            />
          </form>
        </div>
        <div className="cmdReturn terminalText">
          <CommandHistory arr={cmdHistory} />
        </div>
      </div>
    </>
  );
}

export default Terminal;
