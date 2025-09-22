"use server";

import { signIn, signOut } from "@/auth"; // ✅ this comes from your `auth.ts` setup file

export async function loginWithGithub() {
  await signIn("github");
}

export async function logout() {
  await signOut();
}
