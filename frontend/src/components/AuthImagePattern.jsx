export const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center"> 
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg">{subtitle}</p>
        </div>
    </div>
  );
}