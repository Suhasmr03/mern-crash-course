 import { useEffect} from 'react'
 import { useChatStore } from '../store/useChatStore';  
    import { Users } from 'lucide-react';
 
 const Sidebar = () => {
    const { users, isUsersLoading, getUsers, setSelectedUser,selectedUser } = useChatStore();

    const onlineUsers= [1,2,3]; // Dummy online users list

    useEffect(() => {
        getUsers();
    }, [])
    if (isUsersLoading) {
      return (
        <div className="flex items-center justify-center h-full w-64 border-r border-base-300">Loading...</div>
      );
    }

   return (
     <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transation-all duration-200'>
        <div className='border-b border-base-300 w-full p-4 '>
            <div className='flex items-center gap-2'>
                <Users className='size-6'/>
                <span className='hidden lg:inline font-medium text-lg'>Contacts</span>

            </div>
            </div>
            <div className='overflow-auto w-full py-3'>
                {users.map((user) => (
                <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-base-200 transition-colors 
                        ${selectedUser?.id === user.id ? 'bg-base-800' : ''}`}>
                    <div className='relative'>
                        <img src={user.profilePicture || ''} alt={user.name} className='size-12 object-cover rounded-full' />
                        {/* Online Indicator */ }
                        {onlineUsers.includes(user.id) && (
                            <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full'></span>
                        ) }
                        </div>
                        {/* User Name */ 
                        }
                        <div className='hidden lg:inline font-medium text-left'>{user.fullName}
                    
                        <div className='text-sm text-zinc-400 '>
                            {onlineUsers.includes(user.id) ? "Online" : "Offline" }
                                
                         </div>       
                        </div>
                </button>   

                ))}


            </div>

     </aside>
   )
 }
 
 export default Sidebar;