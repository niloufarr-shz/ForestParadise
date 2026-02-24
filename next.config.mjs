/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "obdkggrjpiprsbhrqsrx.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  /* output: "export",
   images: {
    // این بخش خیلی مهم است: می‌گوییم از لودر سفارشی استفاده کن
    loader: 'custom',
    // آدرس فایلی که در مرحله بعد می‌سازیم
    loaderFile: './my-loader.ts', 
  }, */
};

export default nextConfig;