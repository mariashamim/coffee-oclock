'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/lib/cart';
import CartDrawer from './CartDrawer';
import CartToast from './CartToast';
import ItemCustomizer from './ItemCustomizer';

// Cart state plus the UI that floats above every page: drawer, drink customizer and toast.
export default function CartRoot({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <ItemCustomizer />
      <CartToast />
    </CartProvider>
  );
}
