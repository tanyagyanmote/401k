import { useState } from "react";
import { DollarSign, Percent } from "lucide-react";

interface ContributionSettingsProps {
  contributionType: "dollar" | "percent";
  setContributionType: (type: "dollar" | "percent") => void;
  dollarAmount: number;
  setDollarAmount: (amount: number) => void;
  percentAmount: number;
  setPercentAmount: (percent: number) => void;
  accountType: "traditional" | "roth";
  setAccountType: (type: "traditional" | "roth") => void;
}

export function ContributionSettings({
  contributionType,
  setContributionType,
  dollarAmount,
  setDollarAmount,
  percentAmount,
  setPercentAmount,
  accountType,
  setAccountType,
}: ContributionSettingsProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Account Type Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="mb-1">Account Type</h3>
          <p className="text-[15px] text-muted-foreground">
            Choose how your contributions are taxed
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setAccountType("traditional")}
            className={`
              relative p-5 rounded-xl border-2 transition-all duration-200
              ${
                accountType === "traditional"
                  ? "border-[#8E9AAF] bg-[#F7F8FA] dark:border-[#3b82f6] dark:bg-[#1a1f27]"
                  : "border-border bg-card hover:border-[#B8C2D4] dark:hover:border-[#3b82f6]/50"
              }
            `}
          >
            <div className="flex flex-col items-start gap-2">
              <div className="text-[15px] font-medium">Traditional</div>
              <div className="text-[13px] text-muted-foreground text-left leading-relaxed">
                Pre-tax contributions, taxed at withdrawal
              </div>
            </div>
            {accountType === "traditional" && (
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#8E9AAF] dark:bg-[#3b82f6]" />
            )}
          </button>
          <button
            onClick={() => setAccountType("roth")}
            className={`
              relative p-5 rounded-xl border-2 transition-all duration-200
              ${
                accountType === "roth"
                  ? "border-[#C9989B] bg-[#FBF7F7] dark:border-[#14b8a6] dark:bg-[#1a1f27]"
                  : "border-border bg-card hover:border-[#E5C1C3] dark:hover:border-[#14b8a6]/50"
              }
            `}
          >
            <div className="flex flex-col items-start gap-2">
              <div className="text-[15px] font-medium">Roth</div>
              <div className="text-[13px] text-muted-foreground text-left leading-relaxed">
                After-tax contributions, tax-free withdrawals
              </div>
            </div>
            {accountType === "roth" && (
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#C9989B] dark:bg-[#14b8a6]" />
            )}
          </button>
        </div>
      </div>

      {/* Contribution Type Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="mb-1">Contribution Method</h3>
          <p className="text-[15px] text-muted-foreground">
            Set a fixed amount or percentage of your paycheck
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setContributionType("dollar")}
            className={`
              relative p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3
              ${
                contributionType === "dollar"
                  ? "border-[#8B9E8A] bg-[#F7F9F7] dark:border-[#14b8a6] dark:bg-[#1a1f27]"
                  : "border-border bg-card hover:border-[#B8C5B7] dark:hover:border-[#14b8a6]/50"
              }
            `}
          >
            <div
              className={`
              w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
              ${
                contributionType === "dollar"
                  ? "bg-[#8B9E8A] text-white dark:bg-[#14b8a6]"
                  : "bg-secondary text-foreground"
              }
            `}
            >
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-[15px] font-medium">Fixed Amount</div>
              <div className="text-[13px] text-muted-foreground">
                Per paycheck
              </div>
            </div>
          </button>
          <button
            onClick={() => setContributionType("percent")}
            className={`
              relative p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3
              ${
                contributionType === "percent"
                  ? "border-[#C17B63] bg-[#FAF6F4] dark:border-[#3b82f6] dark:bg-[#1a1f27]"
                  : "border-border bg-card hover:border-[#D9A092] dark:hover:border-[#3b82f6]/50"
              }
            `}
          >
            <div
              className={`
              w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
              ${
                contributionType === "percent"
                  ? "bg-[#C17B63] text-white dark:bg-[#3b82f6]"
                  : "bg-secondary text-foreground"
              }
            `}
            >
              <Percent className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-[15px] font-medium">Percentage</div>
              <div className="text-[13px] text-muted-foreground">Of salary</div>
            </div>
          </button>
        </div>
      </div>

      {/* Amount Adjustment */}
      <div className="space-y-6">
        {contributionType === "dollar" ? (
          <div className="space-y-4">
            <div>
              <h3 className="mb-1">Contribution Amount</h3>
              <p className="text-[15px] text-muted-foreground">
                How much would you like to contribute per paycheck?
              </p>
            </div>
            <div className="space-y-5">
              <div
                className={`
                relative transition-all duration-200
                ${focusedInput === "dollar" ? "scale-[1.01]" : ""}
              `}
              >
                <input
                  type="number"
                  value={dollarAmount}
                  onChange={(e) =>
                    setDollarAmount(Math.max(0, Number(e.target.value)))
                  }
                  onFocus={() => setFocusedInput("dollar")}
                  onBlur={() => setFocusedInput(null)}
                  className={`
                    w-full px-6 py-5 rounded-xl border-2 bg-card
                    transition-all duration-200 text-[32px] tabular-nums
                    ${
                      focusedInput === "dollar"
                        ? "border-[#8B9E8A] shadow-lg shadow-[#8B9E8A]/10 dark:border-[#14b8a6] dark:shadow-[#14b8a6]/20"
                        : "border-border"
                    }
                  `}
                  placeholder="$0"
                  min="0"
                  max="1000"
                />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[32px] text-muted-foreground pointer-events-none">
                  $
                </div>
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={dollarAmount}
                  onChange={(e) => setDollarAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-3">
                  <span className="text-[13px] text-muted-foreground">$0</span>
                  <span className="text-[13px] text-muted-foreground">
                    $1,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="mb-1">Contribution Percentage</h3>
              <p className="text-[15px] text-muted-foreground">
                What percentage of your salary would you like to contribute?
              </p>
            </div>
            <div className="space-y-5">
              <div
                className={`
                relative transition-all duration-200
                ${focusedInput === "percent" ? "scale-[1.01]" : ""}
              `}
              >
                <input
                  type="number"
                  value={percentAmount}
                  onChange={(e) =>
                    setPercentAmount(
                      Math.min(100, Math.max(0, Number(e.target.value)))
                    )
                  }
                  onFocus={() => setFocusedInput("percent")}
                  onBlur={() => setFocusedInput(null)}
                  className={`
                    w-full px-6 py-5 rounded-xl border-2 bg-card
                    transition-all duration-200 text-[32px] tabular-nums
                    ${
                      focusedInput === "percent"
                        ? "border-[#C17B63] shadow-lg shadow-[#C17B63]/10 dark:border-[#3b82f6] dark:shadow-[#3b82f6]/20"
                        : "border-border"
                    }
                  `}
                  placeholder="0"
                  min="0"
                  max="100"
                  step="0.5"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[32px] text-muted-foreground pointer-events-none">
                  %
                </div>
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={percentAmount}
                  onChange={(e) => setPercentAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-3">
                  <span className="text-[13px] text-muted-foreground">0%</span>
                  <span className="text-[13px] text-muted-foreground">
                    100%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
