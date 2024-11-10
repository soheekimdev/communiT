import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

const sizeMap: Record<AvatarSize, { container: string; fallback: string }> = {
  xs: { container: 'h-8 w-8', fallback: 'text-xs' },
  sm: { container: 'h-14 w-14', fallback: 'text-xs' },
  md: { container: 'h-20 w-20', fallback: 'text-l' },
  lg: { container: 'h-32 w-32', fallback: 'text-xl' },
};

const AvatarContext = React.createContext<AvatarSize>('md');

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ size = 'md', className, ...props }, ref) => (
    <AvatarContext.Provider value={size}>
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full border-2 border-gray text-center',
          sizeMap[size].container,
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  ),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => {
  const size = React.useContext(AvatarContext);

  const displayText = React.useMemo(() => {
    if (size === 'xs' && typeof children === 'string') {
      return children.charAt(0);
    }
    return children;
  }, [children, size]);

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        sizeMap[size].fallback,
        className,
      )}
      {...props}
    >
      {displayText}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
