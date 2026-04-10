import { Directory, File } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

const username = getUsername();

///////////////////////////////// DIRECTORIES ////////////////////////////////////////////
//
export const angryDir = {
  homeDir: new Directory("home"),
  toolsDir: new Directory("tools"),
  exportDir: new Directory("export"),
};
//
///// LINKING /////
//
angryDir.homeDir.linkDirectories("tools", angryDir.toolsDir);
angryDir.toolsDir.linkParentDirectory(angryDir.homeDir);
angryDir.homeDir.linkDirectories("export", angryDir.exportDir);
angryDir.exportDir.linkParentDirectory(angryDir.homeDir);
//
///////////////////////////////// FILES ////////////////////////////////////////////
//
export const angryFS = {
  readme: new File(
    "readme",
    "text",
    "storage",
    username + " root",
    "root",
    "AngryDaemonTester: аппаратная изолированная среда (air-gap) для анализа потенциально вредоносного софта, на который ты 'случайно наткнулся(ась)'. Скопируй файл на IP этого сервера (ВАЖНО: используй только scp), и инструменты тестовой среды будут готовы к работе. Примечание: по соображениям безопасности AngryDaemonTester совместим только с самыми актуальными BCI-контроллерами.",
    "n/a"
  ),
  tools: new File(
    "tools",
    "elf",
    "root storage users",
    username + " root",
    "root",
    "доступ запрещен",
    "доступ запрещен"
  ),
  export: new File(
    "export",
    "elf",
    "root storage users",
    username + " root",
    "root",
    "доступ запрещен",
    "доступ запрещен"
  ),
  bbsMaskPayloadDecrypt: new File(
    "bbs_mask_9SOCqTxfm2Zi.dat.decrypt",
    "elf",
    "storage",
    "angryDaemon kiwi " + username,
    "angryDaemon",
    "author: unknown, compiler licence user: Zer0, compiler: zetatech mammoth, encyrption: AES4 8kb, polymorphism?: no",
    "файл сгенерирован Angry Daemon Tester(™ NetWatch)"
  ),
  testReport: new File(
    "test-report_1545",
    "text",
    "storage",
    "angryDaemon kiwi " + username,
    "angryDaemon",
    "отчет по bbs_mask_9SOCqTxfm2Zi.dat || тип файла: encrypted archive, исполняемый модуль: fireshaft, функция: мониторинг, отчетность и манипуляция сетевым трафиком, инструменты взлома: удаление логов на уровне root / динамическая смена имен и учетных данных с обфускацией, теги: extraBlackwall, transBlackwall, AGI, state actor",
    "файл сгенерирован Angry Daemon Tester(™ NetWatch)"
  ),
};
//
///// LINKING /////
//
angryDir.homeDir.linkFiles("readme", angryFS.readme);
angryDir.exportDir.linkFiles("export", angryFS.export);
angryDir.toolsDir.linkFiles("tools", angryFS.tools);
