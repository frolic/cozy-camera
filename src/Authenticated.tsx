import { usePasskeyAuth } from "jazz-tools/react";
import { Layout } from "./Layout";
import { appName } from "./common";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";
import { useId } from "react";

export function Authenticated({ children }: { children: React.ReactNode }) {
  const auth = usePasskeyAuth({ appName });
  const ids = {
    name: useId(),
  };

  if (auth.state === "signedIn") {
    return children;
  }

  return (
    <Layout>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4">
          <Button onClick={() => auth.logIn()}>Sign in</Button>
          <span className="text-center italic text-neutral-500">or</span>
          <Form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              await auth.signUp(formData.get("name") as string);
            }}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col">
              <label htmlFor={ids.name}>Your name</label>
              <input
                id={ids.name}
                name="name"
                required
                className="rounded leading-7 px-2 border-2 border-neutral-300"
              />
            </div>
            <Button type="submit">Create account</Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
