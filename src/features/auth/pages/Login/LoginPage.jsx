import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { googleLogin } from "../../services/auth.service";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      console.log(response.credential);
      await googleLogin(response.credential);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-xl shadow-lg p-10 w-[400px]">
        <h1 className="text-3xl font-bold mb-2">
          OpsPilot AI
        </h1>

        <p className="text-gray-500 mb-8">
          Your AI Site Reliability Engineer
        </p>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </div>
  );
}