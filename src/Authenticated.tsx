import { usePasskeyAuth } from "jazz-tools/react";
import { appName } from "./common";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";
import { useId } from "react";
import { Input } from "./ui/Input";

export function Authenticated({ children }: { children: React.ReactNode }) {
  const auth = usePasskeyAuth({ appName });
  const ids = {
    name: useId(),
  };

  if (auth.state === "signedIn") {
    return children;
  }

  return (
    <div className="border-t border-stone-200 h-full flex flex-col items-center justify-center">
      <div className="h-full flex flex-col gap-4 py-12 justify-evenly">
        <Button
          onClick={() => auth.logIn()}
          className="w-full justify-center text-lg"
        >
          Sign in
        </Button>
        <span className="flex gap-4 items-center">
          <span className="grow border-t border-stone-200" />
          <span className="shrink-0 text-center italic text-stone-400">or</span>
          <span className="grow border-t border-stone-200" />
        </span>
        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            await auth.signUp(formData.get("name") as string);
          }}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col">
            <label htmlFor={ids.name}>Display name</label>
            <Input
              id={ids.name}
              name="name"
              required
              placeholder="Ron Swanson"
            />
          </div>
          <Button type="submit" className="w-full justify-center text-lg">
            Create account
          </Button>
        </Form>
      </div>
    </div>
  );
}
