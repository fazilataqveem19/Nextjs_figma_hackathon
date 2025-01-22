import { CartProvider } from "@/components/shared/cartContext";
import { WishlistProvider } from "@/components/shared/wishlistContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
