type ParserOutput =
  | { cmd: string | string[]; helpStatement: string }
  | { cmd: string; arg1?: string; arg2?: string; arg3?: string };

export function commandParser(command: string) {
  // takes input from terminals, checks for recognised commands, help request tags and if input has correct number of arguments for inputed command
  const input = command.toLowerCase();
  const cmd = command.split(" ");
  const program = cmd[0].toLowerCase();
  let output: ParserOutput;

  if (cmd[1] === "--help" || cmd[1] === "-h") {
    // if cmd appened with help request tag, find command in switch and output a help statement about command
    switch (program) {
      case "cat":
        output = helpAssembler(input, "Вывести содержимое файла");
        break;
      case "cd":
        output = helpAssembler(
          input,
          "Переход в директорию. Укажите корректное имя директории"
        );
        break;
      case "clear":
        output = helpAssembler(input, "Очистить терминал");
        break;
      case "cmds":
        output = helpAssembler(input, "Показать доступные команды терминала");
        break;
      case "exit":
        output = helpAssembler(
          input,
          "Выход из сессии. Все данные окружения виртуальной машины будут удалены!"
        );
        break;
      case "file":
        output = helpAssembler(
          input,
          "Показать метаданные файла. Укажите корректное имя файла"
        );
        break;
      case "irc":
        output = helpAssembler(
          input,
          "Перейти в IRC-клиент. Укажите корректный IP-адрес IRC-сервера"
        );
        break;
      case "ls":
        output = helpAssembler(input, "Показать файлы в текущей директории");
        break;
      case "scp":
        output = helpAssembler(
          input,
          "Скопировать файл в сетевую локацию. Укажите корректные имя файла, IP-адрес и пароль"
        );
        break;
      case "software":
        output = helpAssembler(
          input,
          "Переключить отображение боковой панели software"
        );
        break;
      case "ssh":
        output = helpAssembler(
          input,
          "Безопасно открыть shell-сессию на удаленной системе. Укажите корректный удаленный IP-адрес"
        );
        break;
      case "steghide":
        output = helpAssembler(
          input,
          "Показать скрытую в файле информацию (стеганография). Укажите корректное имя файла"
        );
        break;
      case "toggle":
        output = helpAssembler(
          input,
          "Переключить отображение элемента UI. Укажите имя элемента. Варианты: footer, header, help, software"
        );
        break;
      default:
        output = helpAssembler(input, "команда не найдена");
    }
  } else {
    switch (program) {
      // find known command in input and check that command has correct number of arguments
      case "clear":
      case "cmds":
      case "exit":
      case "ls":
        output = argumentsChecker(cmd, 1);
        break;
      case "cat":
      case "cd":
      case "file":
      case "irc":
      case "ssh":
      case "steghide":
      case "toggle":
        output = argumentsChecker(cmd, 2);
        break;
      case "scp":
        output = argumentsChecker(cmd, 4);
        break;
      default:
        output = helpAssembler(input, "команда не найдена");
    }
  }
  return output;
}

export function ircCommandParser(command: string) {
  // takes input from terminals, checks for recognised commands, help request tags and if input has correct number of arguments for inputed command
  const input = command.toLowerCase();
  const cmd = command.split(" ");
  const program = cmd[0].toLowerCase();

  let output: ParserOutput;
  if (cmd[1] === "--help" || cmd[1] === "-h") {
    // if cmd appened with help request tag, find command in switch and output a help statement about command
    switch (program) {
      case "cmds":
        output = helpAssembler(input, "Показать доступные команды терминала");
        break;
      case "exit":
        output = helpAssembler(
          input,
          "Выйти из IRC-сессии и вернуться в хост-терминал"
        );
        break;
      case "messages":
        output = helpAssembler(input, "Открыть окно сообщений канала");
        break;
      case "pm":
        output = helpAssembler(
          input,
          "Начать приватный чат с пользователем. Укажите алиас пользователя"
        );
        break;
      case "private":
        output = helpAssembler(input, "Открыть окно приватных сообщений");
        break;
      case "t":
        output = helpAssembler(
          input,
          "Отправить сообщение в канал/пользователю. Добавьте текст сообщения"
        );
        break;
      case "toggle":
        output = helpAssembler(
          input,
          "Переключить отображение элемента UI. Укажите имя элемента. Вариант: footer, header, help, software"
        );
        break;
      case "users":
        output = helpAssembler(input, "Открыть окно пользователей канала");
        break;
      default:
        output = helpAssembler(input, "команда не найдена");
    }
  } else {
    switch (program) {
      // find known command in input and check that command has correct number of arguments
      case "cmds":
      case "exit":
        output = argumentsChecker(cmd, 1);
        break;
      case "messages":
        output = argumentsChecker(cmd, 1);
        break;
      case "pm":
        output = argumentsChecker(cmd, 2);
        break;
      case "private":
        output = argumentsChecker(cmd, 1);
        break;
      case "t":
        output = argumentsChecker(cmd, 100);
        break;
      case "toggle":
        output = argumentsChecker(cmd, 2);
        break;
      case "users":
        output = argumentsChecker(cmd, 1);
        break;
      default:
        output = helpAssembler(input, "команда не найдена");
    }
  }
  return output;
}

function argumentsChecker(command: string[], number: number) {
  // check for correct number of arguments
  if (command[command.length - 1] === "") {
    return helpAssembler(command, `"" — недопустимый аргумент`);
  } else if (number === 100) {
    // used to bypass argument length checking for inputs with variable numbers of arguments
    return cmdAssembler(command, number);
  } else if (command.length < number) {
    return helpAssembler(command, "слишком мало аргументов");
  } else if (command.length > number) {
    return helpAssembler(command, "слишком много аргументов");
  } else {
    return cmdAssembler(command, number);
  }
}

function cmdAssembler(command: string[], number: number) {
  // if arguments number is correct, output cmd and arguments as object
  if (number === 1) {
    return { cmd: command[0] };
  } else if (number === 2) {
    return { cmd: command[0], arg1: command[1] };
  } else if (number === 4) {
    return {
      cmd: command[0],
      arg1: command[1],
      arg2: command[2],
      arg3: command[3],
    };
  } else if (number === 100) {
    // used for commands with inputs of a string, therefore varaible number of arguments
    const message = command.slice(1).join(" ");
    return { cmd: command[0], arg1: message };
  }
  return { cmd: command[0] };
}

function helpAssembler(command: string | string[], statement: string) {
  return { cmd: command, helpStatement: statement };
}
