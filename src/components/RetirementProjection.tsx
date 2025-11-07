import { Sparkles } from "lucide-react";
import React from "react";

interface RetirementProjectionProps {
  currentAge: number;
  retirementAge: number;
  annualContribution: number;
}

export function RetirementProjection({
  currentAge,
  retirementAge,
  annualContribution,
}: RetirementProjectionProps) {
  // Simple compound interest calculation
  // Assuming 7% average annual return (historical S&P 500 average)
  const annualReturn = 0.07;
  const yearsToRetirement = retirementAge - currentAge;

  const calculateFutureValue = (annual: number) => {
    let total = 0;
    for (let year = 0; year < yearsToRetirement; year++) {
      total = (total + annual) * (1 + annualReturn);
    }
    return total;
  };

  const projectedValue = calculateFutureValue(annualContribution);
  const currentPlanValue = calculateFutureValue(annualContribution);

  // Calculate what an extra 1% would be worth
  const extraOnePercent = calculateFutureValue(annualContribution * 1.01);
  const differenceOnePercent = extraOnePercent - currentPlanValue;

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toFixed(0)}`;
  };

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
              {formatLargeNumber(projectedValue)}
            </div>
          </div>
          <div className="pt-4 border-t border-white/20 space-y-2">
            <div className="text-[13px] opacity-90">Based on:</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[13px] opacity-75">Years</div>
                <div className="text-[15px] tabular-nums">
                  {yearsToRetirement}
                </div>
              </div>
              <div>
                <div className="text-[13px] opacity-75">Annual return</div>
                <div className="text-[15px] tabular-nums">7%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-border bg-card">
        <div className="space-y-3">
          <div className="text-[14px]">Impact of saving more</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-muted-foreground">
                Extra 1% contribution
              </span>
              <span className="text-[15px] tabular-nums">
                +{formatLargeNumber(differenceOnePercent)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-muted-foreground">
                Extra 5% contribution
              </span>
              <span className="text-[15px] tabular-nums">
                +
                {formatLargeNumber(
                  calculateFutureValue(annualContribution * 1.05) -
                    currentPlanValue
                )}
              </span>
            </div>
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
