import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, Clipboard, Code2, Download, GraduationCap, Lightbulb, Monitor, Play, RotateCcw, Terminal } from "lucide-react";

const progressKey = "r-labs-beginner-progress-v3";

const lessons = [
  {
    title:"Installera R och RStudio", eyebrow:"Innan du skriver kod", icon:Download,
    goal:"Installera de två program du behöver och förstå vad de används till.",
    intro:"R utför beräkningarna. RStudio är arbetsmiljön där du skriver kod, ser resultat och skapar grafer. Installera först R och därefter RStudio.",
    checklist:["Ladda ner och installera R från CRAN","Ladda ner och installera RStudio Desktop","Öppna RStudio och hitta Console"],
    links:[["Ladda ner R","https://cran.r-project.org"],["Ladda ner RStudio","https://posit.co/download/rstudio-desktop/"]],
    code:`# Skriv detta i Console och tryck på Enter\nR.version.string`,
    output:`[1] "R version 4.x.x (...)"`,
    explain:"Om R visar sitt versionsnummer fungerar installationen. Ditt exakta versionsnummer kan vara annorlunda, och det är helt normalt.",
    task:"Öppna RStudio. Hitta panelen Console, skriv 2 + 2 och tryck på Enter. Resultatet ska bli [1] 4.",
    tip:"Du behöver inte förstå alla paneler ännu. Fokusera tills vidare på Console och skriptredigeraren."
  },
  {
    title:"Lär känna RStudio", eyebrow:"Din arbetsmiljö", icon:Monitor,
    goal:"Känna igen de fyra huvudområdena och skapa ditt första skript.",
    intro:"Skriptredigeraren sparar dina kommandon, medan Console kör dem. Environment visar sparade objekt och området Files/Plots/Help visar filer, grafer och hjälp.",
    checklist:["Skapa ett nytt R Script","Spara det som forsta_stegen.R","Kör en rad med Ctrl+Enter (Cmd+Enter på Mac)"],
    code:`# En kommentar börjar med #\nmeddelande <- "Hej, R!"\nmeddelande`,
    output:`[1] "Hej, R!"`,
    explain:"Den första raden är en kommentar. Den andra raden sparar text i ett objekt. Den tredje raden ber R att visa det sparade värdet.",
    task:"Skapa ett nytt skript, kopiera de tre raderna, spara filen och kör en rad i taget.",
    tip:"Skriv viktiga kommandon i ett skript, inte bara i Console, så att du kan upprepa arbetet senare."
  },
  {
    title:"Dina första beräkningar", eyebrow:"Använd R som miniräknare", icon:Terminal,
    goal:"Utföra enkla beräkningar och förstå hur R visar resultat.",
    intro:"R följer den vanliga prioriteringsordningen för räknesätt. Parenteser gör beräkningen tydligare och minskar risken för fel.",
    checklist:["Prova addition och division","Använd parenteser","Förstå att [1] anger en position och inte ingår i svaret"],
    code:`2 + 3\n10 / 4\n(8 + 2) * 3\nsqrt(81)`,
    output:`[1] 5\n[1] 2.5\n[1] 30\n[1] 9`,
    explain:"Varje [1] visar att raden börjar med det första returnerade värdet. De matematiska svaren är 5, 2.5, 30 och 9.",
    task:"Be R beräkna (12 − 4) / 2 och kvadratroten ur 144. Försök förutsäga svaren innan du kör koden.",
    tip:"Felmeddelanden är normala. Läs meddelandet, kontrollera stavning och parenteser och försök igen."
  },
  {
    title:"Spara värden som objekt", eyebrow:"Ge dina data ett namn", icon:BookOpen,
    goal:"Skapa, undersöka och uppdatera objekt med tilldelningspilen.",
    intro:"Ett objekt är en namngiven plats där R sparar ett värde. Tydliga namn gör koden lättare att förstå.",
    checklist:["Skapa ett objekt med <-","Använd objektet i en beräkning","Lista sparade objekt med ls()"],
    code:`alder <- 21\nnasta_ar <- alder + 1\nnasta_ar\nls()`,
    output:`[1] 22\n[1] "alder" "nasta_ar"`,
    explain:"R sparar 21 som alder och beräknar sedan alder + 1. Objektnamn är skiftlägeskänsliga: alder och Alder skulle vara olika objekt.",
    task:"Skapa objekten langd_cm och namn. Visa båda och ändra sedan langd_cm till ett nytt värde.",
    tip:"Använd beskrivande namn som tentamenspoang i stället för otydliga namn som x1."
  },
  {
    title:"Samla värden i vektorer", eyebrow:"Arbeta med flera värden", icon:Code2,
    goal:"Skapa en vektor och beräkna enkla sammanfattningar.",
    intro:"En vektor är en ordnad samling värden av samma grundläggande typ. Många analyser i R börjar med vektorer.",
    checklist:["Skapa en vektor med c()","Välj värden med hakparenteser","Beräkna längd och medelvärde"],
    code:`poang <- c(72, 85, 91, 68, 88)\npoang[2]\nlength(poang)\nmean(poang)`,
    output:`[1] 85\n[1] 5\n[1] 80.8`,
    explain:"poang[2] väljer det andra värdet. R börjar räkna positioner från 1. length() räknar värden och mean() beräknar deras medelvärde.",
    task:"Skapa en vektor med fem temperaturer. Visa det första och sista värdet och beräkna sedan medelvärdet.",
    tip:"Använd c(), som står för combine, när du vill samla flera värden i en vektor."
  },
  {
    title:"Skapa en liten data frame", eyebrow:"Rader och kolumner", icon:GraduationCap,
    goal:"Ordna variabler i en tabell och undersöka dess struktur.",
    intro:"En data frame är ett rektangulärt dataset. Rader motsvarar vanligtvis observationer och kolumner motsvarar variabler.",
    checklist:["Skapa en data frame","Visa de första raderna","Undersök variabelnamn och datatyper"],
    code:`studenter <- data.frame(\n  namn = c("Ali", "Sara", "Noah"),\n  alder = c(21, 22, 20),\n  godkand = c(TRUE, TRUE, FALSE)\n)\nstudenter\nstr(studenter)`,
    output:`  namn alder godkand\n1  Ali    21    TRUE\n2 Sara    22    TRUE\n3 Noah    20   FALSE\n\n'data.frame': 3 obs. av 3 variabler`,
    explain:"Tabellen innehåller tre observationer och tre variabler: text, numeriska värden och logiska TRUE/FALSE-värden.",
    task:"Lägg till en fjärde student genom att skapa om data frame-tabellen med ett extra värde i varje kolumn.",
    tip:"Alla kolumner i en data frame måste innehålla lika många värden."
  },
  {
    title:"Läs in en CSV-fil", eyebrow:"Ta in data i R", icon:Download,
    goal:"Importera en CSV-fil och kontrollera att R har läst den korrekt.",
    intro:"CSV är ett vanligt format för att dela tabeller. Lägg CSV-filen i din R-projektmapp och använd ett relativt filnamn.",
    checklist:["Lägg en CSV-fil i projektmappen","Importera den med read.csv()","Kontrollera head(), dim() och names()"],
    code:`data <- read.csv("studenter.csv")\nhead(data)\ndim(data)\nnames(data)`,
    output:`De första raderna i din fil\n[antal rader] [antal kolumner]\n[1] "namn" "alder" "godkand"`,
    explain:"head() förhandsvisar data, dim() visar antal rader och kolumner och names() visar variabelnamnen. Gör alltid dessa kontroller efter import.",
    task:"Spara studenttabellen från föregående steg som studenter.csv, importera filen och kontrollera dess dimensioner.",
    tip:"Undvik datorspecifika sökvägar som C:/Users/Namn/Desktop. Ett projektrelativt filnamn gör analysen portabel."
  },
  {
    title:"Skapa din första graf", eyebrow:"Se mönstret", icon:Play,
    goal:"Skapa ett spridningsdiagram med tydliga etiketter.",
    intro:"En graf hjälper dig att upptäcka mönster, ovanliga observationer och möjliga samband innan du beräknar en modell.",
    checklist:["Skapa två vektorer","Rita ett spridningsdiagram","Lägg till rubrik och axelrubriker"],
    code:`studietid <- c(1, 2, 3, 4, 5)\npoang <- c(52, 61, 69, 78, 86)\nplot(studietid, poang,\n     main = "Studietid och tentamenspoäng",\n     xlab = "Studietimmar",\n     ylab = "Tentamenspoäng",\n     pch = 19, col = "#287a55")`,
    output:`Ett spridningsdiagram med fem punkter som visar att längre studietid hänger samman med högre poäng.`, visual:"scatter",
    explain:"plot(x, y) placerar x på den horisontella axeln och y på den vertikala axeln. Etiketterna berättar vad värdena betyder.",
    task:"Ändra ett poängvärde, kör grafen igen och beskriv hur det visuella mönstret förändras.",
    tip:"Ett synligt mönster är användbar information, men bevisar inte i sig ett orsakssamband."
  }
];

