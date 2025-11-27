import { FormCheckbox } from "@/components/forms/FormCheckbox";
import React from "react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className='sticky top-0 z-1000 border-b border-border bg-background shadow-sm'>
      <div className='mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground'>
            L
          </div>
          <div>
            <h1 className='text-lg font-bold leading-none text-foreground'>Hanghae Company</h1>
            <p className='mt-0.5 text-[11px] leading-none text-muted-foreground'>
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className='flex items-center gap-3'>
          <FormCheckbox
            name='darkMode'
            checked={darkMode}
            onChange={setDarkMode}
            label='Dark Mode'
          />
          <div className='text-right'>
            <div className='text-sm font-semibold text-foreground'>Demo User</div>
            <div className='text-xs text-muted-foreground'>demo@example.com</div>
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-info/10 text-base font-semibold text-primary'>
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
