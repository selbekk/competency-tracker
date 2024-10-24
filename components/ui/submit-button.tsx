import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import { LoadingSpinner } from "./loading-spinner";

type SubmitButtonProps = {
  loadingText?: string;
} & ButtonProps;

export function SubmitButton({
  loadingText = "Loading...",
  children,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (
        <div className="flex gap-2">
          <LoadingSpinner />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
