import { useState, useEffect } from "react";
import { ContributionSettings } from "./components/ContributionSettings";
import { StatsOverview } from "./components/StatsOverview";
import { RetirementProjection } from "./components/RetirementProjection";
import { Save, User, Moon, Sun } from "lucide-react";
import React from "react";

export default function App() {
  // Mock user data
  const annualSalary = 85000;
  const currentAge = 30;
  const retirementAge = 65;
  const ytdContributions = 4250; // YTD as of November

  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark";
    }
    return false;
  });

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // State for contribution settings
  const [contributionType, setContributionType] = useState<"dollar" | "percent">("percent");
  const [dollarAmount, setDollarAmount] = useState(300);
  const [percentAmount, setPercentAmount] = useState(6);
  const [accountType, setAccountType] = useState<"traditional" | "roth">("traditional");
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const paychecksPerYear = 26;
  const currentContribution =
    contributionType === "dollar"
      ? dollarAmount
      : (annualSalary / paychecksPerYear) * (percentAmount / 100);
  const projectedAnnual = currentContribution * paychecksPerYear;

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background grid-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B7355] to-[#A68B76] dark:from-[#3b82f6] dark:to-[#14b8a6] flex items-center justify-center shadow-sm">
                <span className="text-white text-[14px]">HI</span>
              </div>
              <h1 className="text-[17px]">Human Interest</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-secondary hover:bg-muted transition-all border border-border"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-muted transition-all border border-border">
                <User className="w-4 h-4" />
                <span className="text-[14px]">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="mb-2">Manage Your 401(k) Contributions</h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl leading-relaxed">
            Adjust your contribution settings to reach your retirement goals. Your
            changes will take effect starting with your next paycheck.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Settings */}
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-border bg-card">
              <ContributionSettings
                contributionType={contributionType}
                setContributionType={setContributionType}
                dollarAmount={dollarAmount}
                setDollarAmount={setDollarAmount}
                percentAmount={percentAmount}
                setPercentAmount={setPercentAmount}
                accountType={accountType}
                setAccountType={setAccountType}
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#8B7355] to-[#A68B76] dark:from-[#3b82f6] dark:to-[#14b8a6] text-white hover:from-[#7A6349] hover:to-[#947B68] dark:hover:from-[#2563eb] dark:hover:to-[#0d9488] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#8B7355]/20 dark:shadow-[#3b82f6]/30 hover:shadow-xl hover:shadow-[#8B7355]/30 dark:hover:shadow-[#3b82f6]/40 active:scale-[0.99]"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            {/* Save Notification */}
            {showSaveNotification && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#8B9E8A] to-[#A8B5A7] dark:from-[#047857] dark:to-[#14b8a6] text-white shadow-lg shadow-[#8B9E8A]/20 dark:shadow-[#047857]/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-[14px]">
                    Your contribution settings have been saved
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Projections */}
          <div className="space-y-6">
            <StatsOverview
              ytdContributions={ytdContributions}
              contributionType={contributionType}
              dollarAmount={dollarAmount}
              percentAmount={percentAmount}
              annualSalary={annualSalary}
            />

            <RetirementProjection
              currentAge={currentAge}
              retirementAge={retirementAge}
              annualContribution={projectedAnnual}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 rounded-xl border border-border bg-card">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-[14px] mb-1">Your Annual Salary</div>
              <div className="text-[20px] tabular-nums">
                ${annualSalary.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[14px] mb-1">Pay Frequency</div>
              <div className="text-[20px]">Bi-weekly</div>
              <div className="text-[13px] text-muted-foreground">
                26 paychecks/year
              </div>
            </div>
            <div>
              <div className="text-[14px] mb-1">Current Age</div>
              <div className="text-[20px] tabular-nums">{currentAge}</div>
              <div className="text-[13px] text-muted-foreground">
                {retirementAge - currentAge} years until retirement
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-muted-foreground">
              © 2025 Human Interest. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
