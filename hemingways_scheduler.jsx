import { useState, useEffect, useRef } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Cinzel:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(196,118,42,.4)}50%{box-shadow:0 0 0 10px rgba(196,118,42,0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
.fu{animation:fadeUp .4s ease both}
.fu1{animation:fadeUp .4s .05s ease both}
.fu2{animation:fadeUp .4s .10s ease both}
.fu3{animation:fadeUp .4s .15s ease both}
.fu4{animation:fadeUp .4s .20s ease both}
.fu5{animation:fadeUp .4s .25s ease both}
.ndot{width:7px;height:7px;background:#E05252;border-radius:50%;animation:glow 2s infinite;display:inline-block}
.ai-btn{background:linear-gradient(135deg,#C4762A 0%,#D4A843 50%,#C4762A 100%);background-size:200% auto;color:#0C0705;border:none;border-radius:9px;padding:10px 16px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;cursor:pointer;width:100%;transition:all .3s}
.ai-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(196,118,42,.45);animation:shimmer 1.5s linear infinite}
.ai-btn:disabled{animation:none;opacity:.65;cursor:not-allowed;transform:none}
.rscroll{overflow-x:auto;overflow-y:auto;max-height:460px}
.rscroll::-webkit-scrollbar{width:4px;height:4px}
.rscroll::-webkit-scrollbar-thumb{background:rgba(212,168,67,.3);border-radius:3px}
.rtable{border-collapse:collapse;white-space:nowrap;min-width:100%}
.scell{min-width:34px;width:34px;height:26px;text-align:center;vertical-align:middle;font-size:8px;font-weight:700;cursor:pointer;transition:transform .15s,z-index 0s;position:relative;border:1px solid rgba(255,255,255,.04)}
.scell:hover{transform:scale(1.35);z-index:50;box-shadow:0 3px 10px rgba(0,0,0,.5)}
.nm-cell{position:sticky;left:0;z-index:20;background:#0C0705;border-right:2px solid rgba(212,168,67,.15);min-width:148px;width:148px;padding:0 10px;font-size:10px;font-weight:500;color:rgba(255,255,255,.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rl-cell{position:sticky;left:148px;z-index:20;background:#0C0705;border-right:1px solid rgba(212,168,67,.08);min-width:80px;width:80px;padding:0 8px;font-size:9px;color:rgba(255,255,255,.35);white-space:nowrap}
.no-cell{position:sticky;left:228px;z-index:20;background:#0C0705;border-right:2px solid rgba(212,168,67,.15);width:26px;min-width:26px;text-align:center;font-size:9px;color:rgba(255,255,255,.25)}
.dh-cell{min-width:34px;width:34px;height:36px;text-align:center;vertical-align:middle;border:1px solid rgba(255,255,255,.04);padding:2px 0;cursor:default}
.hdr-nm{position:sticky;left:0;top:0;z-index:30;background:#090603;min-width:148px;width:148px;padding:0 10px;font-size:8px;letter-spacing:.08em;color:rgba(212,168,67,.5);font-weight:600;text-transform:uppercase}
.hdr-rl{position:sticky;left:148px;top:0;z-index:30;background:#090603;min-width:80px;width:80px;padding:0 8px;font-size:8px;letter-spacing:.08em;color:rgba(212,168,67,.5);font-weight:600;text-transform:uppercase}
.hdr-no{position:sticky;left:228px;top:0;z-index:30;background:#090603;width:26px;min-width:26px;font-size:8px;color:rgba(212,168,67,.5);font-weight:600;text-align:center}
.sec-hdr td{background:rgba(212,168,67,.07);border-top:1px solid rgba(212,168,67,.18);border-bottom:1px solid rgba(212,168,67,.1)}
.sec-sticky{position:sticky;left:0;z-index:15;background:inherit;padding:0 8px}
.cal-day{border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5px 3px;cursor:pointer;transition:transform .15s;min-height:52px}
.cal-day:hover{transform:scale(1.04);z-index:5;position:relative}
.tab-btn{padding:6px 16px;border-radius:7px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.04em;transition:all .2s}
.tgl-wrap{border-radius:50px;padding:3px;display:inline-flex;gap:2px}
.tgl-btn{padding:7px 18px;border-radius:50px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.05em;text-transform:uppercase;transition:all .25s}
.card-d{background:rgba(255,255,255,.04);border:1px solid rgba(212,168,67,.17);border-radius:12px}
.card-l{background:rgba(255,255,255,.82);border:1px solid rgba(196,118,42,.14);border-radius:12px}
.act-btn{border-radius:9px;padding:11px 12px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:4px;width:100%}
.act-btn:hover{transform:translateY(-2px);box-shadow:0 5px 14px rgba(92,61,42,.14)}
.tot-nm{position:sticky;left:0;z-index:20;background:#0A0806;border-right:2px solid rgba(212,168,67,.15);min-width:148px;width:148px;padding:0 10px;font-size:9px;font-weight:700;color:rgba(212,168,67,.7);white-space:nowrap}
.tot-rl{position:sticky;left:148px;z-index:20;background:#0A0806;border-right:1px solid rgba(212,168,67,.08);min-width:80px;width:80px}
.tot-no{position:sticky;left:228px;z-index:20;background:#0A0806;border-right:2px solid rgba(212,168,67,.15);width:26px;min-width:26px}
.tot-cell{height:24px;text-align:center;vertical-align:middle;font-size:9px;font-weight:700;border:1px solid rgba(255,255,255,.03)}
`;

const SH = {
  A:    {s:'A',    bg:'#1C3828',txt:'#7ED4A7',bd:'#3CAF7D',lbl:'A Shift',      t:'7:00–15:00'},
  B:    {s:'B',    bg:'#18284A',txt:'#7BAFD4',bd:'#4A8BC4',lbl:'B Shift',      t:'15:30–23:00'},
  C:    {s:'C',    bg:'#181230',txt:'#9B8AD4',bd:'#6B5AB4',lbl:'C Shift',      t:'23:00–7:00'},
  ATL:  {s:'ATL',  bg:'#382208',txt:'#EAC86A',bd:'#D4A843',lbl:'A Team Ldr',   t:'7:00–15:00'},
  BTL:  {s:'BTL',  bg:'#081E3C',txt:'#6AB0D4',bd:'#2A7ABB',lbl:'B Team Ldr',   t:'15:30–23:00'},
  BPLC: {s:'BPLC', bg:'#462000',txt:'#FF9A50',bd:'#C45A00',lbl:'B Le Petit',   t:'Event'},
  LPC:  {s:'LPC',  bg:'#381600',txt:'#FF7A30',bd:'#A04000',lbl:'Le Petit',     t:'Event'},
  OPNG: {s:'OPNG', bg:'#082C1C',txt:'#50D4A0',bd:'#20A070',lbl:'Opening',      t:'6:00–14:00'},
  OT:   {s:'OT',   bg:'#380808',txt:'#FF8080',bd:'#C04040',lbl:'Overtime',      t:'Extended'},
  AL:   {s:'AL',   bg:'#083410',txt:'#70D480',bd:'#30B050',lbl:'Annual Leave', t:'—'},
  PH:   {s:'PH',   bg:'#342C00',txt:'#EACC50',bd:'#B09A20',lbl:'Public Hol.',  t:'—'},
  CL:   {s:'CL',   bg:'#280838',txt:'#C080E0',bd:'#8040C0',lbl:'Comp. Leave',  t:'—'},
  ML:   {s:'ML',   bg:'#380820',txt:'#E080B0',bd:'#C04080',lbl:'Mat. Leave',   t:'—'},
  AHST: {s:'AHST', bg:'#38082C',txt:'#E070C0',bd:'#B03090',lbl:'A Hostess',    t:'7:00–15:00'},
  BHST: {s:'BHST', bg:'#1C083C',txt:'#A070D4',bd:'#7040B0',lbl:'B Hostess',    t:'15:30–23:00'},
  ABAR: {s:'ABAR', bg:'#382400',txt:'#D4A843',bd:'#9A7820',lbl:'A Bar',        t:'7:00–15:00'},
  BBAR: {s:'BBAR', bg:'#00182C',txt:'#50A0C0',bd:'#207090',lbl:'B Bar',        t:'15:30–23:00'},
  ME:   {s:'ME',   bg:'#002C2C',txt:'#50C0C0',bd:'#208080',lbl:'M & E',        t:'Varies'},
  OFF:  {s:'—',    bg:'#090604',txt:'#2A2020',bd:'#1A0E08',lbl:'Day Off',      t:'—'},
};

const DOW = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
const MAY_START = 4;
const DAYS = 31;
const TODAY = 8;

function dow(day) { return (MAY_START + day - 1) % 7; }
function isWeekend(day) { const d = dow(day); return d === 5 || d === 6; }
function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
function gen(pat, seed, lpc = 0) {
  const r = rng(seed); const off = Math.floor(r() * pat.length);
  return Array.from({length: DAYS}, (_, i) => {
    const v = r();
    if (v < .04) return 'AL';
    if (v < .045) return 'OT';
    if (v < .045 + lpc) return 'BPLC';
    return pat[(i + off) % pat.length];
  });
}

const GROUPS = [
  { sec:'LEADERS', col:'#D4A843', members:[
    {id:1, no:2,  name:'Barnett Juma',     role:'SNR Supervisor',  sch:gen(['ATL','ATL','A','A','OFF','OFF','A'],1)},
    {id:2, no:10, name:'Benard Muriithi',  role:'F&B Supervisor',  sch:gen(['A','BTL','B','B','OFF','OFF','B'],2)},
    {id:3, no:'', name:'Jacline Ndanu',    role:'F&B Supervisor',  sch:gen(['BTL','B','B','B','OFF','OFF','B'],3)},
    {id:4, no:4,  name:'Alice Nthewa',     role:'F&B Supervisor',  sch:gen(['ATL','A','A','OFF','OFF','A','A'],4)},
    {id:5, no:9,  name:'Norine Nalaka',    role:'GMT',             sch:gen(['A','A','A','OFF','OFF','A','A'],5)},
  ]},
  { sec:'M & E', col:'#50C0C0', members:[
    {id:6, no:15, name:'Janet Methu',      role:'M&E Coordinator', sch:gen(['ME','ME','ME','ME','OFF','OFF','ME'],6)},
  ]},
  { sec:'HOSTESSES', col:'#E070C0', members:[
    {id:7, no:5,  name:'Felistus Wambui',  role:'Hostess',         sch:gen(['AHST','AHST','BHST','OFF','OFF','AHST','BHST'],7)},
    {id:8, no:4,  name:'Alice Nthewa Jr.', role:'Hostess',         sch:gen(['BHST','AHST','OFF','OFF','AHST','BHST','AHST'],8)},
  ]},
  { sec:'SERVICE', col:'#7BAFD4', members:[
    {id:9,  no:15, name:'Peter Mwengi',    role:'Waiter',   sch:gen(['B','A','A','B','A','OFF','OFF'],9)},
    {id:10, no:'', name:'Melbridge Nduta', role:'Waitress', sch:gen(['A','OFF','OFF','A','A','B','B'],10)},
    {id:11, no:13, name:'Martina Mwangi',  role:'Waitress', sch:gen(['B','B','A','OFF','OFF','A','B'],11)},
    {id:12, no:'', name:'Ned Gelse',       role:'Waiter',   sch:gen(['A','A','B','B','OFF','OFF','A'],12)},
    {id:13, no:10, name:'Calser Mriti',    role:'Waiter',   sch:gen(['B','B','OFF','OFF','B','A','A'],13)},
    {id:14, no:'', name:'Teresa Njoki',    role:'Waitress', sch:gen(['A','B','OFF','OFF','A','A','B'],14)},
    {id:15, no:'', name:'Lewis Muthama',   role:'Waiter',   sch:gen(['OFF','OFF','A','A','B','B','A'],15)},
    {id:16, no:11, name:'Isaac Nyamagera', role:'Waiter',   sch:gen(['B','B','B','A','OFF','OFF','A'],16)},
    {id:17, no:8,  name:'Dan Dichinga',    role:'Waiter',   sch:gen(['A','A','A','OFF','OFF','B','B'],17)},
    {id:18, no:6,  name:'Victor Mwenowa',  role:'Waiter',   sch:gen(['B','OFF','OFF','A','A','A','B'],18)},
    {id:19, no:17, name:'Newton Akunga',   role:'Waiter',   sch:gen(['ATL','A','OFF','OFF','A','B','B'],19)},
    {id:20, no:'', name:'John Otieno',     role:'Waiter',   sch:gen(['A','B','B','A','OFF','OFF','A'],20)},
    {id:21, no:14, name:'Milton Orello',   role:'Waiter',   sch:gen(['OFF','OFF','B','B','A','A','B'],21)},
    {id:22, no:14, name:'Abigael Mwende',  role:'Waitress', sch:gen(['BPLC','B','A','OFF','OFF','B','A'],22,.05)},
    {id:23, no:'', name:'Brian Owino',     role:'Waiter',   sch:gen(['A','A','OFF','OFF','B','B','A'],23)},
    {id:24, no:13, name:'Derrick Adwagi',  role:'Waiter',   sch:gen(['B','OFF','OFF','B','B','A','A'],24)},
    {id:25, no:'', name:'Sharlene Ndungu', role:'Waitress', sch:gen(['A','A','B','OFF','OFF','A','B'],25)},
    {id:26, no:'', name:'Maurice Keha.',   role:'Waitress', sch:gen(['B','B','A','A','OFF','OFF','B'],26)},
    {id:27, no:'', name:'Felix Lumibaso',  role:'Waiter',   sch:gen(['A','OFF','OFF','A','B','B','A'],27)},
    {id:28, no:'', name:'Patrick Njoki',   role:'Waiter',   sch:gen(['B','A','A','OFF','OFF','B','A'],28)},
    {id:29, no:9,  name:'Gibson Kyalo',    role:'Waiter',   sch:gen(['A','A','B','B','A','OFF','OFF'],29)},
  ]},
  { sec:'INTERNS', col:'#9B8AD4', members:[
    {id:30, no:'', name:'Hopeful Wambui',  role:'Intern',   sch:gen(['BPLC','A','A','OFF','OFF','B','B'],30,.06)},
    {id:31, no:'', name:'Elijah Maingi',   role:'Intern',   sch:gen(['A','OFF','OFF','A','A','B','B'],31)},
    {id:32, no:'', name:'Brandy Nicole',   role:'Intern',   sch:gen(['B','B','A','OFF','OFF','A','B'],32)},
    {id:33, no:'', name:'Hannah Wangari',  role:'Intern',   sch:gen(['A','A','OFF','OFF','B','B','A'],33)},
    {id:34, no:'', name:'Seda Ocheng',     role:'Intern',   sch:gen(['B','A','A','A','OFF','OFF','B'],34)},
  ]},
  { sec:'CASUALS', col:'#FF9A50', members:[
    {id:35, no:'', name:'Hezborn',         role:'Casual',   sch:gen(['A','A','B','OFF','OFF','A','B'],35)},
    {id:36, no:'', name:'Faith',           role:'Casual',   sch:gen(['B','B','OFF','OFF','A','A','B'],36)},
    {id:37, no:'', name:'Brenda',          role:'Casual',   sch:gen(['A','OFF','OFF','A','B','B','A'],37)},
  ]},
  { sec:'BAR TEAM', col:'#C4762A', members:[
    {id:38, no:13, name:'Simon Karanja',   role:'Bar Man',  sch:gen(['ABAR','ABAR','BBAR','OFF','OFF','BBAR','ABAR'],38)},
    {id:39, no:15, name:'Wayne Waithaka',  role:'Bar Man',  sch:gen(['BBAR','OFF','OFF','BBAR','ABAR','ABAR','BBAR'],39)},
    {id:40, no:20, name:'Phelly Lumbasi',  role:'Bar Lady', sch:gen(['ABAR','BBAR','ABAR','OFF','OFF','ABAR','BBAR'],40)},
    {id:41, no:'', name:'Irene Mwende',    role:'Bar Lady', sch:gen(['BBAR','ABAR','OFF','OFF','BBAR','ABAR','ABAR'],41)},
    {id:42, no:'', name:'Kipkirui',        role:'Glass Hand',sch:gen(['ABAR','OFF','OFF','ABAR','BBAR','ABAR','BBAR'],42)},
    {id:43, no:13, name:'Samuel Mutua',    role:'Bar Man',  sch:gen(['OFF','OFF','BBAR','ABAR','ABAR','BBAR','OFF'],43)},
  ]},
];

const GRACE_SCH = gen(['A','A','A','A','OFF','OFF','A'], 99);

function dailyCounts(key) {
  return Array.from({length:DAYS},(_,i)=>GROUPS.flatMap(g=>g.members).filter(m=>m.sch[i]===key).length);
}
const TOT_A    = dailyCounts('A');
const TOT_B    = dailyCounts('B');
const TOT_BPLC = dailyCounts('BPLC');
const TOT_OFF  = dailyCounts('OFF');

const OCC = [62,55,48,78,85,92,88,71,65,58,82,89,95,90,74,68,62,56,80,87,93,91,78,70,64,58,84,91,88,75,68];
const occColor = o => o<60?'#4CAF7D':o<80?'#D4A843':'#E05252';

export default function HemingwaysScheduler() {
  const [view,     setView]     = useState('admin');
  const [aTab,     setATab]     = useState('roster');
  const [sTab,     setSTab]     = useState('month');
  const [genning,  setGenning]  = useState(false);
  const [genDone,  setGenDone]  = useState(false);
  const [selDay,   setSelDay]   = useState(TODAY);
  const [selStaff, setSelStaff] = useState(null);
  const [barsVis,  setBarsVis]  = useState(false);

  useEffect(()=>{
    setBarsVis(false);
    const t = setTimeout(()=>setBarsVis(true),350);
    return ()=>clearTimeout(t);
  },[aTab]);

  const doGen = () => {
    setGenning(true); setGenDone(false);
    setTimeout(()=>{ setGenning(false); setGenDone(true); }, 2200);
  };

  const S = code => SH[code] || SH.OFF;

  // ── HEADER ────────────────────────────────────────────────────────────────
  const Header = () => (
    <header style={{padding:'0 24px',height:62,display:'flex',alignItems:'center',justifyContent:'space-between',
      borderBottom:`1px solid ${view==='admin'?'rgba(212,168,67,.13)':'rgba(196,118,42,.15)'}`,
      background:view==='admin'?'rgba(0,0,0,.35)':'rgba(255,248,240,.7)',backdropFilter:'blur(8px)',
      position:'sticky',top:0,zIndex:100}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:34,height:34,background:'linear-gradient(135deg,#C4762A,#D4A843)',
          borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:15,fontFamily:"'Cinzel',serif",color:'#0C0705',fontWeight:600}}>H</div>
        <div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:12,fontWeight:600,
            color:view==='admin'?'#D4A843':'#7A4A10',letterSpacing:'.1em'}}>HEMINGWAYS</div>
          <div style={{fontSize:9,color:view==='admin'?'rgba(255,255,255,.28)':'#8B6B52',
            letterSpacing:'.12em',textTransform:'uppercase'}}>Nairobi · Staff Scheduler</div>
        </div>
      </div>
      <div className="tgl-wrap" style={{background:view==='admin'?'rgba(255,255,255,.06)':'rgba(92,61,42,.08)'}}>
        {['admin','staff'].map(v=>{
          const active = view===v;
          return <button key={v} className="tgl-btn" onClick={()=>setView(v)} style={{
            background:active?(view==='admin'?'rgba(212,168,67,.18)':'rgba(196,118,42,.15)'):'transparent',
            color:active?(view==='admin'?'#D4A843':'#7A4A10'):(view==='admin'?'rgba(255,255,255,.3)':'rgba(92,61,42,.45)'),
            textTransform:'uppercase',letterSpacing:'.08em'
          }}>{v}</button>;
        })}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:9}}>
        {view==='admin'&&<div style={{position:'relative',cursor:'pointer',width:32,height:32,
          borderRadius:'50%',background:'rgba(255,255,255,.06)',display:'flex',alignItems:'center',
          justifyContent:'center',fontSize:14}}>
          🔔
          <div className="ndot" style={{position:'absolute',top:6,right:6}}/>
        </div>}
        <div style={{width:32,height:32,background:view==='admin'?'linear-gradient(135deg,#3D2810,#5A3C1C)':'linear-gradient(135deg,#E8C99A,#D4A843)',
          borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:11,fontWeight:700,color:view==='admin'?'#D4A843':'#4A2C0A'}}>{view==='admin'?'BJ':'GW'}</div>
        <div>
          <div style={{fontSize:11,fontWeight:500,color:view==='admin'?'rgba(255,255,255,.8)':'#2C1810'}}>
            {view==='admin'?'Barnett Juma':'Grace Wanjiku'}
          </div>
          <div style={{fontSize:9,color:view==='admin'?'rgba(255,255,255,.32)':'#8B6B52'}}>
            {view==='admin'?'SNR Supervisor':'F/O Supervisor'}
          </div>
        </div>
      </div>
    </header>
  );

  // ── AI PANEL ──────────────────────────────────────────────────────────────
  const AIPanel = () => (
    <div className="card-d" style={{padding:'14px 16px'}}>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:600,color:'#D4A843',
        letterSpacing:'.04em',marginBottom:10}}>AI Roster Engine</div>
      <div style={{display:'flex',flexDirection:'column',gap:5,marginBottom:12}}>
        {[['OPERA Cloud','Live'],['Sage 300 HR','Synced'],['Leave Records','Synced'],['Compliance Rules','Active']].map(([l,s])=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:10,color:'rgba(255,255,255,.4)'}}>{l}</span>
            <span style={{fontSize:9,fontWeight:600,color:'#7ED4A7',background:'rgba(76,175,125,.12)',
              padding:'2px 7px',borderRadius:4}}>{s}</span>
          </div>
        ))}
      </div>
      <button className="ai-btn" onClick={doGen} disabled={genning}>
        {genning
          ? <span style={{display:'flex',alignItems:'center',gap:7,justifyContent:'center'}}>
              <span style={{width:10,height:10,border:'2px solid rgba(0,0,0,.3)',borderTopColor:'#0C0705',
                borderRadius:'50%',display:'inline-block',animation:'spin .7s linear infinite'}}/>
              Generating roster…
            </span>
          : '✦ Generate AI Roster'}
      </button>
      {genDone&&<div style={{fontSize:9,color:'#7ED4A7',textAlign:'center',marginTop:5,letterSpacing:'.04em'}}>
        ✓ Roster generated for June 2026
      </div>}
    </div>
  );

  // ── ROSTER TABLE ──────────────────────────────────────────────────────────
  const RosterTable = () => (
    <div className="rscroll">
      <table className="rtable">
        <thead>
          <tr>
            <th className="hdr-nm">STAFF NAME</th>
            <th className="hdr-rl">ROLE</th>
            <th className="hdr-no">#</th>
            {Array.from({length:DAYS},(_,i)=>{
              const d=i+1, dw=dow(d), we=isWeekend(d), isT=d===TODAY;
              return <th key={d} className="dh-cell" style={{
                background:isT?'rgba(212,168,67,.15)':we?'rgba(255,255,255,.02)':'transparent',
                borderBottom:isT?'2px solid rgba(212,168,67,.6)':'1px solid rgba(255,255,255,.04)'}}>
                <div style={{fontSize:8,fontWeight:700,letterSpacing:'.04em',
                  color:isT?'#EAC86A':we?'rgba(255,255,255,.3)':'rgba(255,255,255,.2)'}}>{DOW[dw].slice(0,1)}</div>
                <div style={{fontSize:11,fontWeight:isT?700:500,fontFamily:"'Cormorant Garamond',serif",
                  color:isT?'#EAC86A':we?'rgba(255,255,255,.45)':'rgba(255,255,255,.55)'}}>{d}</div>
                {isT&&<div style={{width:4,height:4,background:'#EAC86A',borderRadius:'50%',margin:'1px auto 0'}}/>}
              </th>;
            })}
            <th style={{position:'sticky',top:0,zIndex:10,background:'#090603',minWidth:26,width:26,
              fontSize:8,color:'rgba(212,168,67,.5)',fontWeight:600,textAlign:'center'}}>A</th>
            <th style={{position:'sticky',top:0,zIndex:10,background:'#090603',minWidth:26,width:26,
              fontSize:8,color:'rgba(212,168,67,.5)',fontWeight:600,textAlign:'center'}}>B</th>
          </tr>
        </thead>
        <tbody>
          {GROUPS.map((grp,gi)=>(
            <React.Fragment key={`g${gi}`}>
              <tr className="sec-hdr">
                <td className="sec-sticky" style={{color:grp.col}}>
                  <span style={{borderLeft:`3px solid ${grp.col}`,paddingLeft:7,fontSize:9,
                    fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase'}}>{grp.sec}</span>
                </td>
                <td/><td/>
                {Array.from({length:DAYS+2},(_,i)=><td key={i}/>)}
              </tr>
              {grp.members.map((m,mi)=>{
                const shade=mi%2===1, active=selStaff===m.id;
                const aC=m.sch.filter(s=>s==='A'||s==='ATL').length;
                const bC=m.sch.filter(s=>s==='B'||s==='BTL').length;
                return (
                  <tr key={m.id} style={{background:active?'rgba(212,168,67,.08)':shade?'rgba(255,255,255,.015)':'transparent',
                    cursor:'pointer'}} onClick={()=>setSelStaff(selStaff===m.id?null:m.id)}>
                    <td className="nm-cell" style={{color:active?'#EAC86A':'rgba(255,255,255,.75)'}}>{m.name}</td>
                    <td className="rl-cell">{m.role}</td>
                    <td className="no-cell">{m.no||'—'}</td>
                    {m.sch.map((code,di)=>{
                      const cfg=S(code), isT=di+1===TODAY;
                      return <td key={di} className="scell" style={{background:cfg.bg,color:cfg.txt,
                        outline:isT?`1px solid ${cfg.bd}`:'none'}}>{cfg.s}</td>;
                    })}
                    <td style={{textAlign:'center',verticalAlign:'middle',fontSize:9,fontWeight:700,
                      color:'#7ED4A7',background:'rgba(76,175,125,.05)'}}>{aC}</td>
                    <td style={{textAlign:'center',verticalAlign:'middle',fontSize:9,fontWeight:700,
                      color:'#7BAFD4',background:'rgba(74,139,196,.05)'}}>{bC}</td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
          {[['A SHIFTS',TOT_A,'#7ED4A7'],['B SHIFTS',TOT_B,'#7BAFD4'],['LPC EVENT',TOT_BPLC,'#FF9A50'],['DAYS OFF',TOT_OFF,'#555']].map(([lbl,arr,col])=>(
            <tr key={lbl} style={{background:'rgba(0,0,0,.3)'}}>
              <td className="tot-nm" style={{color:col}}>{lbl}</td>
              <td className="tot-rl"/><td className="tot-no"/>
              {arr.map((n,i)=><td key={i} className="tot-cell" style={{
                background:i+1===TODAY?'rgba(212,168,67,.08)':'transparent',
                color:n===0?'rgba(255,255,255,.1)':col}}>{n||'·'}</td>)}
              <td style={{background:'rgba(255,255,255,.02)'}}/><td style={{background:'rgba(255,255,255,.02)'}}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ── STAFF DETAIL ──────────────────────────────────────────────────────────
  const StaffDetail = () => {
    const m = GROUPS.flatMap(g=>g.members).find(x=>x.id===selStaff);
    if (!m) return null;
    const cfg = S(m.sch[TODAY-1]);
    return (
      <div className="card-d fu" style={{padding:'14px 18px',marginTop:12,display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
        <div>
          <div style={{fontSize:9,color:'rgba(255,255,255,.3)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:4}}>Staff Member</div>
          <div style={{fontSize:15,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,color:'#EAC86A'}}>{m.name}</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.4)',marginTop:2}}>{m.role}</div>
        </div>
        <div>
          <div style={{fontSize:9,color:'rgba(255,255,255,.3)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:4}}>Today's Shift</div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:cfg.bg,border:`1px solid ${cfg.bd}`,
            borderRadius:7,padding:'5px 10px'}}>
            <span style={{fontSize:13,fontWeight:700,color:cfg.txt}}>{cfg.s}</span>
            <span style={{fontSize:10,color:cfg.txt,opacity:.8}}>{cfg.lbl} · {cfg.t}</span>
          </div>
        </div>
        <div>
          <div style={{fontSize:9,color:'rgba(255,255,255,.3)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:4}}>May Tally</div>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            {[['A shifts',m.sch.filter(s=>['A','ATL'].includes(s)).length,'#7ED4A7'],
              ['B shifts',m.sch.filter(s=>['B','BTL'].includes(s)).length,'#7BAFD4'],
              ['Days off',m.sch.filter(s=>s==='OFF').length,'rgba(255,255,255,.3)']
            ].map(([l,n,c])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:10}}>
                <span style={{color:'rgba(255,255,255,.38)'}}>{l}</span>
                <span style={{fontWeight:700,color:c}}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── LEGEND ────────────────────────────────────────────────────────────────
  const Legend = () => (
    <div style={{display:'flex',flexWrap:'wrap',gap:4,marginTop:10}}>
      {['A','B','C','ATL','BTL','BPLC','OPNG','AL','OT','PH','CL','AHST','BHST','ABAR','BBAR','ME'].map(k=>{
        const c=SH[k];
        return <div key={k} style={{display:'inline-flex',alignItems:'center',gap:4,background:c.bg,
          border:`1px solid ${c.bd}`,borderRadius:5,padding:'3px 7px'}}>
          <span style={{fontSize:8.5,fontWeight:700,color:c.txt}}>{c.s}</span>
          <span style={{fontSize:7.5,color:c.txt,opacity:.7}}>{c.lbl}</span>
        </div>;
      })}
    </div>
  );

  // ── ADMIN VIEW ────────────────────────────────────────────────────────────
  const AdminView = () => {
    const totalOnDuty = GROUPS.flatMap(g=>g.members).filter(m=>m.sch[TODAY-1]!=='OFF').length;
    return (
      <div style={{padding:'20px 24px 32px',maxWidth:1140,margin:'0 auto'}}>
        <div className="fu" style={{marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,color:'#D4A843',letterSpacing:'.04em'}}>
              May 2026 — Duty Roster
            </div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.3)',marginTop:2,letterSpacing:'.05em'}}>
              F&B Department · Hemingways Nairobi
            </div>
          </div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.22)',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>
            Today: Thursday 8 May
          </div>
        </div>

        <div className="fu1" style={{display:'flex',gap:5,marginBottom:16,background:'rgba(255,255,255,.04)',
          borderRadius:9,padding:4,width:'fit-content'}}>
          {[['roster','Monthly Roster'],['dashboard','Analytics']].map(([t,l])=>(
            <button key={t} className="tab-btn" onClick={()=>setATab(t)} style={{
              background:aTab===t?'rgba(212,168,67,.15)':'transparent',
              color:aTab===t?'#D4A843':'rgba(255,255,255,.4)',
              fontWeight:aTab===t?600:400}}>{l}</button>
          ))}
        </div>

        {aTab==='roster'&&(
          <>
            <div style={{display:'grid',gridTemplateColumns:'1fr 210px',gap:14,marginBottom:14}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                {[
                  {l:"Today's Occupancy", v:`${OCC[TODAY-1]}%`, c:'#EAC86A'},
                  {l:'Staff On Duty',     v:totalOnDuty,         c:'#7BAFD4'},
                  {l:'On Leave Today',    v:GROUPS.flatMap(g=>g.members).filter(m=>m.sch[TODAY-1]==='AL').length, c:'#7ED4A7'},
                  {l:'LPC Assigned',      v:GROUPS.flatMap(g=>g.members).filter(m=>['BPLC','LPC'].includes(m.sch[TODAY-1])).length, c:'#FF9A50'},
                ].map((s,i)=>(
                  <div key={i} className={`card-d fu${i+1}`} style={{padding:'12px 14px'}}>
                    <div style={{fontSize:9,color:'rgba(255,255,255,.33)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:4}}>{s.l}</div>
                    <div style={{fontSize:26,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,color:s.c}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <AIPanel/>
            </div>

            <div className="card-d fu3" style={{padding:'14px 16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'rgba(255,255,255,.8)'}}>
                    Staff Schedule — May 2026
                  </div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,.28)',marginTop:1}}>Click staff name to view details</div>
                </div>
                <div style={{display:'flex',gap:6}}>
                  {[['#7ED4A7','A 7–15h'],['#7BAFD4','B 15:30–23h'],['#FF9A50','BPLC Event']].map(([c,l])=>(
                    <div key={l} style={{padding:'4px 10px',background:c+'18',border:`1px solid ${c}40`,borderRadius:6,
                      fontSize:9,color:c,fontWeight:600}}>{l}</div>
                  ))}
                </div>
              </div>
              <RosterTable/>
              {selStaff&&<StaffDetail/>}
              <Legend/>
            </div>
          </>
        )}

        {aTab==='dashboard'&&(
          <>
            <div style={{display:'grid',gridTemplateColumns:'1fr 210px',gap:14,marginBottom:14}}>
              <div className="card-d fu1" style={{padding:'16px 18px'}}>
                <div style={{marginBottom:12}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'rgba(255,255,255,.8)'}}>
                    Occupancy — May 2026
                  </div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,.3)',marginTop:1}}>Live OPERA Cloud data · Click to inspect day</div>
                </div>
                <div style={{display:'flex',gap:3,alignItems:'flex-end',height:90}}>
                  {OCC.map((o,i)=>{
                    const isT=i+1===TODAY, we=isWeekend(i+1);
                    return (
                      <div key={i} onClick={()=>setSelDay(i+1)} style={{flex:1,display:'flex',flexDirection:'column',
                        alignItems:'center',gap:2,cursor:'pointer',opacity:isT?1:0.75}}>
                        <div style={{fontSize:7,color:isT?'#EAC86A':'rgba(255,255,255,.28)',fontWeight:isT?700:400}}>{o}</div>
                        <div style={{width:'100%',background:'rgba(255,255,255,.05)',borderRadius:3,height:70,display:'flex',alignItems:'flex-end'}}>
                          <div style={{width:'100%',height:barsVis?`${o}%`:'0%',
                            background:`linear-gradient(to top,${occColor(o)},${occColor(o)}99)`,
                            borderRadius:3,transition:'height .6s cubic-bezier(.34,1.56,.64,1)',
                            outline:isT?`1px solid ${occColor(o)}`:'none'}}/>
                        </div>
                        <div style={{fontSize:6.5,color:isT?'#EAC86A':'rgba(255,255,255,.22)',fontWeight:isT?700:400}}>
                          {i+1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <AIPanel/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
              {[
                {l:'Peak Occupancy', v:'95%', sub:'May 13 & 29',  c:'#EAC86A'},
                {l:'Avg Daily Staff', v:Math.round(GROUPS.flatMap(g=>g.members).length*.72), sub:'on duty per day', c:'#7BAFD4'},
                {l:'LPC Active Days', v:TOT_BPLC.filter(x=>x>0).length, sub:'event days this month', c:'#FF9A50'},
                {l:'Pending Approval', v:2, sub:'schedules to review', c:'#E08989'},
              ].map((s,i)=>(
                <div key={i} className={`card-d fu${i+1}`} style={{padding:'12px 14px'}}>
                  <div style={{fontSize:9,color:'rgba(255,255,255,.33)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:4}}>{s.l}</div>
                  <div style={{fontSize:26,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,.26)',marginTop:3}}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="card-d fu3" style={{padding:'14px 16px'}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,
                color:'rgba(255,255,255,.8)',marginBottom:12}}>
                Day {selDay} Breakdown — {DOW[dow(selDay)]} {selDay} May 2026 · Occupancy {OCC[selDay-1]}%
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                {[
                  ['A Shifts (7–15h)',    TOT_A[selDay-1],    '#7ED4A7','#1C3828'],
                  ['B Shifts (15:30–23h)',TOT_B[selDay-1],    '#7BAFD4','#18284A'],
                  ['LPC Event',           TOT_BPLC[selDay-1], '#FF9A50','#462000'],
                  ['Days Off',            TOT_OFF[selDay-1],  '#888','#111'],
                ].map(([l,v,c,bg])=>(
                  <div key={l} style={{background:bg,border:`1px solid ${c}33`,borderRadius:8,padding:'12px 14px'}}>
                    <div style={{fontSize:8.5,color:c,opacity:.75,letterSpacing:'.05em',textTransform:'uppercase',marginBottom:4}}>{l}</div>
                    <div style={{fontSize:28,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ── STAFF VIEW ────────────────────────────────────────────────────────────
  const StaffView = () => {
    const offDays   = GRACE_SCH.filter(s=>s==='OFF').length;
    const leaveDays = GRACE_SCH.filter(s=>['AL','CL','ML','PH'].includes(s)).length;
    const working   = DAYS-offDays-leaveDays;
    const mornings  = GRACE_SCH.filter(s=>['A','ATL','OPNG','ABAR','AHST'].includes(s)).length;
    const evenings  = GRACE_SCH.filter(s=>['B','BTL','BBAR','BHST'].includes(s)).length;

    const calCells=[];
    for(let i=0;i<MAY_START;i++) calCells.push(null);
    for(let d=1;d<=DAYS;d++) calCells.push(d);
    while(calCells.length%7!==0) calCells.push(null);
    const calRows=[];
    for(let i=0;i<calCells.length;i+=7) calRows.push(calCells.slice(i,i+7));

    const shiftBg={A:'rgba(76,175,125,.11)',B:'rgba(74,139,196,.11)',ATL:'rgba(212,168,67,.11)',
      BTL:'rgba(74,139,196,.11)',BPLC:'rgba(196,90,0,.11)',AL:'rgba(48,176,80,.11)',
      CL:'rgba(128,64,192,.11)',ML:'rgba(192,64,128,.11)',PH:'rgba(176,154,32,.11)',OFF:'transparent'};
    const shiftTx={A:'#2D6A2D',B:'#1A4A7A',ATL:'#7A5200',BTL:'#1A3A6A',BPLC:'#7A3200',
      AL:'#1A5A1A',CL:'#4A1A7A',ML:'#6A1A4A',PH:'#5A4A00',OFF:'rgba(92,61,42,.28)'};

    return (
      <div style={{padding:'20px 24px 32px',maxWidth:800,margin:'0 auto'}}>
        <div className="fu" style={{marginBottom:16}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:25,fontWeight:600,color:'#2C1810',letterSpacing:'.03em'}}>
            Good morning, Grace
          </div>
          <div style={{fontSize:11,color:'#8B6B52',marginTop:3,letterSpacing:'.04em'}}>Thursday 8 May 2026</div>
        </div>

        {/* Today card */}
        <div className="fu1" style={{background:'linear-gradient(135deg,#1A0E08 0%,#2C1810 55%,#3D2214 100%)',
          border:'1px solid rgba(212,168,67,.25)',borderRadius:14,padding:'18px 20px',marginBottom:14,
          position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:100,height:100,
            background:'radial-gradient(circle,rgba(212,168,67,.08) 0%,transparent 70%)'}}/>
          <div style={{position:'absolute',top:12,right:14,fontSize:32,opacity:.04,
            fontFamily:"'Cinzel',serif",color:'#D4A843',fontWeight:600}}>A</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontSize:9,color:'rgba(255,255,255,.3)',letterSpacing:'.09em',textTransform:'uppercase',marginBottom:4}}>Today's Shift</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:600,color:'#EAC86A',lineHeight:1}}>A Shift</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.5)',marginTop:4}}>A Shift · Morning · 7:00 – 15:00</div>
            </div>
            <div style={{background:'rgba(76,175,125,.11)',border:'1px solid rgba(76,175,125,.25)',borderRadius:9,padding:'8px 14px',textAlign:'center'}}>
              <div style={{fontSize:8,color:'rgba(255,255,255,.28)',letterSpacing:'.06em',textTransform:'uppercase'}}>Occ.</div>
              <div style={{fontSize:11,fontWeight:700,color:'#7ED4A7',letterSpacing:'.05em'}}>{OCC[TODAY-1]}%</div>
            </div>
          </div>
          <div style={{marginTop:14,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {[['Break','11:00–11:30'],['Supervisor','Barnett Juma'],['Hours Today','8h']].map(([l,v])=>(
              <div key={l} style={{padding:'8px 10px',background:'rgba(255,255,255,.04)',borderRadius:8,border:'1px solid rgba(255,255,255,.07)'}}>
                <div style={{fontSize:8,color:'rgba(255,255,255,.26)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:3}}>{l}</div>
                <div style={{fontSize:11,fontWeight:500,color:'rgba(255,255,255,.68)'}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="fu2" style={{display:'flex',gap:4,marginBottom:12,background:'rgba(92,61,42,.08)',
          borderRadius:9,padding:4,width:'fit-content'}}>
          {[['month','My Month'],['today',"Today's Team"]].map(([t,l])=>(
            <button key={t} className="tab-btn" onClick={()=>setSTab(t)} style={{
              background:sTab===t?'rgba(196,118,42,.15)':'transparent',
              color:sTab===t?'#7A4A10':'rgba(92,61,42,.55)',
              fontWeight:sTab===t?600:400}}>{l}</button>
          ))}
        </div>

        {sTab==='month'&&(
          <>
            <div className="card-l fu2" style={{padding:'13px 16px',marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:'#2C1810'}}>May Summary</div>
                <div style={{fontSize:10,color:'#8B6B52'}}>{working} shifts · {offDays} days off</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                {[{l:'Working',v:working,c:'#C4762A',bg:'rgba(196,118,42,.08)'},
                  {l:'Days Off',v:offDays,c:'#5A3C1C',bg:'rgba(92,61,42,.06)'},
                  {l:'Mornings',v:mornings,c:'#2D6A2D',bg:'rgba(45,106,45,.07)'},
                  {l:'Evenings',v:evenings,c:'#1A4A7A',bg:'rgba(26,74,122,.07)'},
                ].map(s=>(
                  <div key={s.l} style={{background:s.bg,borderRadius:7,padding:'8px 10px',textAlign:'center'}}>
                    <div style={{fontSize:8,color:s.c,opacity:.7,letterSpacing:'.06em',textTransform:'uppercase',marginBottom:3}}>{s.l}</div>
                    <div style={{fontSize:20,fontFamily:"'Cormorant Garamond',serif",fontWeight:600,color:s.c}}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-l fu3" style={{padding:'14px 16px',marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'#2C1810'}}>May Calendar</div>
                <div style={{display:'flex',gap:6}}>
                  {[['rgba(76,175,125,.25)','A Shift'],['rgba(74,139,196,.25)','B Shift'],['rgba(196,118,42,.2)','Leave']].map(([c,l])=>(
                    <div key={l} style={{display:'flex',alignItems:'center',gap:3,fontSize:9,color:'#5A3C1C'}}>
                      <div style={{width:8,height:8,borderRadius:2,background:c}}/>{l}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:4}}>
                {DOW.map(d=><div key={d} style={{textAlign:'center',fontSize:8.5,fontWeight:700,color:'rgba(92,61,42,.45)',letterSpacing:'.05em'}}>{d.slice(0,1)}</div>)}
              </div>
              {calRows.map((row,ri)=>(
                <div key={ri} style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:3}}>
                  {row.map((day,ci)=>{
                    if(!day) return <div key={ci}/>;
                    const code=GRACE_SCH[day-1], isOff=code==='OFF', isT=day===TODAY, isSel=selDay===day;
                    return (
                      <div key={ci} className="cal-day" onClick={()=>setSelDay(day)} style={{
                        background:isSel?'rgba(196,118,42,.18)':isT?'rgba(196,118,42,.1)':shiftBg[code]||'transparent',
                        border:isT?'1px solid rgba(196,118,42,.5)':isSel?'1px solid rgba(196,118,42,.3)':'1px solid transparent',
                      }}>
                        <div style={{fontSize:12,fontFamily:"'Cormorant Garamond',serif",fontWeight:isT?700:500,color:isOff?'rgba(92,61,42,.28)':'#2C1810'}}>{day}</div>
                        {!isOff&&<div style={{fontSize:7.5,fontWeight:700,color:shiftTx[code]||'#555',letterSpacing:'.04em'}}>{code}</div>}
                        {isOff&&<div style={{fontSize:8,color:'rgba(92,61,42,.28)',marginTop:1}}>off</div>}
                        {isT&&<div style={{width:4,height:4,background:'#C4762A',borderRadius:'50%',marginTop:2}}/>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {selDay&&(
              <div className="card-l fu" style={{padding:'12px 16px',marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:9,color:'#8B6B52',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:2}}>
                      {DOW[dow(selDay)]} {selDay} May
                    </div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:600,color:'#2C1810'}}>
                      {(()=>{ const c=GRACE_SCH[selDay-1],cfg=S(c); return c==='OFF'?'Rest Day':cfg.lbl+' · '+cfg.t; })()}
                    </div>
                  </div>
                  {GRACE_SCH[selDay-1]!=='OFF'&&<button className="act-btn" style={{background:'rgba(196,118,42,.08)',border:'1px solid rgba(196,118,42,.2)',color:'#7A4A10',width:'auto',padding:'7px 14px',fontSize:10}}>Request Swap</button>}
                </div>
              </div>
            )}

            <div className="fu4" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {[
                {i:'⇄',l:'Request Shift Swap',c:'#C4762A',bg:'rgba(196,118,42,.08)',b:'rgba(196,118,42,.2)'},
                {i:'✦',l:'Apply for Leave',   c:'#2D7A4A',bg:'rgba(45,122,74,.07)',  b:'rgba(45,122,74,.18)'},
                {i:'◷',l:'View Payslip',      c:'#1A4A8A',bg:'rgba(26,74,138,.07)', b:'rgba(26,74,138,.18)'},
              ].map(a=>(
                <button key={a.l} className="act-btn" style={{background:a.bg,border:`1px solid ${a.b}`,color:a.c}}>
                  <span style={{fontSize:17}}>{a.i}</span>
                  <span style={{fontSize:10,textAlign:'center',lineHeight:1.3}}>{a.l}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {sTab==='today'&&(
          <div className="card-l fu1" style={{padding:'14px 16px'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'#2C1810',marginBottom:10}}>
              On Duty Today
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {[
                {n:'Grace Wanjiku',   r:'F/O Supervisor', sh:'A',   t:'7:00–15:00',  me:true},
                {n:'James Kiprotich',r:'Receptionist',   sh:'A',   t:'7:00–15:00'},
                {n:'Beatrice Njeri', r:'Receptionist',   sh:'A',   t:'7:00–15:00'},
                {n:'Tom Oduya',      r:'Duty Manager',   sh:'ATL', t:'7:00–15:00'},
                {n:'Miriam Waweru',  r:'Concierge',      sh:'B',   t:'15:30–23:00'},
                {n:'Kevin Otieno',   r:'Night Auditor',  sh:'C',   t:'23:00–7:00'},
              ].map((s,i)=>{
                const cfg=SH[s.sh]||SH.A;
                return (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 12px',
                    background:s.me?'rgba(196,118,42,.06)':'rgba(92,61,42,.03)',
                    border:`1px solid ${s.me?'rgba(196,118,42,.2)':'rgba(92,61,42,.08)'}`,borderRadius:9}}>
                    <div style={{width:30,height:30,borderRadius:'50%',background:cfg.bg,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:10,fontWeight:700,color:cfg.txt}}>{s.n.split(' ').map(x=>x[0]).join('')}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,fontWeight:s.me?600:400,color:'#1A0E08'}}>{s.n}{s.me&&' (You)'}</div>
                      <div style={{fontSize:9.5,color:'#8B6B52'}}>{s.r}</div>
                    </div>
                    <div style={{background:cfg.bg,border:`1px solid ${cfg.bd}`,borderRadius:6,padding:'4px 8px',textAlign:'center'}}>
                      <div style={{fontSize:10,fontWeight:700,color:cfg.txt}}>{s.sh}</div>
                      <div style={{fontSize:7.5,color:cfg.txt,opacity:.7}}>{s.t}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="fu5" style={{textAlign:'center',marginTop:22,opacity:.3}}>
          <div style={{fontSize:17,color:'#8B6B52',fontFamily:"'Cormorant Garamond',serif",fontStyle:'italic'}}>Hemingways Nairobi</div>
          <div style={{fontSize:8.5,color:'#8B6B52',marginTop:3,letterSpacing:'.08em',textTransform:'uppercase'}}>Karen · Est. 1986</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:'100vh',
      background:view==='admin'?'#0C0705':'#FAF4EE',
      color:view==='admin'?'rgba(255,255,255,.85)':'#2C1810'}}>
      <style>{STYLES}</style>
      <Header/>
      {view==='admin'?<AdminView/>:<StaffView/>}
    </div>
  );
}
