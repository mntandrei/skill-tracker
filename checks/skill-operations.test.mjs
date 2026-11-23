import test from "node:test";
import assert from "node:assert/strict";
import { moveSkill, removeSubSkillTree, getSkillProgress } from "../src/app/components/lib/skill-operations.ts";
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
test("deleting a subtree cannot remove another skill's nodes with colliding IDs", () => {
  const input = [
    item("root"), item("child", "root"),
    item("root", null, false, "two"), item("other-child", "root", false, "two"),
  ];
  assert.deepEqual(
    removeSubSkillTree(input, "root").map((node) => node.skillId + ":" + node.id),
    ["two:root", "two:other-child"]
  );
});
test("deleting an unknown root does not remove orphaned nodes", () => {
  const input = [item("orphan", "missing"), item("unrelated")];
  assert.deepEqual(removeSubSkillTree(input, "missing"), input);
});

test("moving skills across the list preserves the original records and supports either direction", () => {
  const skills = ["a", "b", "c"].map((id) => ({ id }));
  const moved = moveSkill(skills, "a", "c");
  assert.deepEqual(moved, [skills[1], skills[2], skills[0]]);
  assert.deepEqual(moveSkill(moved, "a", "b"), skills);
  assert.equal(moveSkill(skills, "a", "missing"), skills);
  assert.equal(moveSkill(skills, "a", "a"), skills);
});
