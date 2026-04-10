import { toggleElement } from "../functions/toggleElement";

function HelpSidebar() {
  return (
    <>
      <div id="helpSidebar" className="border sidePanel panel hover scroll">
        <p className="sidebarHeader titlesText subTitles">=== ПОМОЩЬ ===</p>
        <div>
          <div
            className="headerBar"
            onClick={() => toggleElement("helpReadme")}
          >
            <p className="headerText"> ПРОЧТИ! </p>
          </div>
          <div id="helpReadme" className="border bgStatic blockText">
            <p>
              Йо! Реджина сказала, что ты новичок в нетраннинге и хочешь
              попробовать себя. Ну, не буквально намочить ноги - это будет
              позже, сильно позже. Тебе повезло, я ей должен услугу. Я поднял
              для тебя эту виртуальную машину, чтобы ты освоил базу и
              размял кибер-ноги. Ничего особенного, не новые Raven
              микропроцессоры и все такое. Но... когда ты накосячишь - а ты
              накосячишь - TraumaTeam не вломится к тебе в дверь забирать тело.
            </p>
            <p>
              Чтобы сэкономить нам обоим кучу проблем, эта машина работает
              только в RAM. Хранятся только твой username, id сессии и заметки.
              Так что не перезагружай страницу, если только совсем не
              напортачил и не хочешь начать заново. Если совсем застрянешь -
              пиши мне в IRC. Но сначала попробуй разобраться сам, ок? Если
              не сможешь понять, как попасть в IRC, тут уже без шансов. Скажи
              Реджине, что я отработал красиво!
            </p>
            <p>
              <em> - Zer0 </em>
            </p>
            <p>
              И первый совет для старта: введи "cmds" в командной строке и
              нажми Enter - увидишь список доступных команд. Добавь к команде
              --help, и она расскажет, что делает. Остальное раскопай сам.{" "}
            </p>
          </div>
        </div>
        {/*/////////////////////////////////// GLOSSARY ////////////////////////////////////////////*/}
        <div
          className="headerBar"
          onClick={() => toggleElement("helpGlossary")}
        >
          <p className="headerText">глоссарий</p>
        </div>
        <div
          id="helpGlossary"
          className="border bgStatic blockText"
          style={{ display: "none" }}
        >
          <p>
            Мир огромный. Невозможно знать все. Для этого и существует
            хранилище данных.
          </p>
          {/*///////////////////////////*/}
          <p
            className="bg border highlightText listItem"
            onClick={() => toggleElement("ircInfo")}
          >
            IRC
          </p>
          <p id="ircInfo" style={{ display: "none" }}>
            IRC расшифровывается как Internet Relay Chat. Иногда это еще
            называют BBS (Bulletin Board System). Разница есть, но сейчас не
            важно. IRC - это сервер, куда заходит куча людей, чтобы писать
            друг другу. Я уже добавил тебя в свой канал: 7th-Circle. Если
            сильно застрянешь - пиши туда.
          </p>
          {/*///////////////////////////*/}
          <p
            className="bg border highlightText listItem"
            onClick={() => toggleElement("netrunnerInfo")}
          >
            Netrunner
          </p>
          <div id="netrunnerInfo" style={{ display: "none" }}>
            <p>
              Лучше бы ты уже это знал, иначе беда. На всякий случай:
              Нетраннеры - это профессионалы в сфере компьютерных технологий, талантливые программисты, 
              кодеры и хакеры, которые способны перемещаться по потокам данных 
              киберпространства, разбираются в работе компьютерных систем, 
              знают языки программирования, могут написать или модифицировать вирус. 
              У большинства из нас есть спец-киберимпланты для
              быстрого приема, анализа и вывода данных. У меня, например,
              кибердека Biotech Sigma Mk.2. Плюс
              кастомный костюм с трубками отвода тепла, чтобы сливать жар от
              хрома прямо в ледяную ванну.
            </p>
            <p>
              Самые упакованные нетраннеры обычно работают на корпы вроде
              Arasaka, Militech, Zetatech, NCORP или Netwatch, но среди нас еще есть те, кто не
              продал душу. Если ты напичкан хромом - будь осторожен с
              нетраннерами. Они могут вырубить или сломать твои импланты за
              долю секунды. А если в голове есть мокрое железо - могут так
              вольтануть, что мозг закипит буквально в черепе.
            </p>
          </div>
          {/*///////////////////////////*/}
          <p
            className="bg border highlightText listItem"
            onClick={() => toggleElement("netwatchInfo")}
          >
            NetWatch
          </p>
          <p id="netwatchInfo" style={{ display: "none" }}>
            Слышал про Чёрный Заслон? ~~~ Жутковато ~~~. Огромный щит от диких
            довоенных ИИ. Великий забор киберпространства! Если у тебя есть
            эдди, Netwatch патрулирует твой кусок этой ограды. И если они
            случайно смотрят весь трафик - ну, совпадение, конечно. Совсем не
            похоже на выгодный бизнес шпионажа. Кстати, внизу экрана есть
            надпись protected by Netwatch. Я оставил ее специально, чтобы ты не
            расслаблялся(ась).
          </p>
          {/*///////////////////////////*/}
          <p
            className="bg border highlightText listItem"
            onClick={() => toggleElement("sshInfo")}
          >
            SSH
          </p>
          <p id="sshInfo" style={{ display: "none" }}>
            SSH значит secure shell... почему там h - без понятия. По сути это
            вход на другую машину через сеть. Shell - это то, чем ты
            пользуешься сейчас: простые инструменты командной строки.
          </p>
          <p
            className="bg border highlightText listItem"
            onClick={() => toggleElement("zombieInfo")}
          >
            Z.O.M.B.I.E
          </p>
          <div id="zombieInfo" style={{ display: "none" }}>
            <p>
              Zetatech Online Machine Buffered Information Environment, или
              ZOMBIE, — это то, чем ты пользуешься прямо сейчас. Небольшой
              сервер и собственная мини-операционка. Чуть поумнее обычного
              шелла, но гоооораздо тупее нормального нетраннерского wetware.
              Зато, по крайней мере, в ZOMBIE нет риска буквально сдохнуть,
              когда какой-нибудь псих в кресле-джока шарахнет тебе по мозгам
              убийственными демонами.
            </p>
            <p>
              Эту версию я под тебя кастомизировал. Чтобы Netwatch не видел все
              твои будущие провалы и не ржал перед тем, как тебя закрыть. Не за
              что, чум. Постоянного хранилища нет. Знаю, боль, но поверь - так
              безопаснее для нас обоих. Твое устройство запомнит только
              учетные данные, и все. Так что не перезагружайся без крайней
              необходимости.
            </p>
          </div>
        </div>

        {/*/////////////////////////////////// MAP ////////////////////////////////////////////*/}
        <div
          className="headerBar"
          onClick={() => toggleElement("helpMap")}
        >
          <p className="headerText"> карта </p>
        </div>

        <div id="helpMap" className="border bgStatic blockText" style={{ display: "none" }}>
          <p>
            В файлах этой VM есть задание для тебя. Проверь их, чтобы доказать,
            на что ты способен. Эта datamap должна помочь.
          </p>
          <p>
            -<em>Zer0</em>
          </p>
          <span style={{ fontFamily: "monospace" }}>
            ├── <strong>bbs_mask_0Hp8BAZ8gkF8</strong>
            <br />
            │ └── доступ запрещен <br />
            ├── <strong>bbs_mask_2mGUUHfQIk0t</strong>
            <br />
            │ └── доступ запрещен
            <br />
            ├── <strong> bbs_mask_9SOCqTxfm2Zi</strong>
            <br />
            │ ├── 91E0C5NMg5xE
            <br />
            │ ├── HjTESlk7aw4b
            <br />
            │ ├── M9KFZKUlring
            <br />│ ├── <strong>p7FzTKa13OhG</strong>
            <br />
            │ │ ├── ruleset
            <br />
            │ │ ├── ufw.conf.d
            <br />│ │ └── <strong>whitelist</strong>
            <br />
            │ │ | ├── jeon-kiri
            <br />
            │ │ | ├── leon
            <br />
            │ │ | ├── maman-briggite
            <br />
            │ │ | ├── moseley
            <br />
            │ │ | ├── mr-hands
            <br />
            │ │ | ├── placide
            <br />
            │ │ | └── ti-neptune
            <br />
            │ └── saoXGjvToAlh
            <br />
            ├── <strong>bbs_mask_hMlMhTNGxi05</strong>
            <br />
            │ └── доступ запрещен
            <br />
            ├── <strong>bbs_mask_XpPkmHxDgPfN</strong>
            <br />
            │ └── доступ запрещен
            <br />
            └── <strong>root</strong>
            <br />
            | └── доступ запрещен
            <br />
          </span>
        </div>
      </div>
    </>
  );
}

export default HelpSidebar;
