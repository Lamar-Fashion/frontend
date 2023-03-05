import "../../styles/shared/dual-modal.css";
import { useNavigate, useLocation } from "react-router-dom";

function DualModal({
  type,
  navigateTo,
  text,
  title,
  showHeader,
  successButtonText,
  secondButtonSuccessAction,
  secondButtonSuccess,
  deleteHandler,
  setOpenDeletModal,
  setDeletedItem,
  setCloseModalState,
  closeModalStateValue
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const closeSuccessModal = (target) => {
    if (setCloseModalState && !navigateTo) {
      setCloseModalState(closeModalStateValue);
      return;
    };
    let navTo = navigateTo;
    if (target) {
      navTo = target;
    }
    if (location.pathname == navTo) window.location.reload();
    else navigate(navTo);
  };
  const closeErrorModal = () => {
    if (setCloseModalState && !navigateTo) {
      setCloseModalState(closeModalStateValue);
      return;
    };
    
    if (setOpenDeletModal && setDeletedItem) {
      setDeletedItem(null);
      setOpenDeletModal(false);
      return;
    }
    if (location.pathname == navigateTo) {
      window.location.reload();
    } else navigate(navigateTo);
  };
  
  return (
    <>
      <div className="background">
        <div className="container-dual-modal">
          {type == "success" && (
            <div className="row">
              <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
                <div className="icon">
                  <span className="fa fa-check"></span>
                </div>
                <h1>{title ? title : "Success!"}</h1>
                <p>
                  {text && text.includes("<br/>") ? text.split("<br/>")[0] : text}
                  <br />
                  {text && text.includes("<br/>") ? text.split("<br/>")[1] : ""}
                </p>
                {secondButtonSuccess && (
                  <button
                    type="button"
                    style={{"marginRight": "15px"}}
                    className="redo btn"
                    onClick={()=>closeSuccessModal(secondButtonSuccessAction)}
                  >
                    {secondButtonSuccess}
                  </button>
                )}
                <button
                  type="button"
                  onClick={()=>closeSuccessModal()}
                  className="redo btn"
                >
                  {successButtonText ? successButtonText : 'Ok'}
                </button>
                
                <span className="change"></span>
              </div>
            </div>
          )}
          {type == "error" && (
            <div className="row">
              <div className="modalbox error col-sm-8 col-md-6 col-lg-5 center animate">
                <div className="icon">
                  <span className="fas fa-times"></span>
                </div>
                {showHeader && <h1>Oops!</h1>}

                <p>
                {text && text.includes("<br/>") ? text.split("<br/>")[0] : text}
                  <br />
                  {text && text.includes("<br/>") ? text.split("<br/>")[1] : ""}
                </p>
                {!deleteHandler && (
                  <button
                    type="button"
                    className="redo btn"
                    onClick={closeErrorModal}
                  >
                    Try again
                  </button>
                )}
                {deleteHandler && (
                  <button
                    type="button"
                    className="redo btn left-button"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                )}
                {deleteHandler && (
                  <button
                    type="button"
                    className="redo btn"
                    onClick={closeErrorModal}
                  >
                    Cancel
                  </button>
                )}
                <span className="change"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DualModal;
