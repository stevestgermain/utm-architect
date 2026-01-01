import React, { useState, useEffect } from "react";
import {
  Globe,
  Share2,
  Tag,
  FileText,
  MousePointer,
  Copy,
  RotateCcw,
  Check,
  Zap,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon
} from "lucide-react";
import { Input } from "./ui/Input";
import { buildUtmUrl, UTMParams } from "../utils/utm";

export const UTMForm: React.FC = () => {
  const [params, setParams] = useState<UTMParams>({
    baseUrl: "",
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: ""
  });

  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    setGeneratedUrl(buildUtmUrl(params));
  }, [params]);

  const handleChange =
    (field: keyof UTMParams) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setParams((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setParams({
      baseUrl: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: ""
    });
  };

  const fillPreset = (source: string, medium: string) => {
    setParams((prev) => ({ ...prev, source, medium }));
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-200 dark:border-zinc-700 p-6">
      {/* --- ZONE 1: DESTINATION --- */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
            Destination
          </span>
        </div>
        <Input
          placeholder="https://example.com"
          value={params.baseUrl}
          onChange={handleChange("baseUrl")}
          autoFocus
        />
        <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500 px-1">
          Enter the full website URL where you want to send traffic.
        </p>
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-zinc-800 mb-6"></div>

      {/* --- ZONE 2: CONFIGURATION --- */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Configuration
            </span>
          </div>
        </div>

        {/* The Corral: Groups all inputs visually */}
        <div className="rounded-2xl border border-gray-200 dark:border-zinc-700 p-5">
          {/* Distinct Quick Fill Section - Collapsible */}
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200/60 dark:border-zinc-700 mb-5 overflow-hidden transition-all">
            <button
              onClick={() => setShowPresets(!showPresets)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-100/50 dark:hover:bg-zinc-800/70 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Campaign Presets
                </span>
              </div>
              {showPresets ? (
                <ChevronUp className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              ) : (
                <ChevronDown className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              )}
            </button>

            {showPresets && (
              <div className="px-3 pb-3 grid grid-cols-2 gap-2 animate-in slide-in-from-top-2 duration-200 fade-in">
                {[
                  { label: "Email", source: "email", medium: "email" },
                  { label: "Display Ad", source: "display", medium: "display" },
                  {
                    label: "Paid Social",
                    source: "social",
                    medium: "paid_social"
                  },
                  { label: "Paid Search", source: "google", medium: "cpc" },
                  {
                    label: "Organic Social",
                    source: "social",
                    medium: "organic_social"
                  },
                  { label: "Referral", source: "partner", medium: "referral" },
                  { label: "QR / Offline", source: "offline", medium: "qr" }
                ].map((preset, idx) => (
                  <button
                    key={preset.label}
                    onClick={() => fillPreset(preset.source, preset.medium)}
                    className={
                      "px-3 py-2 text-[11px] font-semibold bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-600 dark:text-gray-200 shadow-sm hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all text-left" +
                      (preset.label === "QR / Offline" ? " col-span-2 flex justify-center" : "")
                    }
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Source *"
                placeholder="e.g. google"
                value={params.source}
                onChange={handleChange("source")}
              />
              <Input
                label="Medium *"
                placeholder="e.g. cpc"
                value={params.medium}
                onChange={handleChange("medium")}
              />
            </div>

            <Input
              label="Campaign Name *"
              placeholder="e.g. summer_sale"
              value={params.campaign}
              onChange={handleChange("campaign")}
            />

            {showOptional && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-zinc-800 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <Input
                  label="Term"
                  placeholder="keywords"
                  value={params.term}
                  onChange={handleChange("term")}
                />
                <Input
                  label="Content"
                  placeholder="ad_variant"
                  value={params.content}
                  onChange={handleChange("content")}
                />
              </div>
            )}

            <button
              onClick={() => setShowOptional(!showOptional)}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-2"
            >
              {showOptional ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  Hide Advanced
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  Show Advanced (Term &amp; Content)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 dark:bg-zinc-800 mb-6"></div>

      {/* --- ZONE 3: RESULT --- */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Ready to Share
            </span>
          </div>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 p-4 relative group">
          <div className="min-h-[60px] break-all text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed pr-2">
            {generatedUrl || (
              <span className="text-gray-400 dark:text-gray-500 italic opacity-50">
                Link will appear here...
              </span>
            )}
          </div>

          {generatedUrl && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
                  copied
                    ? "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 scale-95"
                    : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    COPY LINK
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
;
