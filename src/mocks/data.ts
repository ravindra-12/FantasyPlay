export type Role = 'WK' | 'BAT' | 'AR' | 'BOWL';
export type Player = { id:string; name:string; team:'MUM'|'CHE'; role:Role; credits:number; points:number; selected:number };
export type Match = { id:string; a:string; b:string; aShort:string; bShort:string; series:string; status:'UPCOMING'|'LIVE'|'COMPLETED'; time:string; venue:string };
export const matches:Match[]=[
{id:'m1',a:'Mumbai Mavericks',b:'Chennai Comets',aShort:'MUM',bShort:'CHE',series:'India T20 Premier Series',status:'UPCOMING',time:'Today · 7:30 PM',venue:'Wankhede Stadium, Mumbai'},
{id:'m2',a:'Bengaluru Blasters',b:'Delhi Dynamos',aShort:'BLR',bShort:'DEL',series:'India T20 Premier Series',status:'LIVE',time:'14.2 ov · BLR 122/3',venue:'M. Chinnaswamy Stadium, Bengaluru'},
{id:'m3',a:'Jaipur Jaguars',b:'Lucknow Leopards',aShort:'JAI',bShort:'LKO',series:'India T20 Premier Series',status:'COMPLETED',time:'JAI won by 18 runs',venue:'Sawai Mansingh Stadium, Jaipur'},
{id:'m4',a:'Punjab Panthers',b:'Hyderabad Hawks',aShort:'PUN',bShort:'HYD',series:'Indian Domestic T20',status:'UPCOMING',time:'Tomorrow · 3:30 PM',venue:'PCA Stadium, Mohali'},
{id:'m5',a:'Kolkata Knights',b:'Ahmedabad Arrows',aShort:'KOL',bShort:'AHM',series:'Indian Domestic T20',status:'UPCOMING',time:'Tomorrow · 7:30 PM',venue:'Eden Gardens, Kolkata'},
{id:'m6',a:'Goa Gliders',b:'Kochi Kings',aShort:'GOA',bShort:'KOC',series:'Coastal Champions Cup',status:'COMPLETED',time:'KOC won by 6 wickets',venue:'Goa Cricket Ground'}];
const names=['Arjun Mehta','Vihaan Rao','Kabir Malhotra','Dev Sharma','Aarav Singh','Rohan Iyer','Kunal Kapoor','Aditya Verma','Ishaan Khanna','Reyansh Patel','Yuvraj Sethi','Manav Bhat','Samar Nair','Harsh Vora','Nikhil Das','Pranav Joshi'];
const roles:Role[]=['WK','BAT','BAT','BAT','AR','AR','BOWL','BOWL','WK','BAT','BAT','AR','AR','BOWL','BOWL','BOWL'];
export const players:Player[]=names.map((name,i)=>({id:'p'+(i+1),name,team:i<8?'MUM':'CHE',role:roles[i],credits:8+(i%5)*.5,points:28+(i*13)%78,selected:19+(i*9)%74}));
export const contests=[{id:'c1',title:'Practice League',entry:'FREE',prize:'Practice rewards',spots:'421 / 500',type:'Free'},{id:'c2',title:'Head-to-Head',entry:'₹49',prize:'₹80 sample pool',spots:'1 / 2',type:'Paid Demo'},{id:'c3',title:'Mega League',entry:'₹99',prize:'₹50,000 sample pool',spots:'8,350 / 10,000',type:'Paid Demo'},{id:'c4',title:'Small League',entry:'₹25',prize:'₹1,200 sample pool',spots:'42 / 100',type:'Paid Demo'}] as const;
export const leaderboard=Array.from({length:20},(_,i)=>({rank:i+1,name:i===6?'You · ArenaAce':['CricketCaptain','BoundaryBoss','MumbaiSix','PitchReader'][i%4],points:746-i*13}));
