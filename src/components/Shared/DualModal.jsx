import '../../styles/shared/dual-modal.css';
import {useNavigate} from 'react-router-dom';

function DualModal({type,navigateTo}) {
    const navigate = useNavigate();

const closeSuccessModal = ()=>{
navigate(navigateTo)
}
    return(
        <>
        <div class="background">
<div class="container">
	{type == 'success' && <div class="row">
		<div class="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
			<div class="icon">
				<span class="fa fa-check"></span>
				{/* <span class="glyphicon glyphicon-ok"></span> */}
                {/* <i class="fa-solid fa-check"></i> */}
			</div>
			{/* <!--/.icon--> */}
			<h1>Success!</h1>
			<p>We've received your order
				<br/>we will get in touch soon.</p>
			<button type="button" onClick={closeSuccessModal} class="redo btn">Ok</button>
			<span class="change"></span>
			{/* <span class="change">-- Click to see opposite state --</span> */}
		</div>
		{/* <!--/.success--> */}
	</div>}
	{/* <!--/.row--> */}
	{ type == 'error' && <div class="row">
		<div class="modalbox error col-sm-8 col-md-6 col-lg-5 center animate" >
			<div class="icon">
				<span class="glyphicon glyphicon-thumbs-down"></span>
			</div>
			{/* <!--/.icon--> */}
			<h1>Oh no!</h1>
			<p>Oops! Something went wrong,
				<br/> you should try again.</p>
			<button type="button" class="redo btn">Try again</button>
			<span class="change">-- Click to see opposite state --</span>
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