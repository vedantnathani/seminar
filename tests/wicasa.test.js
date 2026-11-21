import test from 'node:test';
import assert from 'node:assert/strict';
import {scenes as original} from '../src/data/presentation-content.js';
import {createWicasa} from '../src/data/wicasa-content.js';
test('WICASA keeps the first seminar intact and provides a complete 105-minute running order',()=>{
 const {scenes,chapters}=createWicasa(original);
 assert.equal(original.length,28);
 assert.equal(chapters.reduce((n,c)=>n+c[2],0),105);
 assert.ok(Math.abs(scenes.reduce((n,s)=>n+s.duration,0)-105)<1e-8);
 assert.equal(scenes.filter(s=>['wc-learn','wc-generate','wc-memory'].includes(s.type)).length,3);
 assert.ok(scenes.every(s=>s.notes&&s.takeaway&&s.transition&&s.duration>0));
 assert.ok(!scenes.some(s=>['story','showcase','workbench','testing','before-after','demo-intro','build-steps','llm'].includes(s.type)));
 const at=t=>scenes.findIndex(s=>s.type===t);
 assert.ok(at('wc-speakers')<at('wc-fetcher'));
 assert.ok(at('wc-fetcher')<at('wc-venn'));
 assert.ok(at('wc-agents')<at('wc-learn'));
 assert.ok(at('wc-memory')<at('wc-live'));
 assert.ok(at('wc-live')<at('opportunities'));
});
