import { SignUpComponent } from "@/components/sign-up";
import { signup } from "./action";

export default function SignUpPage() {
  return <SignUpComponent signup={signup} />;
}
