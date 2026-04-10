import zetatech from "../resources/zetatech.png";
import qr from "../resources/follow-me.svg";

function Footer() {
  return (
    <>
      <div id="footer">
        <div className="border gameFooter">
          <div className="gameFooterLogo">
            <img
              src={zetatech}
              className="image gameFooterLogoImg"
              alt="логотип z"
              title="zetatech"
            />
          </div>
          <p id="footerTitle" className="titlesText gameFooterTitle">
            / спроектировано в ZetaTech /|\ защищено NetWatch \
          </p>
          <div className="gameFooterQr">
            <img
              src={qr}
              className="image gameFooterQrImg"
              alt="qr-код"
              title="следуй за кроличьей норой"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
