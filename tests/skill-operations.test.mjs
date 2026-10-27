import test from "node:test";
import assert from "node:assert/strict";
import { removeSubSkillTree, getSkillProgress } from "../src/app/components/lib/skill-operations.ts";
const item = (id, parentSubSkillId = null, studied = false, skillId = "one") => ({id, parentSubSkillId, studied, skillId, name:id, icon:"code", description:"", x:0, y:0});
test("deleting a parent deletes its descendants but keeps independent nodes", () => {
  const input = [item("root"),item("child","root"),item("grandchild","child"),item("other")];
  assert.deepEqual(removeSubSkillTree(input,"root").map(x=>x.id),["other"]);
  assert.equal(input.length,4);
});
test("progress is scoped to the selected skill", () => {
  const input=[item("a",null,true),item("b"),item("c",null,true,"two")];
  assert.equal(getSkillProgress(input,"one"),50);
  assert.equal(getSkillProgress(input,"two"),100);
  assert.equal(getSkillProgress(input,"none"),0);
});