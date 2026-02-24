// app/account/layout.js
import SideNavigation from "../_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    // flex-row: باعث می‌شود منو و محتوا همیشه کنار هم باشند
    <div className="flex flex-row min-h-screen bg-primary-950">
      
      {/* سایدبار: عرض ثابت دارد و در موبایل و دسکتاپ یکسان است */}
      <SideNavigation />
      
      {/* بخش محتوا: فضای باقی‌مانده را پر می‌کند */}
      <div className="flex-1 overflow-y-auto py-1 md:py-8 px-4 md:px-12">
        {children}
      </div>
    </div>
  );
}