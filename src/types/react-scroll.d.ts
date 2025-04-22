declare module 'react-scroll' {
  export interface ScrollLinkProps {
    activeClass?: string;
    containerId?: string;
    spy?: boolean;
    smooth?: boolean | string;
    duration?: number;
    delay?: number;
    isDynamic?: boolean;
    offset?: number;
    hashSpy?: boolean;
    onSetActive?: (to: string) => void;
    onSetInactive?: () => void;
    ignoreCancelEvents?: boolean;
    to: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    key?: string;
    [key: string]: any;
  }

  export interface LinkProps extends ScrollLinkProps {
    children: React.ReactNode;
  }

  export const Link: React.FC<LinkProps>;
  export const Events: {
    scrollEvent: {
      register: (name: string, func: (value: any) => void) => void;
      remove: (name: string) => void;
    };
  };
  export const Element: React.FC<any>;
  export const scroller: any;
  export const animateScroll: any;
} 