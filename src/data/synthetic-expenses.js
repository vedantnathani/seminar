export const makeExpenses=(planted=true)=>Array.from({length:24},(_,i)=>({id:`TX-${String(i+1).padStart(3,'0')}`,vendor:['Aster Office Supplies','Westline Logistics','Sahyadri Services','Cedar Utilities','Prism IT Services','Harbour Stationery'][i%6],invoice:`INV-${1001+i}`,date:`2026-04-${String(i+2).padStart(2,'0')}`,description:['Office stationery','Local delivery charges','Monthly service fee','Electricity for office','Software subscription','Printer consumables'][i%6],amount:2400+i*1250,gstin:`SYNTHETIC-${String(i%6+1).padStart(2,'0')}`})).map((r,i,a)=>!planted?r:i===6?{...r,invoice:a[0].invoice}:i===8||i===15?{...r,gstin:''}:i===10?{...r,date:'2026-03-31'}:i===19?{...r,date:'2026-05-01'}:i===12?{...r,description:'Urgent cash adjustment — miscellaneous'}:i===21?{...r,description:'Gift voucher — special request',amount:78000}:r);
export const defaults={start:'2026-04-01',end:'2026-04-30',threshold:50000};
export function validateSettings(settings){return /^\d{4}-\d{2}-\d{2}$/.test(settings.start)&&/^\d{4}-\d{2}-\d{2}$/.test(settings.end)&&Number.isFinite(Date.parse(settings.start))&&Number.isFinite(Date.parse(settings.end))&&settings.start<=settings.end&&Number.isFinite(settings.threshold)&&settings.threshold>=0;}
export function checkExpenses(rows,settings=defaults){
 if(!validateSettings(settings))throw new Error('Choose a valid date range and a non-negative threshold.');
 const key=r=>`${r.vendor.trim().toLowerCase()}|${r.invoice.trim().toLowerCase()}`;
 const counts=new Map();rows.forEach(r=>{if(r.invoice.trim())counts.set(key(r),(counts.get(key(r))||0)+1);});
 return rows.map(r=>{const flags=[],suggestions=[];
 if(r.invoice.trim()&&counts.get(key(r))>1)flags.push('Duplicate invoice candidate');
 if(!r.gstin.trim())flags.push('Missing GSTIN');
 if(!r.invoice.trim()||!r.vendor.trim()||!r.description.trim())flags.push('Missing mandatory field');
 if(!r.date||!Number.isFinite(Date.parse(r.date)))flags.push('Invalid invoice date');
 else if(r.date<settings.start||r.date>settings.end)flags.push('Out-of-period date');
 if(!Number.isFinite(r.amount)||r.amount<0)flags.push('Invalid amount');
 else if(r.amount>settings.threshold)suggestions.push('Amount above review threshold');
 if(/urgent|cash adjustment|miscellaneous|gift voucher|special request/i.test(r.description))suggestions.push('Keyword-based description review');
 return {...r,flags,suggestions};});
}
