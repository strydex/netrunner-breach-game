import { Directory, File } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

import { daemonPass } from "./network";

const username = getUsername();

///////////////////////////////// DIRECTORIES ////////////////////////////////////////////
//
export const edgeDir = {
  rootDir: new Directory("root"),
  homeDir: new Directory("home"),
  archiveDir: new Directory("archive"),
  softwareDir: new Directory("software"),
  targetsDir: new Directory("targets"),
};
//
///// LINKING /////
//
edgeDir.rootDir.linkDirectories("home", edgeDir.homeDir);

edgeDir.homeDir.linkParentDirectory(edgeDir.rootDir);
edgeDir.homeDir.linkDirectories("archive", edgeDir.archiveDir);
edgeDir.homeDir.linkDirectories("software", edgeDir.softwareDir);
edgeDir.homeDir.linkDirectories("targets", edgeDir.targetsDir);

edgeDir.archiveDir.linkParentDirectory(edgeDir.homeDir);
edgeDir.softwareDir.linkParentDirectory(edgeDir.homeDir);
edgeDir.targetsDir.linkParentDirectory(edgeDir.homeDir);
//
///////////////////////////////// FILES ////////////////////////////////////////////
//
export const edgeFS = {
  root: {
    root: new File(
      "root",
      "elf",
      "root systemd init storage users",
      username + " root",
      "root",
      "доступ запрещен",
      "доступ запрещен"
    ),
  },
  archive: {
    archive: new File(
      "archive",
      "elf",
      "root storage users",
      username + " kiwi root",
      "kiwi",
      "доступ запрещен",
      "доступ запрещен"
    ),
  },
  software: {
    software: new File(
      "software",
      "elf",
      "root storage users",
      username + " kiwi root",
      "kiwi",
      "доступ запрещен",
      "доступ запрещен"
    ),
  },
  targets: {
    Zer0: new File(
      "Zer0",
      "text",
      "storage",
      username + " kiwi root",
      "kiwi",
      "Zer0: в основном работает на Реджину Джонс, то есть по большей части по заказам из Уотсона. крутится в сетях около Пасифики, у самой границы киберпространства VDB. есть подозрение, что его лояльность куплена NetWatch или какой-то китайской корпораций-призраком, возможно ИскИном.",
      "proxy ip: 50.237.253.197, aliases: Zer0 c4t4kly5m n0elle kR00z3r"
    ),
    newbie_readme: new File(
      "newbie-readme",
      "text",
      "storage",
      username + " kiwi root",
      "kiwi",
      "Мы давно наблюдаем за Zer0. Он подставил тебя под конфликт с Вуду Бойс, так что ты даже не заметил. Проигрышная ситуация при любом раскладе... Чум, ради себя самого - брось задание, которое он тебе дал. Загрузи dat-файл, который Zer0 хочет видеть на Reso Agwe BBS, на сервер Angry Daemon - а не туда, куда он велит. Данные для доступа к Angry Daemon спрятаны в этом файле. Остальное я беру на себя, а ты уходи из этого дела, ок?",
      "239.149.68.33, pass: " + daemonPass
    ),
  },
};
//
///// LINKING /////
//
edgeDir.rootDir.linkFiles("root", edgeFS.root.root);
edgeDir.archiveDir.linkFiles("archive", edgeFS.archive.archive);
edgeDir.softwareDir.linkFiles("software", edgeFS.software.software);
edgeDir.targetsDir.linkFiles("Zer0", edgeFS.targets.Zer0);
edgeDir.targetsDir.linkFiles("newbie-readme", edgeFS.targets.newbie_readme);
