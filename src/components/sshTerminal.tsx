import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CommandHistory from "./commandHistory";

import { commandParser } from "../functions/cmdParser";
import { isObjectEmpty } from "../functions/isEmpty";
import { passwdParser } from "../functions/passwdParser";
import { scpParser } from "../functions/scpParser";
import { toggleElement } from "../functions/toggleElement";
import { uiElements } from "../functions/toggleElement";

import { angryDir, angryFS } from "../data/angryDaemon";
import { edgeDir } from "../data/edgeRunnerFTP";
import { net } from "../data/network";
import { ResoAgweBBS } from "../data/resoAgwe";

interface SshTerminalProps {
  alert: (message: string) => void;
  scp: any;
  sshLoc: string;
  username: string;
}

function SshTerminal(props: SshTerminalProps) {
  const isUiElementKey = (value: string): value is keyof typeof uiElements =>
    value in uiElements;
  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  //
  net.resoAgwe.linkNetworkedDirectories(ResoAgweBBS.resoAgwe);
  net.edgerunnerFTP.linkNetworkedDirectories(edgeDir.homeDir);
  net.angryDaemons.linkNetworkedDirectories(angryDir.homeDir);

  ////////////// COMMANDS INPUT HANDLING /////////////////////////////////////////////////////////
  const [cmdHistory, setCmdHistory] = useState<any[]>([{}]);
  const [passwdReq, setPasswdReq] = useState(true);
  const username = props.username.split("@");
  const uname = username[0] + "@" + props.sshLoc + " $: ";
  const navigate = useNavigate();

  useEffect(() => {
    // dumb way to output and reoutput a notice to input a ssh servers password. triggered automatically on connection to server
    if (cmdHistory[0].cmd !== uname.toString()) {
      cmdLogger({ cmd: "", result: "введите пароль для " + props.sshLoc });
    }
  }, [passwdReq === true]);

  const inputHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cmdInput = e.currentTarget.elements.namedItem("cmd") as HTMLInputElement | null;
    const input = cmdInput?.value.toString() ?? "";
    if (cmdInput) {
      cmdInput.value = "";
    }
    // input interpreter
    if (input.length === 0) {
      return cmdLogger({ cmd: uname, result: "команда пустая" });
    } else if (input.length > 100) {
      return cmdLogger({
        cmd: uname,
        result: "длина команды не может превышать 100 символов",
      });
    } else if (passwdReq === true) {
      // small logic section to handle password input parsing, as well as allowing the user to exit
      const judgePass = passwdParser(currentNetworkLocation, input);
      if (input === "exit") {
        cmdLogger({
          cmd: uname,
          result: "Выход из SSH-сессии и возврат в хост-сессию",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (judgePass === true) {
        setPasswdReq(false);
        cmdLogger({
          cmd: uname,
          result: "аутентификация успешна!",
        });
      } else {
        cmdLogger({
          cmd: uname,
          result: "аутентификация неуспешна. попробуйте снова",
        });
      }
    } else {
      const parsedCmd = commandParser(input);
      commandHandler(parsedCmd, input);
    }
  };

  function commandHandler(instr: any, command: string) {
    // assess object input for recognised commands and handles the logic for the command and its arguments.
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
          break;
        case "cd":
          // change directory
          const changeDirectory = currentDirectory.cd(instr.arg1);
          if (isObjectEmpty(changeDirectory) === false) {
            setCurrentDirectory(changeDirectory);
            if (changeDirectory._dirName === currentDirectory._dirName) {
              result = "нет такой директории";
            } else result = changeDirectory._dirName;
          } else {
            result = "вы уже в корневой директории";
          }
          break;
        case "clear": // clear the terminal history
          return setCmdHistory([{}]);
        case "cmds": // returns a list of possible commands
          result = "cat cd clear cmds exit file irc ls scp ssh steghide toggle";
          break;
        case "exit": // exit ssh session, returns back to main session
          result = "Выход из SSH-сессии и возврат в хост-сессию";
          setTimeout(() => {
            navigate("/");
          }, 2000);
          break;
        case "file": // checks if file exits in current directory and outputs its metadata if it does
          const file = currentDirectory.file(instr.arg1);
          if (typeof file !== "object") {
            result = "~~ нет такого файла";
          } else {
            result = "имя: " + file._fileName;
            result2 = "тип: " + file._fileType;
            result3 = "доступ: " + file._fileType;
            result4 = "владелец: " + file._fileOwner;
            result5 = "создатель: " + file._fileCreator;
          }
          break;
        case "irc":
          result = "Нельзя рекурсивно запускать shell-сессии";
          break;
        case "ls": // lists file contents of current directory | empty checking handles in constructor method
          result = currentDirectory.ls();
          break;
        case "scp":
          result = "scp недоступна внутри SSH-сессии";
          break;
        case "ssh":
          result = "Нельзя рекурсивно запускать shell-сессии";
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
      cmd: uname + command,
      result: result,
      result2: result2,
      result3: result3,
      result4: result4,
      result5: result5,
    };
    cmdLogger(output);
  }

  function cmdLogger(cmd: any) {
    // updates command history with output of comman handler
    const newCmd = [...cmdHistory];
    newCmd.unshift(cmd);
    setCmdHistory(newCmd);
  }

  ////////////// OBJECT STATES ///////////////////////////////////////////////////////////////////
  const [currentNetworkLocation, setCurrentNetworkLocation] = useState<any>("");
  const [currentDirectory, setCurrentDirectory] = useState<any>("");
  // const childDirs = Object.entries(currentDirectory?._linkedDirs);
  const [childDirs, setChildDirs] = useState<any[]>([]);

  const [fileSystem, updateFileSystem] = useState("");

  function assignNetLoc(loc: string) {
    // sets states data based on passed on location data passed in as props
    switch (loc) {
      case "reso_agweBBS":
        setCurrentNetworkLocation(net.resoAgwe);
        setCurrentDirectory(net.resoAgwe._linkedNetworkDirectories);
        break;
      case "EdgerunnersFTP":
        setCurrentNetworkLocation(net.edgerunnerFTP);
        setCurrentDirectory(net.edgerunnerFTP._linkedNetworkDirectories);
        break;
      case "AngryDaemons":
        setCurrentNetworkLocation(net.angryDaemons);
        setCurrentDirectory(net.angryDaemons._linkedNetworkDirectories);
        break;
      default: // shouldn't really show, but very useful auto-navigation if users reloads page while within ssh session
        props.alert(
          "Не удалось запустить secure shell по указанному IP-адресу. Возврат в хост-терминал"
        );
        navigate("/");
    }
    if (currentNetworkLocation._password === " ") {
      setPasswdReq(false);
    }
  }

  useEffect(() => {
    // set location based on input
    if (currentNetworkLocation === "") {
      assignNetLoc(props.sshLoc);
    }
  }, [props.sshLoc]);

  useEffect(() => {
    // creating assignment of scp transferred file to ssh directories
    if (
      typeof props.scp === "object" &&
      props.scp.loc._netLocName === currentNetworkLocation._netLocName
    ) {
      const dirLoc = scpParser(props.scp);
      const file = props.scp.file;
      updateFileSystem("scpTriggered");
      if (typeof dirLoc === "object" && dirLoc && "linkFiles" in dirLoc) {
        return dirLoc.linkFiles(file._fileName, file); // file linking
      }
    }
  }, [passwdReq]);

  useEffect(() => {
    // update of connected child directories auto triggered on directory change
    if (currentDirectory !== "") {
      setChildDirs(Object.entries(currentDirectory._linkedDirs));
    }
  }, [currentDirectory]);

  function daemonTesterDecrypt() {
    if (
      "bbs_mask_9SOCqTxfm2Zi.dat" in
      currentNetworkLocation._linkedNetworkDirectories._fileDirLink
    ) {
      const decrypted = net.angryDaemons._linkedNetworkDirectories.linkFiles(
        "bbs_mask_9SOCqTxfm2Zi.dat.decrypt",
        angryFS.bbsMaskPayloadDecrypt
      );
      return decrypted;
    }
  }

  function daemonTesterReport() {
    if (
      "bbs_mask_9SOCqTxfm2Zi.dat" in
      currentNetworkLocation._linkedNetworkDirectories._fileDirLink
    ) {
      const report = net.angryDaemons._linkedNetworkDirectories.linkFiles(
        "test-report_1545",
        angryFS.testReport
      );
      return report;
    }
  }

  useEffect(() => {
    // auto linking of two specific files to a specific directory, files passed in via scp command
    let decrypted = "";
    let report = "";
    if (currentDirectory === net.angryDaemons._linkedNetworkDirectories) {
      decrypted = daemonTesterDecrypt();
      report = daemonTesterReport();
    }
  }, [fileSystem]);

  return (
    <>
      <div
        id="centrePanel"
        className="border centrePanel panel scroll centreImage hover"
      >
        <div className="terminalText" style={{ lineHeight: "0.5" }}>
          <p>
            <strong>РОДИТЕЛЬСКАЯ ДИРЕКТОРИЯ: </strong>
            {currentDirectory?._linkedParentDir?._dirName}
          </p>
          <p>
            <strong>ТЕКУЩАЯ ДИРЕКТОРИЯ: </strong>
            {currentDirectory?._dirName}
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

export default SshTerminal;
