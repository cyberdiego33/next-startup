import Link from "next/link";
import { auth } from "@/auth";
import { loginWithGithub, logout } from "@/app/actions/auth";
import Form from "next/form";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="hover:cursor-pointer">
          <img src="/yc-logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="hover:cursor-pointer">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <Form action={logout}>
                <button type="submit" className="hover:cursor-pointer">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </Form>
              <Link href={`/user/${session.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Form action={loginWithGithub}>
              <button type="submit" className="hover:cursor-pointer">
                Login
              </button>
            </Form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