function PlotOutput(){
  const canvasRef=useRef(null),wrapRef=useRef(null);
  useEffect(()=>{
    const draw=()=>{
      const canvas=canvasRef.current,wrap=wrapRef.current;if(!canvas||!wrap)return;
      const width=Math.max(300,wrap.clientWidth),height=300,ratio=Math.min(window.devicePixelRatio||1,2);
      canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;
      const c=canvas.getContext("2d");c.scale(ratio,ratio);c.fillStyle="#fff";c.fillRect(0,0,width,height);
      const p={left:58,right:24,top:42,bottom:54},xs=[1,2,3,4,5],ys=[52,61,69,78,86];
      const X=x=>p.left+(x-1)/4*(width-p.left-p.right),Y=y=>height-p.bottom-(y-45)/45*(height-p.top-p.bottom);
      c.strokeStyle="#e0e8e3";c.lineWidth=1;c.font="11px Manrope";c.fillStyle="#6d7d75";
      [50,60,70,80,90].forEach(v=>{const y=Y(v);c.beginPath();c.moveTo(p.left,y);c.lineTo(width-p.right,y);c.stroke();c.textAlign="right";c.fillText(String(v),p.left-10,y+4)});
      c.strokeStyle="#29483b";c.lineWidth=1.4;c.beginPath();c.moveTo(p.left,p.top);c.lineTo(p.left,height-p.bottom);c.lineTo(width-p.right,height-p.bottom);c.stroke();
      xs.forEach((x,i)=>{c.fillStyle="#6d7d75";c.textAlign="center";c.fillText(String(x),X(x),height-p.bottom+20);c.beginPath();c.fillStyle="#287a55";c.arc(X(x),Y(ys[i]),6,0,Math.PI*2);c.fill()});
      c.fillStyle="#183229";c.font="700 13px Manrope";c.textAlign="center";c.fillText("Studietid och tentamenspoäng",width/2,21);c.font="11px Manrope";c.fillText("Studietimmar",(p.left+width-p.right)/2,height-14);c.save();c.translate(16,(p.top+height-p.bottom)/2);c.rotate(-Math.PI/2);c.fillText("Tentamenspoäng",0,0);c.restore();
    };
    draw();const observer=new ResizeObserver(draw);observer.observe(wrapRef.current);return()=>observer.disconnect();
  },[]);
  return <div className="plot-output" ref={wrapRef}><canvas ref={canvasRef} role="img" aria-label="Spridningsdiagram över studietimmar och tentamenspoäng"/></div>;
}

