import { FormEvent, useEffect, useState } from "react";
import { regexAlpha } from "../functions/regex";

interface BootupProps {
  alert: (message: string) => void;
}

function Bootup(props: BootupProps) {
  const [ueid, setUeid] = useState("");
  useEffect(() => {
    setUeid("zetatech_" + Math.random().toString().slice(2, 8));
  }, []);

  const userHandler = (e: FormEvent<HTMLFormElement>) => { // handles the output from the input box
    e.preventDefault();
    const form = e.currentTarget;
    const userField = form.elements.namedItem("username") as HTMLInputElement | null;
    const uname = userField?.value.toString() ?? "";
    const unameValid = regexAlpha(uname); // boolean output check for if uname contains only alphanumeric values
    if (uname.length < 3 || uname.length > 20) {
      return props.alert("некорректная длина имени пользователя");
    } else if (unameValid === false) {
      return props.alert("имя пользователя должно содержать только буквы и цифры");
    } else {
      bootup(uname);
    }
  };

  const bootup = (user: string) => { // commits user data to local storage and loads into main UI
    const username = (user + "@" + ueid).toString();
    window.localStorage.setItem("username", username);
    props.alert("добро пожаловать, " + username + ". загружаю виртуальную среду, подождите...");
    return setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <div className="inlineBox">
      <div>
        <p>
          Добро пожаловать в ZetaTech Online Machine Buffered Information
          Environment (ZOMBIE)
        </p>
        <p>Первый запуск окружения виртуальной машины</p>
        <p>имя хоста: {ueid}</p>
        <p>введите имя пользователя ниже</p>
        <form onSubmit={userHandler}>
          <input id="usernameInput" className="bg commands padding" type="text" autoFocus name="username" placeholder="имя пользователя..."/>
        </form>
      </div>
    </div>
  );
}

export default Bootup;
