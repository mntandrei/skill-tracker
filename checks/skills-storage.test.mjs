import test from "node:test";
import assert from "node:assert/strict";
import {getSelectedSkillId,saveSelectedSkillId,getSkills,getSubSkills} from "../src/app/components/lib/skills-storage.ts";
const data=new Map();
globalThis.window={dispatchEvent(){}};
globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
test("invalid JSON cannot crash loading",()=>{
 data.set("skills","{");data.set("subSkills","{");
 const original=console.error;console.error=()=>{};
 try {assert.deepEqual(getSkills(),[]);assert.deepEqual(getSubSkills(),[]);}
 finally {console.error=original;}
});
test("invalid entries are ignored and valid entries remain",()=>{
 data.set("skills",JSON.stringify([{id:"a",name:"JS",icon:"code"},{id:4,name:"wrong",icon:"code"}]));
 assert.equal(getSkills().length,1);
 data.set("subSkills",JSON.stringify([{id:"x",skillId:"a",name:"Hooks",icon:"code",studied:false},{id:"bad",skillId:"a",name:"Bad",icon:"code",studied:"yes"}]));
 assert.equal(getSubSkills().length,1);
});
test("selected skill is saved and cleared", () => {
 data.clear();
 saveSelectedSkillId("skill-one");
 assert.equal(getSelectedSkillId(),"skill-one");
 saveSelectedSkillId(null);
 assert.equal(getSelectedSkillId(),null);
});
test("blocked browser storage does not crash selected skill handling", () => {
 const originalStorage=globalThis.localStorage;
 const originalError=console.error;
 globalThis.localStorage={getItem(){throw new Error("Blocked");},setItem(){throw new Error("Blocked");},removeItem(){throw new Error("Blocked");}};
 console.error=()=>{};
 try {
  assert.equal(getSelectedSkillId(),null);
  assert.doesNotThrow(()=>saveSelectedSkillId("one"));
  assert.doesNotThrow(()=>saveSelectedSkillId(null));
 } finally {
  globalThis.localStorage=originalStorage;
  console.error=originalError;
 }
});
