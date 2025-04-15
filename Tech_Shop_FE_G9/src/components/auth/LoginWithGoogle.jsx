import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  loginGoogle,
  saveAccessToken,
  getAccessToken,
} from "../../services/authService";
import { loginSuccess, handleFailure } from "../../store/slices/AuthSlice.js";
import { useDispatch } from "react-redux";
// import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        if (user) {
          const idToken = await user.getIdToken();
          const response = await loginGoogle(idToken);

          console.log(response);
          saveAccessToken(response.token.accessToken); // save access token

          dispatch(loginSuccess(response.token)); // login success, save infomation to redux


          toast.success("User logged in Successfully", {
            position: "top-center",
            autoClose: 2000,
          });

          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      });
      
  };
  return (
    <div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <span className="text-muted">Or</span>
      </div>
      <button className="btn btn-danger" onClick={googleLogin}>
        {" "}
        Đăng nhập bằng google <FaGoogle size={25} />
      </button>
    </div>
  );
}
export default SignInwithGoogle;