export default function RLabsPlatform(){
  const [current,setCurrent]=useState(0);
  const [completed,setCompleted]=useState(()=>{try{return JSON.parse(localStorage.getItem(progressKey))||[]}catch{return[]}});
  const [copied,setCopied]=useState(false);
  const lesson=lessons[current],Icon=lesson.icon,percent=Math.round(completed.length/lessons.length*100);
  useEffect(()=>localStorage.setItem(progressKey,JSON.stringify(completed)),[completed]);
  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});setCopied(false)},[current]);
  const copy=async()=>{await navigator.clipboard?.writeText(lesson.code);setCopied(true);setTimeout(()=>setCopied(false),1500)};
  const toggle=()=>setCompleted(old=>old.includes(current)?old.filter(i=>i!==current):[...old,current]);
  const start=()=>setCurrent(lessons.findIndex((_,i)=>!completed.includes(i))<0?0:lessons.findIndex((_,i)=>!completed.includes(i)));
  return <div className="beginner-shell">
    <header className="simple-header"><button className="simple-brand" onClick={()=>setCurrent(0)}><span>R</span><div><b>R för nybörjare</b><small>En lärstig för studenter</small></div></button><div className="simple-progress"><span>{completed.length} av {lessons.length} steg</span><div><i style={{width:`${percent}%`}}/></div><b>{percent}%</b></div></header>
    <main className="beginner-main">
      <section className="welcome"><div><span className="welcome-label"><GraduationCap/>FÖR UNIVERSITETSSTUDENTER · INGA FÖRKUNSKAPER KRÄVS</span><h1>Dina första steg<br/>med <em>R.</em></h1><p>Börja med installationen och lär dig en liten sak i taget. Varje steg innehåller ett exempel, förväntat resultat och en kort uppgift.</p><button onClick={start}><Play/>{completed.length?"Fortsätt lära dig":"Börja med installationen"}</button></div><div className="welcome-code"><small>DITT FÖRSTA R-KOMMANDO</small><code><b>&gt;</b> 2 + 2<br/><em>[1] 4</em></code><span><CheckCircle2/>Det här är riktig R-kod.</span></div></section>
      <section className="how-it-works"><div><b>1</b><span><strong>Läs</strong>En tydlig idé</span></div><ChevronRight/><div><b>2</b><span><strong>Kör</strong>Kopiera exemplet</span></div><ChevronRight/><div><b>3</b><span><strong>Prova</strong>Gör en kort uppgift</span></div></section>
      <section className="learning-area">
        <aside className="step-list"><div><span>NYBÖRJARSTIG</span><b>8 små steg</b></div>{lessons.map((item,i)=><button key={item.title} className={`${current===i?"active":""} ${completed.includes(i)?"done":""}`} onClick={()=>setCurrent(i)}><span>{completed.includes(i)?<Check/>:i+1}</span><div><small>STEG {i+1}</small><b>{item.title}</b></div><ChevronRight/></button>)}<button className="reset-progress" onClick={()=>setCompleted([])}><RotateCcw/>Nollställ framsteg</button></aside>
        <article className="lesson-card">
          <header className="lesson-head"><div className="lesson-icon"><Icon/></div><div><span>STEG {current+1} AV {lessons.length} · {lesson.eyebrow}</span><h2>{lesson.title}</h2><p>{lesson.goal}</p></div></header>
          <section className="lesson-intro"><h3>Det här får du lära dig</h3><p>{lesson.intro}</p><div>{lesson.checklist.map(item=><span key={item}><Check/>{item}</span>)}</div>{lesson.links&&<nav>{lesson.links.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer"><Download/>{label}<ArrowRight/></a>)}</nav>}</section>
          <section className="try-code"><div className="lesson-label"><Terminal/><span><b>01</b> Kör detta i R</span></div><div className="simple-code"><header><span>forsta_stegen.R</span><button onClick={copy}>{copied?<><Check/>Kopierad</>:<><Clipboard/>Kopiera kod</>}</button></header><pre><code>{lesson.code}</code></pre></div></section>
          <section className="read-output"><div className="lesson-label"><Monitor/><span><b>02</b> Kontrollera resultatet</span></div>{lesson.visual==="scatter"?<><PlotOutput/><div className="output-caption">{lesson.output}</div></>:<pre><code>{lesson.output}</code></pre>}<p>{lesson.explain}</p></section>
          <section className="student-task"><span>DIN TUR · 5 MINUTER</span><h3>Prova själv</h3><p>{lesson.task}</p></section>
          <aside className="beginner-tip"><Lightbulb/><p><b>Nybörjartips</b>{lesson.tip}</p></aside>
          <footer className="lesson-actions"><button disabled={current===0} onClick={()=>setCurrent(i=>i-1)}><ArrowLeft/>Föregående</button><button className={completed.includes(current)?"complete done":"complete"} onClick={toggle}>{completed.includes(current)?<><CheckCircle2/>Steget är klart</>:<><Check/>Markera som klart</>}</button><button disabled={current===lessons.length-1} onClick={()=>setCurrent(i=>i+1)}>Nästa<ArrowRight/></button></footer>
        </article>
      </section>
    </main>
    <footer className="beginner-footer"><span>R</span><p><b>R för nybörjare</b><small>Utformad för universitetsstudenter som tar sina första steg i R.</small></p></footer>
  </div>
}
