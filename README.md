# BS Flux Sol — Balance Sheet Flux Dashboard

An AI-orchestrated **balance sheet flux reporting** dashboard. A ground-up rebuild
of a reference dashboard, implemented as a self-contained Vite + React app with
**no runtime data dependencies** — all figures are synthetic and illustrative
(FY 2025, Period 12).

The app runs four analytical workflows end-to-end, plus an agentic process view:

| Module | What it does |
| --- | --- |
| **BS Flux Analysis** | Account-level Actual vs Budget vs Prior-Year variance table, KPI cards, visual analytics bar chart, variance summary and top-variance ranking. |
| **Commentary** | Per-account commentary workflow — assign owners, draft & save Budget/PY explanations, track Assigned → Submitted → Approved progress. |
| **Anomaly Intelligence** | Statistical (z-score), seasonal, trend-break, benchmark and peer anomaly detection with a risk heat map, 6-period trend sparklines and regional benchmarks. |
| **What-If Analysis** | Anomaly-impact simulator: correction sliders drive live recalculation of net position, variance-to-budget, AR days, liquidity and forecast confidence, with a scenario waterfall. |
| **Process Flow & RAC House** | Agent orchestration architecture + a runnable agent-execution simulation and full agent roster. |

An **operating-company toggle** (Power Delivery / Gas Distribution / Water Utility /
Holdco-Consolidated) rescales every module so the whole dashboard stays interactive
across OpCos. Demo data uses FERC-style utility line items (regulatory assets, CWIP,
accrued unbilled revenue, storm-cost deferrals, CIAC).

## Branding

Styled to Avangrid's clean-energy identity:

- **Deep green** `#00402A` · **leaf-green accent** `#00A443` · **blue** `#0063BE` · sage `#A2BCB1`
- Humanist sans type (Mulish display / Inter UI) approximating Avangrid's IberPangea
- Header lockup: leaf mark + `avangrid` wordmark alongside the BS Flux Sol product name

The logo in `src/components/AvangridLogo.jsx` is a brand-aligned representation
(correct palette + leaf mark), not the trademarked vector artwork. To use the official
logo, save it as `src/assets/avangrid-logo.svg` and swap the mark for an `<img>`.
Brand elements are included for internal-tool alignment on a synthetic demo.

## Tech

- [Vite](https://vite.dev/) + [React 18](https://react.dev/)
- Zero chart/UI libraries — bar charts, sparklines, heat maps and the waterfall
  are hand-rolled SVG/CSS, so `npm install` is fast and the bundle is tiny.

## Run it

```bash
npm install
npm run dev      # http://localhost:5180
```

Build a static bundle:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Structure

```
src/
  App.jsx                 # shell: header, region toggle, tab nav
  data.js                 # synthetic data model + formatting helpers
  styles.css              # design system / all styling
  components/
    ProcessFlow.jsx        # agentic architecture + simulation + roster
    FluxAnalysis.jsx       # KPIs, flux table, analytics, variance summary
    Commentary.jsx         # commentary workflow
    AnomalyIntelligence.jsx# anomaly detection, heat map, benchmarks
    WhatIf.jsx             # simulator + scenario waterfall
    Sparkline.jsx          # reusable SVG sparkline
```

> All numbers, account names and commentary are illustrative demo content.
