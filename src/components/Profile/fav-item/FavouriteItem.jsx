import {React,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/profile/fav-item.css";
import {encryptAndSaveToStorage} from '../../../helpers/CryptoJS'
import {instance, url} from '../../../API/axios';
import {useDispatch,useSelector} from 'react-redux';
import {assignFavourite} from '../../../store/actions/index';
import LoadingState from '../../Shared/LoadingState';
import DualModal from '../../Shared/DualModal';

function FavouriteItem() {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer);

    const [favArray, setFavArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

     // delete favourite handler
     const deleteItem = async(item)=>{
      try {

        // setIsLoading(true);
        const response = await instance.delete(url+`/favourite/${user.id}/${item.id}`,{
          headers:{
            authorization:`Bearer ${user.token}`
      
          }
        });
// setIsLoading(false);

        // getFavouriteHandler(user.id);
        const deletedId = item.id;
if (response) {
  favArray.map((item,idx)=>{
    if (item.id == deletedId) {
      favArray.splice(idx,1);
      return;
    }
  });
let updateFav = favArray;
  setFavArray([]);
  setFavArray(updateFav);
  dispatch(assignFavourite(favArray.length));
}

      } catch (error) {
        error?.response?.data?.error ?  setError(error.response.data.error) : setError('Error while delete favourite');
        console.error('Error while delete favourite',error.message);
      }


  
// }
    }
   

    // get favourite handler
    const getFavouriteHandler = (userId)=>{
      setIsLoading(true);
      
      setTimeout(async() => {
    try {

    const response = await instance.get(url+`/favourite/${userId}`,{
      headers:{
        authorization:`Bearer ${user.token}`
  
      }
    });
    setFavArray(response.data);
    dispatch(assignFavourite(response.data.length));
  setIsLoading(false);
  
} catch (error) {
  error?.response?.data?.error ?  setError(error.response.data.error) : setError('Error while getting favourites');
  console.error('Error while getting favourites',error.message);
  
}

}, 500);
     

    }

    //did mount
    useEffect(()=>{
      getFavouriteHandler(user.id);
    },[]);
    // useEffect(()=>{
    //   dispatch(assignFavourite(favArray.length));

    // },[favArray]);


    return (
        <>
        <section className="fav-item">
        <div className="lamar-container">
            {!isLoading && favArray&&
            favArray.map((item,indx)=>
          
        <div className="box" key={item.id}>
          <div className="over-view">
           <div className='fav' onClick={()=>deleteItem(item)}>

          <i className="fas fa-trash-alt" ></i>
            </div>
          </div>
          <div className="image">
          <img src={item.images[0]} alt='' className='img-product' />

            <Link
              to="/ProductDetails"
              onClick={() => {
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: "smooth",
                });
             
                encryptAndSaveToStorage('product',item);

              }}
            >
              <div className="overlay">
                <h3>
                  Quick View <i className="far fa-eye"></i>
                </h3>
              </div>
            </Link>
          </div>
          <div className="info">
            <h3>{item.name}</h3>
            <h2>QAR {item.price}</h2>
          </div>
        </div>
            
        
        
        )}
            </div>
            {!isLoading && !favArray.length && <div className='empty-state-wishlist'>Your wishlist is empty!</div>}
           
            {isLoading && <div className='loading-state-container'><LoadingState/></div> }
        </section>
           
        {error && <DualModal type='error' navigateTo = '/Profile/2' text={error ? error : 'Something went wrong! <br/> please try again'} showHeader={true}/>}
        </>
    )
}

export default FavouriteItem