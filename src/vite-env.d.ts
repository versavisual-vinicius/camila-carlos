/// <reference types="vite/client" />

declare module "react-responsive-masonry" {
  import * as React from "react";

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: Record<number, number>;
    children?: React.ReactNode;
  }

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    children?: React.ReactNode;
    className?: string;
  }

  export const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;
  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}
