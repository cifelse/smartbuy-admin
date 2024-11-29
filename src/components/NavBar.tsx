import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const logAction = async (userId: string, action: string, details: object = {}) => {
  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action, details }),
    });
  } catch (error) {
    console.error('Error logging action:', error);
  }
};

export default function NavBar({ isMobile, hideButton }: Readonly<{ isMobile: boolean; hideButton?: boolean }>) {
  const handleLogout = async () => {
    // Log user logout action
    await logAction('mockUserId123', 'user_logged_out', {});
  };

  const handleNavigation = async (page: string) => {
    // Log navigation action
    await logAction('mockUserId123', 'page_navigated', { page });
  };

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" onClick={() => handleNavigation('home')}>
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">SmartBuy</h1>
          </div>
        </Link>
        <div className="flex gap-2 md:gap-4">
          {!hideButton && (
            <>
              <Link href="/login" passHref onClick={() => handleNavigation('login')}>
                <Button variant="default" size={isMobile ? 'sm' : 'default'}>
                  Log In
                </Button>
              </Link>
              <Link href="/login" passHref onClick={() => handleNavigation('be_a_seller')}>
                <Button variant="outline" size={isMobile ? 'sm' : 'default'}>
                  Be a Seller
                </Button>
              </Link>
              <Button variant="outline" size={isMobile ? 'sm' : 'default'} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
