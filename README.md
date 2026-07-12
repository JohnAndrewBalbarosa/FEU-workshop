# FEU-workshop

## Overview

Portfolio + private dashboard monorepo

Repository: [JohnAndrewBalbarosa/FEU-workshop](https://github.com/JohnAndrewBalbarosa/FEU-workshop)

## Problem and Goal

**Problem.** A public project portfolio and a private management dashboard have different exposure and authentication requirements but share deployment and content workflows.

**Goal.** Maintain both surfaces in one monorepo while keeping private dashboard access environment-gated.

## System Design

- `portfolio/`: public Vite/React portfolio.
- `dashboard/`: private Next.js dashboard and server-side actions.
- Root package scripts coordinate workspaces; `vercel.json` defines deployment behavior.

## Setup and Usage

```bash
npm install
npm run dev

# Or run a workspace directly
npm --prefix portfolio run dev
npm --prefix dashboard run dev
```

## Evaluation Method

- Define the project task and expected behavior.
- Run representative examples or user flows.
- Record correctness, speed, reliability, usability, and failure cases.

## Results

- No validated quantitative results are published yet.
- Current README status: implementation and usage are documented before formal measurement.

## Interpretation

- The project can be described as implemented or in progress, but impact claims should stay limited until measurements are collected.
- Use the evaluation plan below to turn the project into resume-ready, evidence-backed work.

## Limitations

- Results should only be treated as validated when this README includes the dataset, sample size, metric definition, and reproduction steps.
- Any AI-generated, OCR-based, scraped, or heuristic output requires manual review before being used as ground truth.
- Environment-dependent measurements such as latency, memory use, browser behavior, and API reliability should be re-measured on the target machine.

## Recommendations and Future Work

- Add a small benchmark or validation dataset.
- Report sample size, success rate, error rate, and runtime where applicable.
- Add screenshots, logs, or exported reports that support the measured results.

## Documentation Standard

This README follows a technical-project structure: overview, goal, system design, setup, evaluation method, results, interpretation, limitations, and recommendations. Update the Results section whenever new measurements are available so project claims stay evidence-backed.
