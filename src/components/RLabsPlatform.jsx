import React, { useState } from "react";
import { CheckCircle, Copy as CopyIcon } from "lucide-react";

export default function RLabsPlatform() {
  const [completedLabs, setCompletedLabs] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: 24 }}>
      <h1 style={{ textAlign: 'center', fontSize: 36, marginBottom: 40 }}>🌱 R Labs Learning Platform</h1>

      <div style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, marginBottom: 40, borderLeft: '6px solid #3b82f6' }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>{intro.title}</h2>
        <p style={{ color: '#374151', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{intro.content}</p>
      </div>

      <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {labs.map((lab, idx) => (
          <div key={`${lab.title}-${idx}`} style={{ position: 'relative', background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', borderRadius: 16, padding: 24, border: completedLabs.includes(idx) ? '2px solid #10b981' : '1px solid #e5e7eb', transition: 'transform .12s' }}>
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 18, marginBottom: 12 }}>
              {lab.title}
              {completedLabs.includes(idx) && <CheckCircle color="#10b981" />}
            </h2>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>Example R Code:</p>
              <div style={{ position: 'relative' }}>
                <pre style={{ background: '#111827', color: '#bbf7d0', padding: 12, borderRadius: 8, fontSize: 13, overflowX: 'auto' }}>{lab.example}</pre>
                <button onClick={() => handleCopy(lab.example, idx)} style={{ position: 'absolute', top: 8, right: 8, background: '#374151', color: '#fff', padding: '6px 8px', borderRadius: 6, display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, border: 'none', cursor: 'pointer' }} type="button">
                  {copiedIndex === idx ? 'Copied!' : <><CopyIcon size={14} /> Copy</>}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <p style={{ fontWeight: 600, marginBottom: 6 }}>Expected Output:</p>
              <pre style={{ background: '#f3f4f6', padding: 8, borderRadius: 6, fontSize: 13, overflowX: 'auto' }}>{lab.output}</pre>
            </div>

            <div style={{ marginBottom: 12 }}>
              <p style={{ fontWeight: 600, marginBottom: 6 }}>Step-by-step Interpretation:</p>
              <p style={{ color: '#374151', fontSize: 13, lineHeight: 1.5 }}>{lab.interpretation}</p>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <p style={{ fontWeight: 600, marginBottom: 6 }}>📝 Task:</p>
              <p style={{ color: '#374151', fontSize: 13, whiteSpace: 'pre-line' }}>{lab.exercise}</p>
            </div>

            <button onClick={() => toggleComplete(idx)} type="button" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, fontWeight: 700, background: completedLabs.includes(idx) ? '#10b981' : '#e5e7eb', color: completedLabs.includes(idx) ? '#fff' : '#111827', border: 'none', cursor: 'pointer' }}>
              {completedLabs.includes(idx) ? '✔ Completed' : 'Mark as Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
