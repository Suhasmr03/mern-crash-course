import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, MessageSquare } from "lucide-react";
import { User } from "lucide-react";
import { AuthImagePattern } from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
        fullName:'',
        email:'',
        password:'',
    });

    const {signUp,isSigningUp}= useAuthStore();

    const validateForm = () => {
      if (!formData.fullName.trim()) {
        toast.error("Full Name is required");
        return false;
        
      }
      if (!formData.email.trim()) {
        toast.error("Email is required");
        return false;

      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Invalid email format");
        return false;
        
      }
      if(!formData.password){
        toast.error("Password is required");
        return false;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
      }
      return true;
    };
    // const handleChange = (e) => {
    //     e.preventDefault();
    // };
    const handleSubmit = async(e) => {
        e.preventDefault();
      console.log('handleSubmit fired', formData);   
       const success = validateForm();
       console.log("Validation result:", success);
        if(!success) return;
        if (typeof signUp !== 'function') {
    console.error('signUp is not a function', signUp);   // debug
    return;
  }
  try {
    await signUp(formData);
    console.log('signUp completed');                     // debug
  } catch (err) {
    console.error('signUp error', err);
  }
        
    };
    
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
  {/* Left Side - Form Section */}
  <div className="flex flex-col justify-center items-center p-6 sm:p-12 mt-12">
    <div className="w-full max-w-md space-y-2">
      <div className="text-center mb-8">
        {/* Logo or Icon can go here */}
        <div className="flex flex-col items-center gap-2 group">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-base-content/60">Get started with your free content</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-6 text-base-content/40" />
            </div>
            <input
              type="text"
              className={"input input-bordered w-full pl-10"}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-4 text-base-content/40" />
            </div>
            <input
              type="text"
              className={"input input-bordered w-full pl-10"}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-6 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={"input input-bordered w-full pl-10"}
              placeholder="Enter your Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
             
            />
            <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye className="size-6 text-base-content/40" />
            ) : (
              <EyeOff className="size-6 text-base-content/40" />
            )}
          </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
          {isSigningUp ? (
            <span className="loading loading-spinner">
              Loading...
            </span>
          ) : (
           "Create Account"
          )}
        </button>
      </form>
      <div className={"text-center text-base-content/60"
      }>
        Already have an account? <a href="/login" className="text-primary hover:underline"> Sign in</a>
      </div>
    </div>
  </div>

  {/* Right Side - Optional content */}
  <div className="bg-gray-100 hidden lg:block h-full " >
    {/* You can add an image, illustration, or branding content here */}
    <AuthImagePattern
    title="Join Our Community"
    subtitle="connect with friends, share comments and stay in touch with your friends."
    />
  </div>
</div>

  )
}

export default SignUpPage