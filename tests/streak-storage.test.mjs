import test from "node:test";
import assert from "node:assert/strict";
import {getStreak,increaseStreak,STREAK_COOLDOWN_MS,STREAK_EXPIRY_MS} from "../src/app/components/lib/streak-storage.ts";
const data=new Map();
globalThis.window={dispatchEvent(){}};
globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
test("each skill has an independent streak and a 24-hour cooldown",()=>{
  const orig=Date.now; let time=100000000; Date.now=()=>time;
  try {
    assert.equal(increaseStreak("react"),true);
    assert.equal(increaseStreak("js"),true);
    assert.equal(increaseStreak("react"),false);
    time+=STREAK_COOLDOWN_MS+1;
    assert.equal(increaseStreak("react"),true);
    assert.equal(getStreak("react").count,2);
    assert.equal(getStreak("js").count,1);
  } finally {Date.now=orig;}
});
test("streak expires after 48 hours",()=>{
  data.clear(); const orig=Date.now; let time=100000000; Date.now=()=>time;
  try {
    increaseStreak("css"); time+=STREAK_EXPIRY_MS;
    assert.equal(getStreak("css").count,0);
  } finally {Date.now=orig;}
});