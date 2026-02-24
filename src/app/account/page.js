import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Guest area",
};
async function page() {
  const session = await auth();
  console.log(session);
 

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome  {session.user.name}
      </h2>
      <p>{session.user.email}</p>
    </>
  );
}

export default page;
