import { Sparkles } from "lucide-react";
import React from "react";

type Props = {
  currentAge: number;
  retirementAge: number;
  annualContribution: number;
};

const ANNUAL_RETURN = 0.07;

const moneyCompact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Math.max(0, n));

function fvAnnuityDue(annual: number, years: number, r: number) {
  if (years <= 0 || annual <= 0) return 0;
  if (r === 0) return annual * years;
  const factor = ((1 + r) ** years - 1) / r;
  return annual * factor * (1 + r);
}

export function RetirementProjection({
  currentAge,
  retirementAge,
  annualContribution,
}: Props) {
  const years = Math.max(0, retirementAge - currentAge);

  const baseFV = fvAnnuityDue(annualContribution, years, ANNUAL_RETURN);

  const bumps = [
    { label: "Extra 1% contribution", multiplier: 1.01 },
    { label: "Extra 5% contribution", multiplier: 1.05 },
  ].map(({ label, multiplier }) => ({
    label,
    delta: fvAnnuityDue(annualContribution * multiplier, years, ANNUAL_RETURN) - baseFV,
  }));

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#8E9AAF] via-[#A89FAD] to-[#C9989B] dark:from-[#1e40af] dark:via-[#0d9488] dark:to-[#3b82f6] text-white shadow-lg shadow-[#8E9AAF]/20 dark:shadow-[#1e40af]/30">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-[15px]">Retirement Projection</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[13px] opacity-80 mb-1">
              Projected value at age {retirementAge}
            </div>
            <div className="text-[36px] tabular-nums tracking-tight">
              {moneyCompact(baseFV)}
            </div>
          </div>

          <div className="pt-4 border-t border-white/20 space-y-2">
            <div className="text-[13px] opacity-90">Based on:</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[13px] opacity-75">Years</div>
                <div className="text-[15px] tabular-nums">{years}</div>
              </div>
              <div>
                <div className="text-[13px] opacity-75">Annual return</div>
                <div className="text-[15px] tabular-nums">
                  {(ANNUAL_RETURN * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card">
        <div className="space-y-3">
          <div className="text-[14px]">Impact of saving more</div>
          <div className="space-y-3">
            {bumps.map(({ label, delta }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[14px] text-muted-foreground">{label}</span>
                <span className="text-[15px] tabular-nums">+{moneyCompact(delta)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-secondary/50 border border-border">
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          This projection assumes a 7% average annual return and doesn't account
          for inflation, fees, or taxes. Past performance doesn't guarantee
          future results. Consider consulting a financial advisor for
          personalized advice.
        </p>
      </div>
    </div>
  );
}
