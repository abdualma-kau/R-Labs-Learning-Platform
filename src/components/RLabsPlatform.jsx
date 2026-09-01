import React, { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, Code2, Copy as CopyIcon, GraduationCap, Play, Search, Sparkles, Terminal, X } from "lucide-react";

const progressKey = "r-labs-learning-progress-v2";

export default function RLabsPlatform() {
  const [completedLabs, setCompletedLabs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(progressKey)) || []; } catch { return []; }
  });
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [openLab, setOpenLab] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => localStorage.setItem(progressKey, JSON.stringify(completedLabs)), [completedLabs]);

  const handleCopy = async (text, idx) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
        return;
      }

      if (typeof document !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
        return;
      }

      console.warn("Clipboard not available in this environment");
      setCopiedIndex(null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Copy failed", err);
      setCopiedIndex(null);
    }
  };

  const toggleComplete = (idx) => {
    setCompletedLabs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const intro = {
    title: "Introduction: What is R and RStudio?",
    content: `R is a free software environment for statistical computing and graphics, widely used for data analysis, visualization, and programming.\n\nTo get started:\n1. Install R from CRAN (https://cran.r-project.org).\n2. Install RStudio (https://posit.co/download/rstudio-desktop/), a user-friendly interface for R.`
  };

  const labs = [
    {
      title: "Lab 1: Getting Started with R",
      example: `x <- 10\ny <- 5\nls()\nrm(y)\nls()` ,
      output: `[1] "x"` ,
      interpretation: `We created two objects and used ls() to list them. After removing y with rm(), only x remains. This shows how R stores everything in memory as objects and allows us to manage them easily.`,
      exercise: "Create 3 objects (name, age, grade), list them, then remove one."
    },
    {
      title: "Lab 2: Working with Data – Vectors and Objects",
      example: `v <- c(1,2,3,4)\nmode(v)\nlength(v)\nf <- factor(c("Male","Female","Male"))\nlevels(f)` ,
      output: `[1] "numeric"\n[1] 4\n[1] "Female" "Male"` ,
      interpretation: `We created a numeric vector and checked its mode and length. Then we created a factor, which R recognized as a categorical variable. Factors are essential for statistical models, since they allow R to treat categories differently from numbers.`,
      exercise: "Create a factor for 'Yes/No' responses and display its levels."
    },
    {
      title: "Lab 3: Reading and Saving Data",
      example: `mydata <- data.frame(Name=c("Ali","Sara"), Age=c(21,22))\nwrite.table(mydata, "mydata.csv", sep=",", row.names=FALSE)\nread.table("mydata.csv", header=TRUE, sep=",")` ,
      output: `  Name Age\n1  Ali  21\n2 Sara  22` ,
      interpretation: `We created a data frame, saved it to a CSV file, and then read it back into R. This shows how R interacts with files, a skill that is critical since most data comes from external sources.`,
      exercise: "Read a dataset, rename columns, and save it as 'students.csv'."
    },
    {
      title: "Lab 4: Generating and Manipulating Data",
      example: `x <- seq(1,5,0.5)\ny <- rnorm(10, mean=0, sd=1)\nmean(y); var(y)` ,
      output: `Mean close to 0, variance close to 1 (random values).` ,
      interpretation: `We generated a sequence and random numbers from a normal distribution, then calculated the mean and variance. This illustrates how R can create reproducible simulations as well as deterministic data.`,
      exercise: "Generate 50 uniform random numbers and plot a histogram."
    },
    {
      title: "Lab 5: Data Manipulation – Indexing and Operators",
      example: `x <- -5:5\nx[x < 0] <- 0\nx` ,
      output: `[1] 0 0 0 0 0 0 1 2 3 4 5` ,
      interpretation: `We created a sequence of integers from -5 to 5, then replaced negative values with 0 using logical indexing. Logical indexing makes it easy to clean or transform data without loops.`,
      exercise: "Create a vector of 20 random numbers and replace all negatives with 0."
    },
    {
      title: "Lab 6: Introduction to Graphics in R",
      example: `x <- 1:10\ny <- x^2\nplot(x,y, main="y = x^2", xlab="x", ylab="y")` ,
      output: "A scatterplot of x vs y showing a quadratic curve." ,
      interpretation: `We used plot() to display the quadratic relationship between x and y. R makes data visualization simple yet powerful, which is crucial for data exploration.`,
      exercise: "Plot x vs sqrt(x) for x=1:20 with axis labels and a title."
    },
    {
      title: "Lab 7: Customizing Graphics",
      example: `x <- seq(0, 2*pi, 0.1)\ny <- sin(x)\nplot(x, y, type="l", col="blue", lwd=2, main="Sine Curve", xlab="x", ylab="sin(x)")` ,
      output: "A sine curve with blue line and custom labels." ,
      interpretation: `We plotted a sine curve and added style options (color, line width, labels). Customization helps create publication-ready figures.`,
      exercise: "Reproduce a plot of cos(x) with a red dashed line and proper labels."
    },
    {
      title: "Lab 8: Statistical Analysis – ANOVA and Regression",
      example: `data(InsectSprays)\naov.spray <- aov(count ~ spray, data=InsectSprays)\nsummary(aov.spray)` ,
      output: `Df Sum Sq Mean Sq F value Pr(>F)\nspray  5  2669   534   34.7  <2e-16 ***` ,
      interpretation: `We performed an ANOVA on insect counts across sprays. The very small p-value indicates significant differences. This lab shows how R conducts hypothesis testing and outputs interpretable results.`,
      exercise: "Use the iris dataset to test if Sepal.Length differs across species using ANOVA."
    },
    {
      title: "Lab 9: Programming with R",
      example: `myfact <- function(n){\n result <- 1\n for(i in 1:n){result <- result * i}\n return(result)}\nmyfact(5)` ,
      output: `[1] 120` ,
      interpretation: `We defined a function to calculate factorials using a for loop. This introduces basic programming in R, highlighting that R is a full programming language.`,
      exercise: "Use apply() to calculate the row means of a 5x5 random matrix."
    },
    {
      title: "Lab 10: Writing Your Own Functions",
      example: `mystd <- function(x){(x - mean(x))/sd(x)}\nvalues <- c(1,2,3,4,5)\nmystd(values)` ,
      output: `[-1.2649 -0.6325 0.0000 0.6325 1.2649]` ,
      interpretation: `We created a standardization function to scale data. This illustrates how user-defined functions make analyses flexible and reusable.`,
      exercise: "Write a function that returns both mean and variance of a numeric vector."
    },
    {
      title: "Lab 11: Loading and Saving Data – Built-in, CSV, TXT",
      example: `# Built-in dataset (mtcars)\ndata(mtcars)\nhead(mtcars)\ndim(mtcars)\nnames(mtcars)\n\n# External dataset (CSV file)\nmycsv <- read.table("mydata.csv", header=TRUE, sep=",", na.strings="?")\nhead(mycsv)\ndim(mycsv)\nnames(mycsv)\nmycsv_clean <- na.omit(mycsv)\ndim(mycsv_clean)\n\n# External dataset (TXT file, tab-delimited)\nmytxt <- read.table("mydata.txt", header=TRUE, sep="\t", na.strings="?")\nhead(mytxt)\ndim(mytxt)\nnames(mytxt)\n\n# Saving data to a file\nwrite.table(mtcars, "c:/temp/mtcars_export.csv", sep=",", row.names=FALSE)` ,
      output: `Built-in: 32 rows, 11 columns (mtcars).\nCSV: depends on the file used.\nTXT: depends on the file used.\nwrite.table(): creates a CSV file at c:/temp/mtcars_export.csv.` ,
      interpretation: `This lab demonstrates loading and saving data. We load 'mtcars', a built-in dataset from the 1974 Motor Trend US magazine. Then, we show how to import CSV and TXT files with read.table(), specifying separators and missing values. Finally, we save 'mtcars' to a CSV file at c:/temp/mtcars_export.csv using write.table(). This provides a full workflow: load, explore, clean, and export data.`,
      exercise: `1. Load the built-in dataset 'iris'. Display its first 6 rows, dimensions, and variable names.\n2. Save it as both 'iris.csv' and 'iris.txt' (tab-delimited) to c:/temp using write.table().\n3. Reload both files with read.table() and compare the dimensions with the original.`
    }
  ];

  const visibleLabs = labs.filter((lab, idx) => {
    const matchesQuery = `${lab.title} ${lab.interpretation} ${lab.exercise}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "done" ? completedLabs.includes(idx) : !completedLabs.includes(idx));
    return matchesQuery && matchesFilter;
  });

  const progress = Math.round((completedLabs.length / labs.length) * 100);
  const nextLab = labs.findIndex((_, idx) => !completedLabs.includes(idx));
  const openSelected = idx => {
    setOpenLab(idx);
    requestAnimationFrame(() => document.getElementById(`lab-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="platform-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to course overview">
          <span className="brand-mark">R</span><span><b>R Labs</b><small>Learning platform</small></span>
        </button>
        <div className="header-progress"><span>{completedLabs.length} of {labs.length} labs complete</span><div><i style={{ width: `${progress}%` }}/></div><b>{progress}%</b></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow"/><div className="hero-copy">
            <span className="eyebrow"><Sparkles/> Learn R by doing</span>
            <h1>Build confidence in R,<br/><em>one lab at a time.</em></h1>
            <p>Eleven guided university-level labs where students connect runnable code, expected output, statistical interpretation and hands-on practice.</p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={() => openSelected(nextLab < 0 ? 0 : nextLab)}><Play/> {nextLab < 0 ? "Review the course" : `Continue with Lab ${nextLab + 1}`}</button>
              <button className="quiet-action" type="button" onClick={() => document.getElementById("course-labs")?.scrollIntoView({ behavior: "smooth" })}>Browse all labs <ArrowRight/></button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true"><div className="terminal-card"><div><span/><span/><span/></div><code><b>&gt;</b> x &lt;- c(4, 7, 9, 12)<br/><b>&gt;</b> mean(x)<br/><em>[1] 8</em></code></div><div className="floating-chip"><CheckCircle2/> Progress saved</div></div>
        </section>

        <section className="intro-card">
          <div className="intro-icon"><GraduationCap/></div><div><span className="section-kicker">START HERE</span><h2>{intro.title}</h2><p>{intro.content}</p></div>
          <div className="intro-links"><a href="https://cran.r-project.org" target="_blank" rel="noreferrer">Download R <ArrowRight/></a><a href="https://posit.co/download/rstudio-desktop/" target="_blank" rel="noreferrer">Download RStudio <ArrowRight/></a></div>
        </section>

        <section className="course-section" id="course-labs">
          <div className="section-heading"><div><span className="section-kicker">YOUR STUDENT LEARNING PATH</span><h2>Course labs</h2><p>Work through one university-level lab at a time and move from guided examples to independent statistical practice.</p></div><div className="course-count"><b>{labs.length}</b><span>guided labs</span></div></div>
          <div className="course-toolbar">
            <label className="search-box"><Search/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search labs, topics or tasks…" aria-label="Search labs"/>{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X/></button>}</label>
            <div className="filters" aria-label="Filter labs">{[["all","All"],["todo","To do"],["done","Completed"]].map(([value,label])=><button key={value} type="button" className={filter===value?"active":""} onClick={()=>setFilter(value)}>{label}</button>)}</div>
          </div>

          <div className="course-layout">
            <aside className="roadmap" aria-label="Course roadmap">
              <div className="roadmap-head"><BookOpen/><div><b>Course roadmap</b><span>{progress}% complete</span></div></div>
              <nav>{labs.map((lab, idx)=><button type="button" key={lab.title} className={`${openLab===idx?"active":""} ${completedLabs.includes(idx)?"done":""}`} onClick={()=>openSelected(idx)}><span>{completedLabs.includes(idx)?<Check/>:idx+1}</span><b>{lab.title.replace(/^Lab \d+: /,"")}</b></button>)}</nav>
            </aside>

            <div className="lab-list">
              {visibleLabs.length === 0 && <div className="empty-state"><Search/><h3>No labs found</h3><p>Try another search or change the status filter.</p><button type="button" onClick={()=>{setQuery("");setFilter("all")}}>Show all labs</button></div>}
              {visibleLabs.map((lab) => {
                const idx=labs.indexOf(lab), isOpen=openLab===idx, isDone=completedLabs.includes(idx);
                return <article className={`lab-card ${isOpen?"open":""} ${isDone?"completed":""}`} id={`lab-${idx}`} key={lab.title}>
                  <button className="lab-summary" type="button" onClick={()=>setOpenLab(isOpen?null:idx)} aria-expanded={isOpen}>
                    <span className="lab-number">{isDone?<Check/>:String(idx+1).padStart(2,"0")}</span><span className="lab-title"><small>LAB {idx+1} · GUIDED PRACTICE</small><b>{lab.title.replace(/^Lab \d+: /,"")}</b><em>{lab.interpretation.split(".")[0]}.</em></span><span className="lab-toggle">{isDone&&<small>Completed</small>}<ChevronDown/></span>
                  </button>
                  {isOpen && <div className="lab-content">
                    <section className="code-section"><div className="content-label"><Code2/><span><b>01</b> Run the example</span></div><div className="code-window"><div className="code-top"><span>example.R</span><button onClick={()=>handleCopy(lab.example,idx)} type="button">{copiedIndex===idx?<><Check/>Copied</>:<><CopyIcon/>Copy code</>}</button></div><pre><code>{lab.example}</code></pre></div></section>
                    <section><div className="content-label"><Terminal/><span><b>02</b> Compare the output</span></div><pre className="output-window"><code>{lab.output}</code></pre></section>
                    <section className="explanation"><div className="content-label"><BookOpen/><span><b>03</b> Understand what happened</span></div><p>{lab.interpretation}</p></section>
                    <section className="task-card"><span>YOUR TURN</span><h3>Apply what you learned</h3><p>{lab.exercise}</p></section>
                    <div className="lab-footer"><button type="button" className={isDone?"done":""} onClick={()=>toggleComplete(idx)}>{isDone?<><CheckCircle2/>Completed — mark as incomplete</>:<><Check/>Mark lab as complete</>}</button>{idx<labs.length-1&&<button type="button" className="next-lab" onClick={()=>openSelected(idx+1)}>Next lab <ArrowRight/></button>}</div>
                  </div>}
                </article>
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><span className="brand-mark">R</span><p><b>R Labs Learning Platform</b><br/>Practice, understand, progress.</p><span>Built for university students</span></footer>
    </div>
  );
}
