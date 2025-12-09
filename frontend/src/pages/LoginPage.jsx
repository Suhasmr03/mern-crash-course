
import React from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Eye, EyeOff, MessageSquare } from 'lucide-react';
import { User } from 'lucide-react';
import { AuthImagePattern } from '../components/AuthImagePattern.jsx';

const LoginPage = () => {
  const [showPassword,setShowPassword] = React.useState(false);
  const [formData,setFormData] = React.useState({
      email:'',
      password:'',
  });
const {login,isLoggingIn}= useAuthStore();

const handleSubmit = async(e) => {

    e.preventDefault();
    await login(formData);
} 

  return (
    <div><div className="min-h-screen grid lg:grid-cols-2">
  {/* Left Side - Form Section */}
  <div className="flex flex-col justify-center items-center p-6 sm:p-12 mt-12">
    <div className="w-full max-w-md space-y-2">
      <div className="text-center mb-8">
        {/* Logo or Icon can go here */}
        <div className="flex flex-col items-center gap-2 group">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Welcome Back !</h1>
          <p className="text-base-content/60">Sign in to your account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
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
        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <span className="loading loading-spinner">
              Loading...
            </span>
          ) : (
           "Sign in"
          )}
        </button>
      </form>
      <div className={"text-center text-base-content/60"
      }>
        Don&apos;t have an account? <a href="/signup" className="text-primary hover:underline"> Sign up</a>
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
</div>
  );
}


export default LoginPage;