import {useState} from 'react'
import "../../../styles/profile/profile-info.css"
function ProfileInfo() {
    const [showSubmit, setShowSubmit] = useState(false)
    return (
        <>
        <section className="profile-info-section">
        <div className="lamar-container">
            <div className="edit-profile">
                

            <i className="fas fa-user-edit" 
            onClick={()=>{
                setShowSubmit(!showSubmit)
            }}></i>
               
            </div>
        <form action="">

            <div className="input-user">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                defaultValue="abu-nofal"
              />
            </div>

            <div className="input-pass">
            <i className="fas fa-mail-bulk"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                defaultValue="anofal719@gmail.com"
              />
            </div>
            <button type="submit"  className={showSubmit?"show-submit submit":"submit"}>submit </button>
          </form>
            </div>
        </section>
            
        </>
    )
}

export default ProfileInfo
