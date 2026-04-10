import netwatch from "../resources/netwatch.png";

function Header() {
  return (
    <>
      <div id="header">
        <div className="border gameHeader">
          <div className="gameHeaderLogo">
            <img
              src={netwatch}
              height={30}
              className="image"
              alt="логотип netwatch"
              title="логотип netwatch"
            />
          </div>
          <p id="title" className="titlesText gameHeaderTitle">
            NetRunner Breach
          </p>
          <p className="gameHeaderVersion">
            v.3.666.13
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
