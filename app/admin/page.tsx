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
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { apiPost } from "@/lib/api";
import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";

export default function AdminLogin() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  // get the user with this ckerkId, if prest then not create user api,

  const { data: existingUser } = useApi(
    `/api/user/get-user?clerkId=${user?.id}`
  );

  const handleUserCreateAndRedirect = () => {
    if (isSignedIn && user) {
      if (existingUser) {
        router.push("/admin/dashboard");
      } else {
        apiPost("/api/user/create", {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
          username: user.firstName,
          imageUrl: user.imageUrl,
        });
      }
    }
  };

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
                  onClick={handleUserCreateAndRedirect}
                  className="w-full cursor-pointer"
                >
                  <UserButton />
                </Button>
                <Button>
                  <SignOutButton />
                </Button>
              </SignedIn>
            ) : (
              !isLoaded && (
                <div className="flex items-center justify-center">
                  <Spinner className="size-6" />
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
