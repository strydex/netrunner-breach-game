import { FormEvent, useEffect, useState } from "react";

import CommandHistory from "./commandHistory";

import { gameStateIDs } from "../functions/gameWinState";

interface UserPrivateMessageProps {
  currentUser: any;
  targetUser: any;
  netLoc: any;
}

function UserPrivateMessage(props: UserPrivateMessageProps) {
  const currentUser = props.currentUser;
  const targetUser = props.targetUser;

  const [cmdHistory, setCmdHistory] = useState<any[]>([]);
  const [convoOptions, changeConvoOptions] = useState([
    "Поздороваться",
    "Спросить совет по нетраннингу",
  ]);

  const convoAdditions = {
    greeting: "Поздороваться", // used only as reference
    netrunnerAdvice: "Спросить совет по нетраннингу", // used only as a reference
    resoAgweAdvice: "Спросить, как попасть в Reso Agwe",
    zer0Warning: "Спросить о скрытом предупреждении про Zer0 от `друга`",
  };

  useEffect(() => {
    // if local storage has keys to indicate the player has found certain information => adds questions about that information to the convo options list
    const newConvoOptions = [...convoOptions];
    if (window.localStorage.getItem("plan") === gameStateIDs.plan) {
      // set conversation option based on the task found in home file system
      newConvoOptions.push(convoAdditions.resoAgweAdvice);
    }
    if (window.localStorage.getItem("warning") === gameStateIDs.warning) {
      // set conversation option based on the warning found in home files system
      newConvoOptions.push(convoAdditions.zer0Warning);
    }
    changeConvoOptions(newConvoOptions);
  }, [props.targetUser]);

  function inputHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cmdInput = e.currentTarget.elements.namedItem("cmd") as HTMLInputElement | null;
    const input = parseInt(cmdInput?.value ?? "", 10);
    if (cmdInput) {
      cmdInput.value = "";
    }
    if (typeof input !== "number" || input > convoOptions.length || isNaN(input) === true) {
      return inputFlasher(
        "введите число от 1 до " + convoOptions.length
      );
    } else {
      convoHandler(input);
    }
  }

  function convoHandler(command: number) {
    inputFlasher(command); // records the last entered command / command error message by setting input box placeholder
    responseParser(convoOptions[command - 1]); // parses option inputs and outputs response based on which conversation option is entered
    convoCurator(command - 1); // removes the inputed conversation option from the list and updates the list
  }

  function responseParser(message: string) {
    // parses option inputs and outputs response based on which conversation option is entered
    const output = {
      cmd: "",
      result: "",
    };
    const userTag = "[" + currentUser._name + "]: ";
    const responseTag = "[" + targetUser._alias + "]: ";
    switch (message) {
      case convoAdditions.greeting:
        output.cmd = userTag + "Привет!";
        output.result = responseTag + targetUser._greeting;
        break;
      case convoAdditions.netrunnerAdvice:
        output.cmd = userTag + "Я пока новичок в нетраннинге. Есть советы?";
        output.result = responseTag + targetUser._advice;
        break;
      case convoAdditions.resoAgweAdvice:
        output.cmd = userTag + "Знаешь, как попасть в Reso Agwe?";
        output.result = responseTag + targetUser._resoAgweAdvice;
        break;
      case convoAdditions.zer0Warning:
        output.cmd =
          userTag +
          "Я нашел в файле на своей машине скрытое предупреждение про Zer0, подписанное 'друг'. Сказали искать здесь. Есть детали?";
        output.result = responseTag + targetUser._zer0Warning;
        break;
      default:
        output.cmd = userTag + " ";
        output.result = responseTag + " ";
    }
    if (
      targetUser._connectionStatus === "offline" ||
      targetUser._connectionStatus === "оффлайн"
    ) {
      // do not output a response from an offline user
      output.result = "";
    }
    convoLogger(output);
  }

  function convoLogger(message: any) {
    const newCmd = [...cmdHistory];
    newCmd.push(message);
    setCmdHistory(newCmd);
  }

  function convoCurator(index: number) {
    // removes the inputed conversation option from the list and updates the list
    const tempConvo = convoOptions;
    tempConvo.splice(index, 1);
    changeConvoOptions(tempConvo);
  }

  function inputFlasher(number: number | string) {
    // records the last entered command / command error message by setting input box placeholder
    const output = number.toString();
    const input = document.getElementById("pmInput") as HTMLInputElement | null;
    if (input) {
      input.placeholder = output;
    }
  }

  return (
    <>
      {/* //////////////////// USER INFO  //////////////////////////////*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div className="userInfo">
          <img
            src={targetUser._pfp}
            width="256"
            title={targetUser._alias + "'s profile picture"}
            alt="профиль пользователя"
          />
          <div style={{ lineHeight: "2", fontSize: "16pt" }}>
            <p className="ircText">
              <strong>ИМЯ:</strong> <em>{targetUser._name}</em>
            </p>
            <p className="ircText">
              <strong>АЛИАС:</strong> <em>{targetUser._alias}</em>
            </p>
            <p className="ircText">
              <strong>ID:</strong> <em>{targetUser._userID}</em>
            </p>
            <p className="ircText">
              <strong>СТАТУС ПОДКЛЮЧЕНИЯ:</strong>{" "}
              <em>{targetUser._connectionStatus}</em>
            </p>
          </div>
        </div>
        {/* //////////////////// CONVO OPTIONS  //////////////////////////////*/}
        <div>
          <p className="ircText ircHighlightText">
            О чем вы хотите написать {targetUser._alias}?
          </p>
          {convoOptions.map((option, index) => {
            return (
              <div key={crypto.randomUUID()}>
                <p className="ircText item">
                  {index + 1}: {option}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* //////////////////// COMMAND LINE INPUT //////////////////////////////*/}
      <div id="cmdInput" className="ircCmdInput">
        <span className="ircText">{currentUser._name}</span>
        <span className="ircText" style={{ fontSize: "22pt" }}>
          ➔
        </span>
        <span className="ircText">{targetUser._alias} $:</span>
        <form className="form" onSubmit={(e) => inputHandler(e)}>
          <input
            id="pmInput"
            className="ircCommands"
            autoFocus
            placeholder="Введите номер нужного варианта диалога"
            name="cmd"
            type="text"
          />
        </form>
      </div>
      {/* //////////////////// CONVO HISTORY //////////////////////////////*/}
      <CommandHistory arr={cmdHistory} />
    </>
  );
}

export default UserPrivateMessage;
