import { redirect } from "next/navigation";

export default async function LandingPage () {
    return redirect("/home");
}