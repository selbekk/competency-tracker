import { SignInComponent } from "@/components/sign-in";
import { login } from "./action";

export default function SignInPage() {
  return <SignInComponent login={login} />;
}
