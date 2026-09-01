import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, Clipboard, Code2, Download, GraduationCap, Lightbulb, Monitor, Play, RotateCcw, Terminal } from "lucide-react";

const progressKey = "r-labs-beginner-progress-v3";

const lessons = [
  {
    title:"Install R and RStudio", eyebrow:"Before you write code", icon:Download,
    goal:"Install the two programs you need and understand what each one does.",
    intro:"R performs the calculations. RStudio is the friendly workspace where you write code, view results and create plots. Install R first, then RStudio.",
    checklist:["Download and install R from CRAN","Download and install RStudio Desktop","Open RStudio and find the Console"],
    links:[["Download R","https://cran.r-project.org"],["Download RStudio","https://posit.co/download/rstudio-desktop/"]],
    code:`# Type this in the Console and press Enter\nR.version.string`,
    output:`[1] "R version 4.x.x (...)"`,
    explain:"If R prints its version, the installation works. Your exact version number may be different—and that is fine.",
    task:"Open RStudio. Find the Console panel, type 2 + 2, and press Enter. You should see [1] 4.",
    tip:"You do not need to understand every panel yet. For now, focus on the Console and the script editor."
  },
  {
    title:"Meet RStudio", eyebrow:"Know your workspace", icon:Monitor,
    goal:"Recognize the four main areas and create your first script.",
    intro:"The script editor stores commands, while the Console runs them. The Environment shows saved objects, and the Files/Plots/Help area displays supporting information.",
    checklist:["Create a new R Script","Save it as first_steps.R","Run one line with Ctrl+Enter (Cmd+Enter on Mac)"],
    code:`# A comment starts with #\nmessage <- "Hello, R!"\nmessage`,
    output:`[1] "Hello, R!"`,
    explain:"The first line is a comment. The second line saves text in an object. The third line asks R to display the saved value.",
    task:"Create a new script, copy the three lines, save the file, and run each line separately.",
    tip:"Write important commands in a script—not only in the Console—so you can repeat your work later."
  },
  {
    title:"Your first calculations", eyebrow:"Use R as a calculator", icon:Terminal,
    goal:"Run arithmetic and learn how R shows a result.",
    intro:"R follows the usual order of operations. Parentheses make your intention clear and help prevent mistakes.",
    checklist:["Try addition and division","Use parentheses","Recognize [1] as an output position, not part of the answer"],
    code:`2 + 3\n10 / 4\n(8 + 2) * 3\nsqrt(81)`,
    output:`[1] 5\n[1] 2.5\n[1] 30\n[1] 9`,
    explain:"Each [1] tells you that the line begins with the first returned value. The mathematical answers are 5, 2.5, 30 and 9.",
    task:"Ask R to calculate (12 − 4) / 2 and the square root of 144. Predict each answer first.",
    tip:"Errors are normal. Read the message, check spelling and brackets, then try again."
  },
  {
    title:"Save values as objects", eyebrow:"Give your data a name", icon:BookOpen,
    goal:"Create, inspect and update objects using the assignment arrow.",
    intro:"An object is a named place where R stores a value. Clear names make code easier to understand.",
    checklist:["Create an object with <-","Use the object in a calculation","List saved objects with ls()"],
    code:`age <- 21\nnext_year <- age + 1\nnext_year\nls()`,
    output:`[1] 22\n[1] "age" "next_year"`,
    explain:"R stores 21 as age, then calculates and stores age + 1. Object names are case-sensitive: age and Age would be different objects.",
    task:"Create objects called height_cm and name. Display both, then change height_cm to a new value.",
    tip:"Use descriptive names such as exam_score rather than vague names such as x1."
  },
  {
    title:"Combine values in vectors", eyebrow:"Work with several values", icon:Code2,
    goal:"Create a vector and calculate simple summaries.",
    intro:"A vector is an ordered collection of values of the same basic type. Many R analyses begin with vectors.",
    checklist:["Create a vector with c()","Select values using square brackets","Calculate its length and mean"],
    code:`scores <- c(72, 85, 91, 68, 88)\nscores[2]\nlength(scores)\nmean(scores)`,
    output:`[1] 85\n[1] 5\n[1] 80.8`,
    explain:"scores[2] selects the second value. R starts counting positions at 1. length() counts values and mean() calculates their average.",
    task:"Create a vector with five temperatures. Display the first and last values, then calculate the mean.",
    tip:"Use c(), meaning combine, whenever you want to place several values in one vector."
  },
  {
    title:"Build a small data frame", eyebrow:"Rows and columns", icon:GraduationCap,
    goal:"Organize variables in a table and inspect its structure.",
    intro:"A data frame is a rectangular dataset. Rows usually represent observations and columns represent variables.",
    checklist:["Create a data frame","View the first rows","Inspect variable names and types"],
    code:`students <- data.frame(\n  name = c("Ali", "Sara", "Noah"),\n  age = c(21, 22, 20),\n  passed = c(TRUE, TRUE, FALSE)\n)\nstudents\nstr(students)`,
    output:`  name age passed\n1  Ali  21   TRUE\n2 Sara  22   TRUE\n3 Noah  20  FALSE\n\n'data.frame': 3 obs. of 3 variables`,
    explain:"The table contains three observations and three variables: text, numeric values and logical TRUE/FALSE values.",
    task:"Add a fourth student by recreating the data frame with one extra value in every column.",
    tip:"Every column in a data frame must contain the same number of values."
  },
  {
    title:"Read a CSV file", eyebrow:"Bring data into R", icon:Download,
    goal:"Import a CSV file and check that R read it correctly.",
    intro:"CSV is a common format for sharing tables. Keep the CSV file inside your R project folder and use a relative filename.",
    checklist:["Place a CSV in the project folder","Import it with read.csv()","Check head(), dim() and names()"],
    code:`data <- read.csv("students.csv")\nhead(data)\ndim(data)\nnames(data)`,
    output:`The first rows of your file\n[number of rows] [number of columns]\n[1] "name" "age" "passed"`,
    explain:"head() previews the data, dim() reports rows and columns, and names() shows the variable names. Always perform these checks after importing.",
    task:"Save the student table from the previous lesson as students.csv, import it, and verify its dimensions.",
    tip:"Avoid computer-specific paths such as C:/Users/Name/Desktop. A project-relative filename makes your analysis portable."
  },
  {
    title:"Create your first plot", eyebrow:"See the pattern", icon:Play,
    goal:"Make a scatterplot and add clear labels.",
    intro:"A plot helps you see patterns, unusual observations and possible relationships before calculating a model.",
    checklist:["Create x and y vectors","Draw a scatterplot","Add a title and axis labels"],
    code:`hours <- c(1, 2, 3, 4, 5)\nscore <- c(52, 61, 69, 78, 86)\nplot(hours, score,\n     main = "Study time and score",\n     xlab = "Study hours",\n     ylab = "Exam score",\n     pch = 19, col = "#287a55")`,
    output:`A scatterplot with five points showing that higher study time is associated with higher scores.`, visual:"scatter",
    explain:"plot(x, y) places x on the horizontal axis and y on the vertical axis. Labels tell the reader what the values mean.",
    task:"Change one score, run the plot again, and describe how the visual pattern changes.",
    tip:"A visible pattern is useful evidence, but it does not by itself prove causation."
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
      c.fillStyle="#183229";c.font="700 13px Manrope";c.textAlign="center";c.fillText("Study time and score",width/2,21);c.font="11px Manrope";c.fillText("Study hours",(p.left+width-p.right)/2,height-14);c.save();c.translate(16,(p.top+height-p.bottom)/2);c.rotate(-Math.PI/2);c.fillText("Exam score",0,0);c.restore();
    };
    draw();const observer=new ResizeObserver(draw);observer.observe(wrapRef.current);return()=>observer.disconnect();
  },[]);
  return <div className="plot-output" ref={wrapRef}><canvas ref={canvasRef} role="img" aria-label="Scatterplot of study hours and exam score"/></div>;
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
    <header className="simple-header"><button className="simple-brand" onClick={()=>setCurrent(0)}><span>R</span><div><b>R for Beginners</b><small>A student learning path</small></div></button><div className="simple-progress"><span>{completed.length} of {lessons.length} steps</span><div><i style={{width:`${percent}%`}}/></div><b>{percent}%</b></div></header>
    <main className="beginner-main">
      <section className="welcome"><div><span className="welcome-label"><GraduationCap/>FOR UNIVERSITY STUDENTS · NO EXPERIENCE NEEDED</span><h1>Your first steps<br/>with <em>R.</em></h1><p>Start with installation and learn one small idea at a time. Every step has an example, the expected result and one short task.</p><button onClick={start}><Play/>{completed.length?"Continue learning":"Start with installation"}</button></div><div className="welcome-code"><small>YOUR FIRST R COMMAND</small><code><b>&gt;</b> 2 + 2<br/><em>[1] 4</em></code><span><CheckCircle2/>That is real R code.</span></div></section>
      <section className="how-it-works"><div><b>1</b><span><strong>Read</strong>One clear idea</span></div><ChevronRight/><div><b>2</b><span><strong>Run</strong>Copy the example</span></div><ChevronRight/><div><b>3</b><span><strong>Try</strong>Complete a small task</span></div></section>
      <section className="learning-area">
        <aside className="step-list"><div><span>BEGINNER PATH</span><b>8 small steps</b></div>{lessons.map((item,i)=><button key={item.title} className={`${current===i?"active":""} ${completed.includes(i)?"done":""}`} onClick={()=>setCurrent(i)}><span>{completed.includes(i)?<Check/>:i+1}</span><div><small>STEP {i+1}</small><b>{item.title}</b></div><ChevronRight/></button>)}<button className="reset-progress" onClick={()=>setCompleted([])}><RotateCcw/>Reset progress</button></aside>
        <article className="lesson-card">
          <header className="lesson-head"><div className="lesson-icon"><Icon/></div><div><span>STEP {current+1} OF {lessons.length} · {lesson.eyebrow}</span><h2>{lesson.title}</h2><p>{lesson.goal}</p></div></header>
          <section className="lesson-intro"><h3>What you will learn</h3><p>{lesson.intro}</p><div>{lesson.checklist.map(item=><span key={item}><Check/>{item}</span>)}</div>{lesson.links&&<nav>{lesson.links.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer"><Download/>{label}<ArrowRight/></a>)}</nav>}</section>
          <section className="try-code"><div className="lesson-label"><Terminal/><span><b>01</b> Run this in R</span></div><div className="simple-code"><header><span>first_steps.R</span><button onClick={copy}>{copied?<><Check/>Copied</>:<><Clipboard/>Copy code</>}</button></header><pre><code>{lesson.code}</code></pre></div></section>
          <section className="read-output"><div className="lesson-label"><Monitor/><span><b>02</b> Check the result</span></div>{lesson.visual==="scatter"?<><PlotOutput/><div className="output-caption">{lesson.output}</div></>:<pre><code>{lesson.output}</code></pre>}<p>{lesson.explain}</p></section>
          <section className="student-task"><span>YOUR TURN · 5 MINUTES</span><h3>Try it yourself</h3><p>{lesson.task}</p></section>
          <aside className="beginner-tip"><Lightbulb/><p><b>Beginner tip</b>{lesson.tip}</p></aside>
          <footer className="lesson-actions"><button disabled={current===0} onClick={()=>setCurrent(i=>i-1)}><ArrowLeft/>Previous</button><button className={completed.includes(current)?"complete done":"complete"} onClick={toggle}>{completed.includes(current)?<><CheckCircle2/>Step completed</>:<><Check/>Mark as completed</>}</button><button disabled={current===lessons.length-1} onClick={()=>setCurrent(i=>i+1)}>Next<ArrowRight/></button></footer>
        </article>
      </section>
    </main>
    <footer className="beginner-footer"><span>R</span><p><b>R for Beginners</b><small>Designed for university students taking their first steps in R.</small></p></footer>
  </div>
}
