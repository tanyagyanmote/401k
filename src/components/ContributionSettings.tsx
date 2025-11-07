import { DollarSign, Percent } from "lucide-react";
import React from "react";

type ContributionKind = "dollar" | "percent";
type AccountKind = "traditional" | "roth";

interface ContributionSettingsProps {
  contributionType: ContributionKind;
  setContributionType: (type: ContributionKind) => void;
  dollarAmount: number;
  setDollarAmount: (amount: number) => void;
  percentAmount: number;
  setPercentAmount: (percent: number) => void;
  accountType: AccountKind;
  setAccountType: (type: AccountKind) => void;
}

/* ---------- helpers ---------- */

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const cardBase =
  "relative p-5 rounded-xl border-2 transition-all duration-200 bg-card";
const cardSelected = "bg-[#F7F8FA] dark:bg-[#1a1f27]";
const iconBoxBase =
  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200";
const inputShellBase =
  "relative w-full rounded-xl border-2 bg-card transition-all duration-200 focus-within:scale-[1.01]";
const inputBase =
  "w-full px-6 py-5 rounded-xl bg-transparent text-[32px] tabular-nums outline-none";

/* ---------- tiny building blocks ---------- */

function OptionCard({
  selected,
  onClick,
  title,
  subtitle,
  accentSelected,
  accentHover,
  rightDotColor,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  accentSelected: string;
  accentHover: string;
  rightDotColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`${cardBase} ${
        selected
          ? `${cardSelected} border-[${accentSelected}]`
          : `border-border hover:border-[${accentHover}]`
      } flex items-center gap-3`}
    >
      {children}
      <div className="text-left">
        <div className="text-[15px] font-medium">{title}</div>
        <div className="text-[13px] text-muted-foreground leading-relaxed">
          {subtitle}
        </div>
      </div>
      {selected && rightDotColor && (
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{ backgroundColor: rightDotColor }}
        />
      )}
    </button>
  );
}

function AmountControl({
  value,
  setValue,
  min,
  max,
  step,
  label,
  hint,
  prefix,
  suffix,
  accentBorder,
  accentShadow,
  sliderStep,
}: {
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  sliderStep?: number;
  label: string;
  hint: string;
  prefix?: string;
  suffix?: string;
  accentBorder: string; // e.g. "#8B9E8A"
  accentShadow: string; // e.g. "#8B9E8A"
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-1">{label}</h3>
        <p className="text-[15px] text-muted-foreground">{hint}</p>
      </div>

      <div
        className={`${inputShellBase}`}
        style={{
          boxShadow: "none",
        }}
      >
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={(e) => setValue(clamp(Number(e.target.value || 0), min, max))}
          className={`${inputBase}`}
          style={{
            borderColor: "var(--border)",
          }}
        />
        {prefix ? (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[32px] text-muted-foreground pointer-events-none">
            {prefix}
          </div>
        ) : null}
        {suffix ? (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[32px] text-muted-foreground pointer-events-none">
            {suffix}
          </div>
        ) : null}
        <style>{`
          .focus-within\\:shadow-accent:focus-within {
            box-shadow: 0 10px 24px 0 ${accentShadow}1A;
            border-color: ${accentBorder};
          }
        `}</style>
      </div>

      <div className="px-2">
        <input
          type="range"
          min={min}
          max={max}
          step={sliderStep ?? step ?? 1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between mt-3 text-[13px] text-muted-foreground">
          <span>
            {prefix}
            {min}
            {suffix}
          </span>
          <span>
            {prefix}
            {max}
            {suffix}
          </span>
        </div>
      </div>
    </div>
  );
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
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="mb-1">Account Type</h3>
          <p className="text-[15px] text-muted-foreground">
            Choose how your contributions are taxed
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <OptionCard
            selected={accountType === "traditional"}
            onClick={() => setAccountType("traditional")}
            title="Traditional"
            subtitle="Pre-tax contributions, taxed at withdrawal"
            accentSelected="#8E9AAF"
            accentHover="#B8C2D4"
            rightDotColor="#8E9AAF"
          />
          <OptionCard
            selected={accountType === "roth"}
            onClick={() => setAccountType("roth")}
            title="Roth"
            subtitle="After-tax contributions, tax-free withdrawals"
            accentSelected="#C9989B"
            accentHover="#E5C1C3"
            rightDotColor="#C9989B"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-1">Contribution Method</h3>
          <p className="text-[15px] text-muted-foreground">
            Set a fixed amount or percentage of your paycheck
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <OptionCard
            selected={contributionType === "dollar"}
            onClick={() => setContributionType("dollar")}
            title="Fixed Amount"
            subtitle="Per paycheck"
            accentSelected="#8B9E8A"
            accentHover="#B8C5B7"
          >
            <div
              className={`${iconBoxBase} ${
                contributionType === "dollar"
                  ? "bg-[#8B9E8A] text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              <DollarSign className="w-5 h-5" />
            </div>
          </OptionCard>

          <OptionCard
            selected={contributionType === "percent"}
            onClick={() => setContributionType("percent")}
            title="Percentage"
            subtitle="Of salary"
            accentSelected="#C17B63"
            accentHover="#D9A092"
          >
            <div
              className={`${iconBoxBase} ${
                contributionType === "percent"
                  ? "bg-[#C17B63] text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              <Percent className="w-5 h-5" />
            </div>
          </OptionCard>
        </div>
      </div>

      <div className="space-y-6">
        {contributionType === "dollar" ? (
          <AmountControl
            value={dollarAmount}
            setValue={(v) => setDollarAmount(clamp(v, 0, 1000))}
            min={0}
            max={1000}
            step={10}
            sliderStep={10}
            label="Contribution Amount"
            hint="How much would you like to contribute per paycheck?"
            suffix="$"
            accentBorder="#8B9E8A"
            accentShadow="#8B9E8A"
          />
        ) : (
          <AmountControl
            value={percentAmount}
            setValue={(v) => setPercentAmount(clamp(v, 0, 100))}
            min={0}
            max={100}
            step={0.5}
            sliderStep={0.5}
            label="Contribution Percentage"
            hint="What percentage of your salary would you like to contribute?"
            suffix="%"
            accentBorder="#C17B63"
            accentShadow="#C17B63"
          />
        )}
      </div>
    </div>
  );
}
