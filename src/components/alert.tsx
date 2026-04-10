import { ReactNode, useEffect } from "react";

interface AlertProps {
  alert: ReactNode;
  setAlert: (value?: string) => void;
}

function Alert(props: AlertProps) {
  function focusElement(element: string) {
    setTimeout(() => {
      document.getElementById(element)?.focus();
    }, 200);
  }

  useEffect(() => {
    if (props.alert) {
      (document.getElementById("alerter") as HTMLDialogElement | null)?.showModal();
      focusElement("alertClose");
    }
  }, [props.alert]);
  return (
    <>
      <dialog id="alerter" className="alertDialog bg border">
        <p className="alertHeader highlightText">ВНИМАНИЕ</p>
        <div className="highlightText">{props.alert}</div>
        <form method="dialog">
          <button
            id="alertClose"
            className="alertButton bg border"
            onClick={() => props.setAlert("")}
          >
            <p className="highlightText">закрыть</p>
          </button>
        </form>
      </dialog>
    </>
  );
}

export default Alert;
