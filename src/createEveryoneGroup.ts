import { co } from "jazz-tools";

export function createEveryoneGroup(role: "writer" | "reader" | "writeOnly") {
  const group = co.group().create();
  group.addMember("everyone", role);
  return group;
}
