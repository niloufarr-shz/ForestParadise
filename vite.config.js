import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // این خط را اضافه کنید

export default defineConfig({
  plugins: [
    tailwindcss(), // این خط را به آرایه پلاگین‌ها اضافه کنید
  ],
});
