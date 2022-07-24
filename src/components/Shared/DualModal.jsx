import '../../styles/shared/dual-modal.css';
import {useNavigate, useLocation} from 'react-router-dom';

function DualModal({type,navigateTo,text, showHeader,deleteHandler,setOpenDeletModal,setDeletedItem}) {
    const navigate = useNavigate();
    const location = useLocation();

const closeSuccessModal = ()=>{
    if (location.pathname == navigateTo) window.location.reload();
    else navigate(navigateTo);

}
const closeErrorModal = ()=>{
    if(setOpenDeletModal && setDeletedItem) {
        setDeletedItem(null);
         setOpenDeletModal(false);
         return;
    
    };
    console.log(location.pathname)  
if (location.pathname == navigateTo) window.location.reload();
else navigate(navigateTo);
}
    return(
        <>
        <div className="background">
<div className="container-dual-modal">
	{type == 'success' && <div className="row">
		<div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
			<div className="icon">
				<span className="fa fa-check"></span>
				{/* <span className="glyphicon glyphicon-ok"></span> */}
                {/* <i className="fa-solid fa-check"></i> */}
			</div>
			{/* <!--/.icon--> */}
			<h1>Success!</h1>
			<p>{text.split('<br/>')[0]}
				<br/>{text.split('<br/>')[1]}</p>
			<button type="button" onClick={closeSuccessModal} className="redo btn">Ok</button>
			<span className="change"></span>
			{/* <span className="change">-- Click to see opposite state --</span> */}
		</div>
		{/* <!--/.success--> */}
	</div>}
	{/* <!--/.row--> */}
	{ type == 'error' && <div className="row">
		<div className="modalbox error col-sm-8 col-md-6 col-lg-5 center animate" >
			<div className="icon">
				<span className="fas fa-times"></span>
			</div>
			{/* <!--/.icon--> */}
			{showHeader && <h1>Oops!</h1>}
            
			<p>{text.split('<br/>')[0]}
				<br/>{text.split('<br/>')[1]}</p>
			{ !deleteHandler && <button type="button" className="redo btn" onClick={closeErrorModal}>Try again</button>}
			{ deleteHandler && <button type="button" className="redo btn left-button" onClick={deleteHandler}>Delete</button>}
			{ deleteHandler && <button type="button" className="redo btn" onClick={closeErrorModal}>Cancel</button>}
			<span className="change"></span>
			{/* <span className="change">-- Click to see opposite state --</span> */}
		</div>
		{/* <!--/.success--> */}
	</div>}
	{/* <!--/.row--> */}
</div>
{/* <!--/.container--> */}
</div>
</>
    )
};

export default DualModal;