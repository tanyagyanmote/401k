import { TrendingUp, Calendar, Wallet } from "lucide-react";

interface StatsOverviewProps {
  ytdContributions: number;
  contributionType: "dollar" | "percent";
  dollarAmount: number;
  percentAmount: number;
  annualSalary: number;
}

export function StatsOverview({
  ytdContributions,
  contributionType,
  dollarAmount,
  percentAmount,
  annualSalary,
}: StatsOverviewProps) {
  const paychecksPerYear = 26; // Bi-weekly
  const currentContribution =
    contributionType === "dollar"
      ? dollarAmount
      : (annualSalary / paychecksPerYear) * (percentAmount / 100);

  const projectedAnnual = currentContribution * paychecksPerYear;
  const remainingYear = projectedAnnual - ytdContributions;

  return (
    <div className="grid gap-4">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border border-[#E8DDD0] bg-gradient-to-br from-[#FAF8F5] to-white dark:border-[#f59e0b]/30 dark:from-[#1a1f27] dark:to-[#13171d]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#D4C4B0] dark:bg-[#f59e0b] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-[13px] text-[#8B7355] dark:text-[#f59e0b]">2025 YTD</span>
          </div>
          <div className="space-y-1">
            <div className="text-[28px] tabular-nums tracking-tight text-[#5C4A39] dark:text-[#fbbf24]">
              ${ytdContributions.toLocaleString()}
            </div>
            <div className="text-[14px] text-[#8B7355] dark:text-[#d97706]">
              Total contributions this year
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[#B8C5B7] bg-gradient-to-br from-[#F7F9F7] to-white dark:border-[#14b8a6]/30 dark:from-[#1a1f27] dark:to-[#13171d]">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#8B9E8A] dark:bg-[#14b8a6] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-[13px] text-[#6B7C6A] dark:text-[#14b8a6]">
              Per Paycheck
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-[28px] tabular-nums tracking-tight text-[#4A5A49] dark:text-[#2dd4bf]">
              ${currentContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[14px] text-[#6B7C6A] dark:text-[#0d9488]">
              {contributionType === "percent"
                ? `${percentAmount}% of paycheck`
                : "Fixed amount"}
            </div>
          </div>
        </div>
      </div>

      {/* Projected Annual */}
      <div className="p-6 rounded-xl border border-[#D9A092] bg-gradient-to-br from-[#FAF6F4] to-white dark:border-[#3b82f6]/30 dark:from-[#1a1f27] dark:to-[#13171d]">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#C17B63] dark:bg-[#3b82f6] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-[13px] text-[#A86A54] dark:text-[#3b82f6]">Projected</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-[28px] tabular-nums tracking-tight text-[#8B5A4A] dark:text-[#60a5fa]">
              ${projectedAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[14px] text-[#A86A54] dark:text-[#3b82f6]">
              Total for 2025
            </div>
          </div>
          <div className="pt-3 border-t border-[#E8D5CC] dark:border-[#3b82f6]/20">
            <div className="flex items-baseline gap-2">
              <span className="text-[14px] text-[#A86A54] dark:text-[#3b82f6]">
                Remaining this year:
              </span>
              <span className="text-[15px] tabular-nums text-[#8B5A4A] dark:text-[#60a5fa]">
                ${Math.max(0, remainingYear).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Limit Indicator */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-[#FBF7F7] to-[#FAF8F5] border border-[#E5C1C3] dark:from-[#1a1f27] dark:to-[#13171d] dark:border-[#64748b]/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-[14px] mb-2 text-[#8B6B6D] dark:text-[#94a3b8]">2025 Annual Limit</div>
            <div className="h-2 bg-[#E5C1C3] dark:bg-[#252a33] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C9989B] to-[#D4C4B0] dark:from-[#64748b] dark:to-[#94a3b8] transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(100, (projectedAnnual / 23500) * 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[13px] text-[#A27F82] dark:text-[#64748b]">
                ${projectedAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-[13px] text-[#A27F82] dark:text-[#64748b]">
                $23,500 limit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
