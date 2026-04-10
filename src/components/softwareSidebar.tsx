import { ChangeEvent, useRef, useState } from "react";
import { genRand } from "../functions/randStr";
import { themer, toggleElement } from "../functions/toggleElement";
import perfumeElectroWorld from "../resources/music/Perfume - Electro World.mp3";
import eternxlkzSlayRock from "../resources/music/Eternxlkz - SLAY ROCK.mp3";
import bloodHuntCyberalipsis from "../resources/music/BloodHunt - CYBERALIPSIS.mp3";
import myunDddd from "../resources/music/Myun - D.D.D.D.mp3";
import alexEssekerCyberwar from "../resources/music/ALEX ESSEKER - CYBERWAR.mp3";
import stxrbxthRxvxlt from "../resources/music/STXRBXTH - RXVXLT.mp3";
import martinNetrunner from "../resources/music/Martin Przybylowicz - I'm a Netrunner.mp3";
import martinRebelPath from "../resources/music/Martin Przybylowicz - The Rebel Path.mp3";
import martinV from "../resources/music/Martin Przybylowicz -V.mp3";
import samuraiChippinIn from "../resources/music/SAMURAI - Chippin' In.mp3";
import rosaStayAtYourHouse from "../resources/music/Rosa Walton - I Really Want to Stay at Your House.mp3";

interface SoftwareSidebarProps {
  notes: string;
}

function SoftwareSidebar(props: SoftwareSidebarProps) {
  const missingAuthor = genRand(16);
  const musicTracks = [
    { title: "Eternxlkz - SLAY ROCK!", src: eternxlkzSlayRock },
    { title: "BloodHunt - CYBERALIPSIS", src: bloodHuntCyberalipsis },
    { title: "Myun - D.D.D.D", src: myunDddd },
    { title: "ALEX ESSEKER - CYBERWAR", src: alexEssekerCyberwar },
    { title: "STXRBXTH - RXVXLT", src: stxrbxthRxvxlt },
    { title: "Martin Przybylowicz - I'm a Netrunner", src: martinNetrunner },
    { title: "Martin Przybylowicz - The Rebel Path", src: martinRebelPath },
    { title: "Martin Przybylowicz -V", src: martinV },
    { title: "SAMURAI - Chippin' In", src: samuraiChippinIn },
    { title: "Perfume - Electro World", src: perfumeElectroWorld },
    {
      title: "Rosa Walton - I Really Want to Stay at Your House",
      src: rosaStayAtYourHouse,
    },
  ];

  const [notesTemp, updateNotesTemp] = useState<string>(props.notes);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  function notesHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    // saves contents of textarea input box to local storage. function called on change only every 5 seconds
    e.preventDefault();
    const value = e.target.value.toString();
    updateNotesTemp(value);
    window.localStorage.setItem("notes", value);
  }

  function handleTrackPlay(activeTrackTitle: string): void {
    Object.entries(audioRefs.current).forEach(([title, audio]) => {
      if (audio && title !== activeTrackTitle) {
        audio.pause();
      }
    });
  }

  return (
    <>
      <div id="softwareSidebar" className="border sidePanel panel hover scroll">
        <p className="sidebarHeader titlesText subTitles">=== СОФТ ===</p>
        <div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className=" headerBar"
            onClick={() => toggleElement("softwareReadme")}
          >
            <p className="headerText"> ПРОЧТИ!</p>
          </div>
          <div id="softwareReadme" className="border bgStatic blockText">
            <p>
              Йо, чум! Здесь было предустановлено много мусора от Netwatch.
              Я все почистил для тебя - никаких лишних глаз. Вместо этого
              оставил пару полезных штук, чисто для удобства. Киберпространство
              не всегда про поджаренные схемы и ледяные ванны. Иногда можно и
              просто расслабиться.
            </p>
            <p>
              <em> - Zer0 </em>
            </p>
          </div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className=" headerBar"
            onClick={() => toggleElement("softwareMusic")}
          >
            <p className="headerText"> МУЗЫКА</p>
          </div>
          <div
            id="softwareMusic"
            className="border bgStatic blockText"
            style={{ display: "none" }}
          >
            <p>
              Нетраннинг - это минимум процентов на 15 про вайб. Без ледяной
              ванны и кресла будет тяжко. Это даст тебе хотя бы 5%
              к стилю!
            </p>
            {musicTracks.map((track, index) => {
              const trackId = `musicTrack${index}`;
              return (
                <div key={track.title}>
                  <p
                    className="bg border highlightText listItem"
                    onClick={() => toggleElement(trackId)}
                  >
                    {track.title}
                  </p>
                  <div id={trackId} className="cyberAudioWrap" style={{ display: "none" }}>
                    <audio
                      className="cyberAudio"
                      controls
                      preload="none"
                      ref={(el) => {
                        audioRefs.current[track.title] = el;
                      }}
                      onPlay={() => handleTrackPlay(track.title)}
                    >
                      <source src={track.src} type="audio/mpeg" />
                      Ваш браузер не поддерживает воспроизведение аудио.
                    </audio>
                  </div>
                </div>
              );
            })}
          </div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className=" headerBar"
            onClick={() => toggleElement("softwareNotes")}
          >
            <p className="headerText">ЗАМЕТКИ</p>
          </div>
          <div
            id="softwareNotes"
            className="border bgStatic blockText"
            style={{ display: "none" }}
          >
            <p>
              Нужно держать в голове много всего. Если хочешь делать заметки,
              пиши здесь. Помни: эта VM работает только в RAM. После
              перезагрузки заметки не сохраняются.
            </p>
            <textarea
              id="notes"
              className="bgStatic border highlightText notes"
              defaultValue={notesTemp}
              placeholder="пишите заметки здесь"
              onChange={(e) =>
                setTimeout(() => {
                  notesHandler(e);
                }, 4999)
              }
              style={{ width: "97%" }}
              rows={20}
            ></textarea>
          </div>
          {/*}///////////////////////////////////////////////////////////////////////////*/}
          <div
            className=" headerBar"
            onClick={() => toggleElement("softwareThemes")}
          >
            <p className="headerText">ТЕМЫ</p>
          </div>
          <div
            id="softwareThemes"
            className="border bgStatic blockText"
            style={{ display: "none" }}
          >
            <p>
              У каждого нетраннера свои предпочтения по внешнему виду
              терминала. Интерфейс этой VM староват, так что кастомизации
              немного. Вот что удалось найти. Кликни по теме, чтобы
              попробовать. Внимание! Некоторые довольно вырвиглазные по
              сравнению с моими идеальными темными темами!
            </p>
            <p
              className="bg border highlightText listItem"
              id="red"
              onClick={() => themer("thRed")}
            >
              Netrunner Red
            </p>
            <p
              className="bg border highlightText listItem"
              id="yellow"
              onClick={() => themer("thYellow")}
            >
              Edgerunners Yellow
            </p>
            <p
              className="bg border highlightText listItem"
              id="green"
              onClick={() => themer("thGreen")}
            >
              Biotechnica Green
            </p>
            <p
              className="bg border highlightText listItem"
              id="blue"
              onClick={() => themer("thBlue")}
            >
              Netwatch Blue
            </p>
            <p
              className="bg border highlightText listItem"
              id="white"
              onClick={() => themer("thWhite")}
            >
              Night City White
            </p>
            <p style={{ textTransform: "uppercase" }}>
              ERROR:{missingAuthor} ::: пользователь не найден{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoftwareSidebar;
