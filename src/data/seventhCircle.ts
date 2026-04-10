import { Character, IRC } from "../functions/classes";
import { getUsername } from "../functions/getUsername";

import { edgerunnerPass, net } from "./network";

// profile pic imports
import zer0Pfp from "../resources/pfp/shade.png";
import tbug from "../resources/pfp/tbug.png";
import bad from "../resources/pfp/bad.png";
import bugbear from "../resources/pfp/bugbear.png";
import luce from "../resources/pfp/luce.png";
import vortex from "../resources/pfp/vortex.png";
import spaceboy from "../resources/pfp/spaceboy.png";
import mystery from "../resources/pfp/mystery.png";
import kiwi from "../resources/pfp/kiwi.png";
import user from "../resources/pfp/user.png";

///////////////////////////////// IRC CHANNEL ////////////////////////////////////////////
//
export const irc = {
    seventhCircle: new IRC(
    "7th Circle",
    "~~~ Слава кибердемонам, что MaxTac не патрулирует киберпространство ~~~" 
    )
}

irc.seventhCircle.assignNetwork(net.seventhCircle);
//
///////////////////////////////// CHARACTERS ///////////////////////////////////////
//

const username = getUsername()

export const charsSeventhCircle = {
  aaaUser: new Character(
    username,
    username,
    "",
    "",
    "",
    "",
    "Привет! Я " +
      username +
      ". Я новичок в нетраннинге. И да, Zer0 вообще красавчик",
    "онлайн",
    user
  ),
  Zer0: new Character(
    "Zer0",
    "Zer0",
    "Йо, " + username + "!",
    "steghide - очень полезный инструмент",
    "я уже дал тебе все, что нужно. читай раздел помощи",
    "wtf, чум... я пытаюсь помочь, и вот такая благодарность?!",
    "какой мега-мозг скупил весь мой лед?!",
    "онлайн",
    zer0Pfp
  ),
  TBug: new Character(
    "TBug",
    "TBug",
    "Что-то нужно, новичок?",
    "хороший нетраннер всегда знает, какие инструменты доступны и что они делают",
    "надеюсь, ты просто смотришь. не связывайся с VDB",
    "Сорри, новичок. Это не я. Кто оставил тебе то сообщение, правильно предупредил. Zer0 иногда мне кажется полным кретином",
    "Подсети Кабуки гудят. Есть инфа?",
    "онлайн",
    tbug
  ),
  bad: new Character(
    "bad",
    "b@d",
    "эй, свежее мясо... новый мальчик Реджи, да?",
    "этому учатся долго: время, терпение и тонна осторожности",
    "чего!? vdbs? бегом к рипперу, у тебя явно схема отвалилась",
    "не знаю. спроси T. это мог быть кто угодно. у Zer0 мозг с багами",
    "мальстремовцы мне не соперники!",
    "онлайн",
    bad
  ),
  bugbear: new Character(
    "bugbear",
    "8ug8ear",
    "Из какой подворотни тебя вообще выкопали?",
    "На твоем этапе есть 4 вещи, с которыми не шутят: корпы, корпораты, копы и Вуду Бойс",
    "wtf! CTRL ALT DELETE себя из этой ситуации.",
    "без понятия, чум. но совет правильный. держись подальше от этого позера",
    "Тигриные Когти тусуются у Вишенки. Держись подальше, схемы плавятся!",
    "онлайн",
    bugbear
  ),
  luce: new Character(
    "luce",
    "luce",
    "извини, не знаю тебя...",
    "отвали",
    "",
    "",
    "мечтаю... смотрю на звезды...",
    "онлайн",
    luce
  ),
  vortex: new Character(
    "vortex",
    "VORTEX",
    "",
    "",
    "",
    "",
    "ухожу в глубокий дайвинг по сети. трайну корпоративный лёд. скоро вернусь",
    "оффлайн",
    vortex
  ),
  spaceboy: new Character(
    "spaceboy",
    "Spaceboy_66",
    "ищешь мудрые слова лоа?",
    "я не настолько глуп, чтобы вооружать конкурентов",
    "sa ou vle ak sot sa a",
    "",
    "Кто-нибудь еще слышал новый трек Lizzy Wizzy!? Просто снос башки",
    "онлайн",
    spaceboy
  ),
  tiNeptune: new Character(
    "tiNeptune",
    "tiNeptune",
    "",
    "",
    "enteresan",
    "",
    "",
    "оффлайн",
    mystery
  ),
  kiwi: new Character(
    "kiwi",
    "K1W1",
    "слышала, ты сегодня играешь в нетраннера. уже выполнил первое задание? Помню когда-то и я читала свой первый cat task в терминале",
    "осторожность - главное правило. один неверный шаг, и мозг потечет через уши",
    "Ахах, похоже, что Zer0 реально пытается тебя убить",
    "хорошо, ты нашел. зайди по ssh на edgerunnerFTP. пароль: " + edgerunnerPass,
    "Я даже из Кабуки слышу звон в ушах. Борги совсем поехавшие",
    "онлайн",
    kiwi
  ),
};

