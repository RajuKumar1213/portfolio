"use client";

import { Button } from "@/components/ui/button";
import { MdAdminPanelSettings } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function AdminLogin() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-[350px] text-center">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <MdAdminPanelSettings className="h-6 w-6" /> Admin Access
          </CardTitle>
          <CardDescription>Sign in to manage your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <SignedOut>
              <Button className="w-full">
                <SignInButton />
              </Button>
              <Button className="w-full">
                <SignUpButton />
              </Button>
            </SignedOut>
            {isSignedIn ? (
              <SignedIn>
                <Button
                  onClick={() => router.push("/admin/dashboard")}
                  className="w-full cursor-pointer"
                >
                  <UserButton />
                </Button>
              </SignedIn>
            ) : <div className="flex items-center justify-center">
              <Spinner className="size-6"/></div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
