import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js';
import { themes } from '../constants/themes.js';

const preview_messages = [
  {id:1, content: "Hey! Welcome to the Settings Page.", isSent: false},
  {id:2, content: "Here you can customize your preferences.", isSent: true},
];

const SettingsPage = () => {
  const {theme, setTheme} = useThemeStore();
  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
      <div className='space-y-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-semibold'>Theme</h1>
          <p className='text-sm text-base-content/70'>Choose a theme for your application</p>
        </div>
        <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8'>
          {themes.map((thm) => (
            <button
            key={thm}
            className={`border-4 rounded-lg p-2 m-2 hover:scale-105 transition-transform ${theme === thm ? 'border-primary' : 'border-transparent'}`}
            onClick={() => setTheme(thm)}
            >
              <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={thm}>
                <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                  <div className='rounded bg-primary'></div>
                  <div className='rounded bg-secondary'></div>
                  <div className='rounded bg-accent'></div>
                  <div className='rounded bg-neutral'></div>
                </div>
              </div>
              <span className='text-[11px] font-medium truncate w-full text-center'>
                {thm.charAt(0).toUpperCase() + thm.slice(1)}
              </span>

            </button>
          ))}
        </div>
   {/* Preview Section */}
<h3 className='text-lg font-semibold mb-2'>Preview</h3>
<div className='border rounded-lg p-4 space-y-4 bg-base-200'>
  <div className='max-w-lg mx-auto'>
    {/* Chat UI Container */}
    <div className='bg-base-100 rounded-xl shadow-sm overflow-hidden'>
      {/* Chat Header */}
      <div className='bg-primary text-primary-content p-4 flex items-center space-x-3'>
        {/* J Icon */}
        <div className='bg-base-100 text-primary font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow'>
          J
        </div>
        <div>
          <h2 className='font-medium text-sm'>John Doe</h2>
          <p className='text-xs text-base-content/70 text-black'>Online</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className='p-4 space-y-3'>
        {preview_messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.isSent ? 'bg-primary text-primary-content' : 'bg-base-300 text-base-content'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note with Border */}
      <div className='border-t text-center text-xs text-base-content/50 p-2'>
        This is a preview
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  )
}

export default SettingsPage