irc.seventhCircle.linkMember(charsSeventhCircle)

//
///////////////////////////////// CHANNEL MESSAGE HISTORY  ///////////////////////////////////////
//

// shorthand
const sev = irc.seventhCircle;

sev.appendMessage(net.seventhCircle._netLocName, " ~~ системный администратор архивировал историю сообщений до этой точки")
sev.appendMessage(sev._members.TBug._alias, "В Кабуки что-то происходит...")
sev.appendMessage(sev._members.TBug._alias, "Была на сервере, и меня выкинуло")
sev.appendMessage(sev._members.TBug._alias, "Без предупреждения, без искр. Теперь сервер даже не пингуется.")
sev.appendMessage(sev._members.TBug._alias, "Часть локальных камер оффлайн. Те, что на резерве или отдельной сетке, еще работают")
sev.appendMessage(sev._members.TBug._alias, "Главная площадь светится слабее обычного")
sev.appendMessage(sev._members.TBug._alias, "Кто знает, что происходит?")
sev.appendMessage(sev._members.Zer0._alias, "ага, у меня тоже кое-что по питанию перезапустилось")
sev.appendMessage(sev._members.Zer0._alias, "хорошо, что у меня есть резервные генераторы")
sev.appendMessage(sev._members.Zer0._alias, "оооооочень не хочу в третий раз перезапускать компиляцию :oooooo")
sev.appendMessage(sev._members.bad._alias, "в последнее время в Уотсоне предупреждают о просадках питания. очередная муть от милитеха")
sev.appendMessage(sev._members.bad._alias, "казалось бы, могли бы и нам кость бросить, учитывая как Райн ластится к их CEO")
sev.appendMessage(sev._members.kiwi._alias, "Честно, я бы расцеловала того, кто устроил блэкаут. Впервые за недели череп не разрывает бас из Totentanz.")
sev.appendMessage(sev._members.TBug._alias, "Похоже, даже корпы иногда делают что-то полезное... случайно.")
sev.appendMessage(sev._members.Zer0._alias, "кто-нибудь скажите мистеру Харфорду: нельзя делать добро, репутацию испортит ;P")
sev.appendMessage(sev._members.kiwi._alias, "Стой... Черт... Они опять врубили бас на всю катушку... пристрелите меня")
sev.appendMessage(sev._members.kiwi._alias, "У них усилки больше, чем Кайказ. Где они так быстро берут генераторы?!")
sev.appendMessage(sev._members.Zer0._alias, "когда ты так же нашпигован хромом с ног до головы как они - возможно все")
sev.appendMessage(sev._members.vortex._alias, "Где есть питание, там есть стабилизаторы. Ставлю на Фуюцуки")
sev.appendMessage(sev._members.vortex._alias, "Мальстрём разгоняет железо почти до красной зоны. Одной искры хватит, чтобы все положить")
sev.appendMessage(sev._members.bugbear._alias, "Да, похоже на Фуюцуки. И нам повезло. Массовые сбои в матрицах. Скинуть документы?")
sev.appendMessage(sev._members.kiwi._alias, "Да. Плиз!")
sev.appendMessage(sev._members.TBug._alias, "Если ты достаточно близко, что слышишь этот гул, то ты эти психи и к тебе могут наведаться")
sev.appendMessage(sev._members.TBug._alias, "С Мальстрём шутки плохи")
sev.appendMessage(sev._members.TBug._alias, "а для людей, у которых в голове металл, каша или химия, у них слишком сильные раннеры")
sev.appendMessage(sev._members.Zer0._alias, "Неееет. ВАЛИ. ИХ. K1W1!!!1!!1")
sev.appendMessage(sev._members.kiwi._alias, "Черт...")
sev.appendMessage(sev._members.kiwi._alias, "Похоже, ты права, Баг>")
sev.appendMessage(sev._members.TBug._alias, "Естественно, я права :)")
sev.appendMessage(sev._members.Zer0._alias, "скууууууучно")
sev.appendMessage(sev._members.bad._alias, "Новичок. Хочешь превратить мозг в бекон - вперед.")
sev.appendMessage(sev._members.bad._alias, "Но Tи права. Мальстрём почти придумали слово 'псих'. И Totentanz они любят сильнее, чем наркотики.")
sev.appendMessage(sev._members.TBug._alias, "и да, наркотики они любят до безумия...")
sev.appendMessage(net.seventhCircle._netLocName, "[---------------------------------------------------------------------------------------------------------------------------------]")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ пользователь [" + sev._members.Zer0._alias + "] добавил [" + sev._members.aaaUser._alias + "] в канал")
sev.appendMessage(sev._members.bad._alias, "???")
sev.appendMessage(sev._members.bad._alias, "Кто это вообще такой?")
sev.appendMessage(sev._members.Zer0._alias, "есть заказ - присмотреть за начинающим раннером. пусть учится ходить")
sev.appendMessage(sev._members.Zer0._alias, "но с ним надо держать связь, когда спотыкается, поэтому добавил сюда")
sev.appendMessage(sev._members.Zer0._alias, "зачем городить инфру для безопасного общения, если IRC решает эту проблему за две команды")
sev.appendMessage(sev._members.bad._alias, "Это не твоя песочница, Zer0. Тупейший opsec - тащить рандома в СЕКЬЮРНЫЙ КАНАЛ!")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ пользователь [" + sev._members.Zer0._alias + "] снял следующие права с [" + sev._members.aaaUser._alias + "]: message(write/edit/delete), users(add/edit/remove)")
sev.appendMessage(sev._members.Zer0._alias, "спокойно, чууум. я настроил конфиг, он безопасен")
sev.appendMessage(sev._members.Zer0._alias, "к тому же, Реджи его проверила")
sev.appendMessage(sev._members.bad._alias, "А если Реджи скажет тебе спрыгнуть с крыши мегабашни, потому что внизу точно есть сетка, тоже прыгнешь?")
sev.appendMessage(sev._members.Zer0._alias, "еще бы. какой адреналин")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ пользователь [" + sev._members.bad._alias + "] снял следующие права с [" + sev._members.Zer0._alias + "]: дыхание, наличие мозга")
sev.appendMessage(sev._members.Zer0._alias, "XD")
sev.appendMessage(sev._members.Zer0._alias, "чум!!")
sev.appendMessage(sev._members.Zer0._alias, "выпей молочный улун")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ пользователь [" + sev._members.TBug._alias + "] снял следующие права с [" + sev._members.Zer0._alias + "]: users(add/edit/remove)")
sev.appendMessage(sev._members.Zer0._alias, "чееееего! ну камон!")
sev.appendMessage(net.seventhCircle._netLocName, " ~~ пользователь [" + sev._members.TBug._alias + "] архивировал серию сообщений канала") 
sev.appendMessage(sev._members.TBug._alias, "Хватит фигней страдать, Zer0. Так людей убивают, если ты не заметил")
sev.appendMessage(sev._members.TBug._alias, "И это не угроза")
sev.appendMessage(sev._members.TBug._alias, "Если твой новичок залезет не в ту сеть, мы все можем сгореть")
sev.appendMessage(sev._members.Zer0._alias, "я посадил его на старый zetatech zombie. полностью изолированный и одноразовый. железо где-то в Пало-Альто, в своей песочнице")
sev.appendMessage(sev._members.Zer0._alias, "не парься, я сделал домашку")
sev.appendMessage(sev._members.bugbear._alias, "Zer0, ты идиот.")
sev.appendMessage(sev._members.bugbear._alias, "Похоже, моральный ущерб нам всем уже нанесен. Лучшее, что можем - вести себя спокойно и направить новичка в правильное русло, когда появится.")
sev.appendMessage(sev._members.bugbear._alias, "Хотя бы ради нашей собственной шкуры")
sev.appendMessage(sev._members.TBug._alias, "И то верно")

