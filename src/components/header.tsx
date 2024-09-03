'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="flex h-16 w-full items-center gap-2 border-b px-6">
      <h1 className="text-xl font-bold">Layer Compare Tool</h1>
      <div className="text-foreground/50">by David Inga</div>
      <div className="flex flex-1 items-center justify-end">
        <a
          href="https://github.com/davidsingal/layer-compare-tool"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          Github
        </a>
      </div>
    </header>
  );
};

export default Header;
