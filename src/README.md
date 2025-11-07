# 401(k) Contribution Playground

A tiny, local-only app that helps you pick a 401(k) contribution method (fixed dollar vs. percent), adjust the rate with a slider/text input, and instantly see:
- Per-paycheck contribution
- Year-to-date (YTD) mock contributions
- Projected annual total + progress toward the annual limit
- (Optional) A simple retirement impact estimate (e.g., “+1% more”)

---

## ✨ Features

- **Contribution Type:** Choose **Fixed Amount ($)** or **Percent of Paycheck (%)**
- **Adjust Rate:** Use a slider or type a value (both stay in sync)
- **Display Key Data:** Mock **YTD contributions**, **per-paycheck**, and **annual projection**
- **Annual Limit Bar:** Visual progress toward the current annual limit
- **Impact Preview (Optional):** See how an extra +1% or +5% could grow by retirement (illustrative only)

---

## 🧰 Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** `lucide-react`
- **Build Tool:** Vite (dev server + build)

No backend. All data is mocked on the client so it runs instantly.

---

## 🚀 Quick Start

**Prereqs:** Node 18+ and npm (or yarn/pnpm)

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Open the URL printed in the terminal (usually http://localhost:5173)
