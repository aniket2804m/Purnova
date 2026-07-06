import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Star, 
  Terminal, 
  Loader2, 
  Key, 
  AlertTriangle,
  Briefcase,
  Phone,
  Globe,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Definition of types for lead data
interface ScoredLead {
  id: string;
  name: string;
  rating: number | null;
  website: string | null;
  address: string;
  phoneNumber: string | null;
  score: "HOT" | "WARM" | "COLD";
  outreachMessage: string;
  reasoning: string;
}

// Definition of terminal status logs
interface StatusLog {
  timestamp: string;
  text: string;
  type: "info" | "success" | "warning" | "error" | "action";
}

export default function LeadGenAgent() {
  // State variables for criteria input
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [model, setModel] = useState("claude-3-5-sonnet-20241022");

  // State for keys (fallbacks if VITE_ environment variables are missing)
  const [anthropicKeyInput, setAnthropicKeyInput] = useState(() => {
    return sessionStorage.getItem("purnova_anthropic_key") || "";
  });
  const [googleKeyInput, setGoogleKeyInput] = useState(() => {
    return sessionStorage.getItem("purnova_google_key") || "";
  });
  const [showKeysPanel, setShowKeysPanel] = useState(false);

  // Active key calculation
  const activeAnthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY || anthropicKeyInput;
  const activeGoogleKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || googleKeyInput;

  // State for Sandbox/Simulation Mode (defaults to true if keys are missing)
  const [isSandboxMode, setIsSandboxMode] = useState(() => {
    return !(import.meta.env.VITE_ANTHROPIC_API_KEY && import.meta.env.VITE_GOOGLE_PLACES_API_KEY);
  });

  // Agent execution states
  const [isSearching, setIsSearching] = useState(false);
  const [leads, setLeads] = useState<ScoredLead[]>([]);
  const [logs, setLogs] = useState<StatusLog[]>([]);
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Helper to add log entry
  const addLog = (text: string, type: StatusLog["type"] = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp: time, text, type }]);
  };

  // Scroll to bottom of terminal when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Save inputs to session storage on change
  const handleAnthropicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnthropicKeyInput(e.target.value);
    sessionStorage.setItem("purnova_anthropic_key", e.target.value);
  };

  const handleGoogleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleKeyInput(e.target.value);
    sessionStorage.setItem("purnova_google_key", e.target.value);
  };

  // Google Places API (New) Text Search function
  const callGooglePlaces = async (searchIndustry: string, searchLocation: string): Promise<any[]> => {
    const textQuery = `${searchIndustry} in ${searchLocation}`;
    addLog(`📞 Calling Google Places API (New) for query: "${textQuery}"`, "action");

    const endpoint = "https://places.googleapis.com/v1/places:searchText";
    const body = JSON.stringify({
      textQuery: textQuery,
      pageSize: 10,
    });

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": activeGoogleKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.rating,places.websiteUri,places.nationalPhoneNumber,places.primaryType",
    };

    try {
      // First attempt: Direct fetch
      let response = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`Places API responded with status ${response.status}`);
      }

      const data = await response.json();
      return data.places || [];
    } catch (err: any) {
      addLog(`⚠️ Direct call failed (likely CORS). Retrying through CORS proxy...`, "warning");
      
      // Fallback: Fetch via CORS proxy
      try {
        const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(endpoint)}`;
        const response = await fetch(proxyUrl, {
          method: "POST",
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error(`Proxy Places API responded with status ${response.status}`);
        }

        const data = await response.json();
        return data.places || [];
      } catch (proxyErr: any) {
        addLog(`❌ Failed to retrieve places: ${proxyErr.message || proxyErr}`, "error");
        throw proxyErr;
      }
    }
  };

  // Generate dynamic, realistic mock leads for Sandbox mode
  const generateMockLeads = (ind: string, loc: string): ScoredLead[] => {
    const cleanInd = ind || "Business";
    const cleanLoc = loc || "Dallas TX";
    
    return [
      {
        id: "mock-lead-1",
        name: `${cleanLoc} Elite ${cleanInd}s`,
        rating: 3.8,
        website: `https://www.elite${cleanInd.toLowerCase().replace(/\s+/g, "")}${cleanLoc.toLowerCase().replace(/\s+/g, "")}.com`,
        address: `100 Pine Street, ${cleanLoc}`,
        phoneNumber: "+1 (555) 019-4821",
        score: "HOT",
        reasoning: `Website is active but lacks mobile responsiveness and loads slowly (4.5s). Their Google review rating is 3.8 with only 12 reviews, showing a direct opportunity for review acquisition and website speed optimization.`,
        outreachMessage: `Hi Elite ${cleanInd}s Team,\n\nI was looking for local ${cleanInd} services in ${cleanLoc} and came across your business. I love the branding on your page, but I noticed that your website is currently taking over 4.5 seconds to load on mobile devices, and you are missing basic Google SEO tags.\n\nAt Purnova, we specialize in optimizing local web presence for the ${cleanInd} industry. We can help you bring that load time down to under 1.5 seconds, which typically increases local leads by 30-40%. \n\nAre you open to a quick 10-minute speed audit call this Thursday?\n\nBest regards,\nAniket\nPurnova Agency`
      },
      {
        id: "mock-lead-2",
        name: `Pioneer Square ${cleanInd} Center`,
        rating: 4.5,
        website: null,
        address: `456 Broadway Blvd, ${cleanLoc}`,
        phoneNumber: "+1 (555) 021-3984",
        score: "WARM",
        reasoning: `No website link is associated with their Google Places listing. They have a strong rating (4.5) but are losing prospective customers to competitors who have search-optimized websites and landing pages.`,
        outreachMessage: `Hi Pioneer Square Team,\n\nI came across your Google listing for Pioneer Square ${cleanInd} Center. You have an excellent 4.5-star rating on Google, but I noticed you don't have a website listed on your profile.\n\nIn ${cleanLoc}, over 80% of customers search for a local provider's website to review pricing and book appointments directly. We build fast, high-converting websites designed specifically for ${cleanInd} companies to turn search traffic into loyal clients.\n\nWe can put together a free initial homepage wireframe for your review. Would you be open to seeing a draft next week?\n\nBest regards,\nAniket\nPurnova Agency`
      },
      {
        id: "mock-lead-3",
        name: `Universal ${cleanInd} Care`,
        rating: 4.9,
        website: `https://www.universal${cleanInd.toLowerCase().replace(/\s+/g, "")}.com`,
        address: `789 University Way, ${cleanLoc}`,
        phoneNumber: "+1 (555) 032-1194",
        score: "COLD",
        reasoning: `Highly optimized digital footprint. They have a near-perfect rating (4.9) across 200+ reviews and a modern, fast-loading site. Low prospect potential for a standard agency contract.`,
        outreachMessage: `Hi Universal ${cleanInd} Care Team,\n\nI wanted to reach out and congratulate you on your excellent local search presence in ${cleanLoc}! Your 4.9 rating and website speed look outstanding.\n\nIf you ever look to scale your client acquisition via paid search campaigns or social media lead funnels in surrounding areas, we at Purnova have case studies doing exactly that for other ${cleanInd} businesses.\n\nLet me know if you would like me to send over our case study deck.\n\nBest regards,\nAniket\nPurnova Agency`
      }
    ];
  };

  // Sandbox simulation execution loop
  const runSimulation = async (searchIndustry: string, searchLocation: string) => {
    setIsSearching(true);
    setLeads([]);
    setLogs([]);
    
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    addLog("🤖 [Sandbox Mode] Initializing Purnova Lead Gen Agent...", "info");
    await wait(800);
    addLog(`🔧 [Sandbox Mode] Configured: Model: ${model} | Industry: "${searchIndustry}" | Location: "${searchLocation}" | Keywords: "${keywords || 'None'}"`, "info");
    await wait(1000);
    addLog("🧠 [Sandbox Mode] Sending context to Claude (Step 1/3)...", "action");
    await wait(1200);
    addLog(`🔍 [Sandbox Mode] Claude requested tool [search_businesses] for: "${searchIndustry}" in "${searchLocation}"`, "info");
    await wait(800);
    addLog(`📞 [Sandbox Mode] [Simulated] Calling Google Places API (New) for "${searchIndustry} in ${searchLocation}"`, "action");
    await wait(1500);
    
    const mockLeads = generateMockLeads(searchIndustry, searchLocation);
    
    addLog(`✅ [Sandbox Mode] Google Places found ${mockLeads.length} matching businesses. Sending search results back to Claude.`, "success");
    await wait(1200);
    addLog("🧠 [Sandbox Mode] Sending context to Claude (Step 2/3)...", "action");
    await wait(1000);
    
    for (const lead of mockLeads) {
      addLog(`⭐ [Sandbox Mode] Claude executed tool [score_lead] for: "${lead.name}" -> [${lead.score}]`, "success");
      setLeads(prev => [...prev, lead]);
      await wait(1200);
    }
    
    addLog("🧠 [Sandbox Mode] Sending context to Claude (Step 3/3)...", "action");
    await wait(1000);
    addLog(`💬 [Sandbox Mode] Final Agent Summary: Successfully analyzed and scored ${mockLeads.length} leads for "${searchIndustry}" in "${searchLocation}". Drafted specialized outreach blueprints.`, "info");
    await wait(500);
    addLog("🏁 [Sandbox Mode] Lead generation simulation completed successfully!", "success");
    
    setIsSearching(false);
  };

  // Main Lead Gen agent execution selector (Sandbox vs. Live)
  const handleStartAgent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!industry.trim() || !location.trim()) {
      addLog("❌ Please fill in both Industry and Location fields.", "error");
      return;
    }

    if (isSandboxMode) {
      runSimulation(industry, location);
      return;
    }

    if (!activeAnthropicKey) {
      addLog("❌ Missing Anthropic API Key. Please provide one or toggle Sandbox Mode.", "error");
      setShowKeysPanel(true);
      return;
    }

    if (!activeGoogleKey) {
      addLog("❌ Missing Google Places API Key. Please provide one or toggle Sandbox Mode.", "error");
      setShowKeysPanel(true);
      return;
    }

    setIsSearching(true);
    setLeads([]);
    setLogs([]);

    addLog("🤖 Initializing Purnova Lead Gen Agent (LIVE)...", "info");
    addLog(`🔧 Configured: Model: ${model} | Industry: "${industry}" | Location: "${location}" | Keywords: "${keywords || 'None'}"`, "info");

    let messages: any[] = [
      {
        role: "user",
        content: `I want to find and score sales leads for Purnova (a premium digital marketing agency). 
Target details:
- Industry/Niche: "${industry}"
- Target Location: "${location}"
- Target Keywords / Qualitative Criteria: "${keywords}"

Please follow this exact protocol:
1. Call "search_businesses" with the industry and location to find matching businesses.
2. Once you receive the list of businesses, review each business's attributes (name, rating, website availability, phone, etc.).
3. For EACH business returned, perform a Lead Assessment and call "score_lead". Use the keywords ("${keywords}") and business status to evaluate:
   - Score: HOT, WARM, or COLD.
     - HOT: Has a website but could use marketing/SEO help, OR has good ratings but low review count, fits the keywords, etc.
     - WARM: Moderate potential.
     - COLD: Completely poor fit, or missing a website where they specifically do not fit our audience, or very high rating + massive brand that won't respond, etc.
   - Outreach Message: Write a highly custom, professional outreach message mentioning their business name, explaining how Purnova can specifically improve their digital presence (e.g. SEO, social media, review building, website design, Google Ads) based on their details. Do NOT make up fake metrics. Keep it premium, direct, and conversational.
   - Reasoning: Brief 1-2 sentence justification for the score.
4. Run through all businesses returned and call "score_lead" for each of them.
5. After calling "score_lead" for all businesses, summarize your findings in a final short text message.`,
      }
    ];

    const tools = [
      {
        name: "search_businesses",
        description: "Find businesses matching a given industry and location using the Google Places API. Returns a list of businesses with name, address, rating, website, and phone number.",
        input_schema: {
          type: "object",
          properties: {
            industry: {
              type: "string",
              description: "The type of business or industry to search for (e.g. dentist, restaurant, legal)."
            },
            location: {
              type: "string",
              description: "The city, state, or area to search in (e.g. Dallas TX, London, Seattle)."
            }
          },
          required: ["industry", "location"]
        }
      },
      {
        name: "score_lead",
        description: "Analyze and score business data based on the target audience keywords, rating, and website availability. Returns a structured evaluation of why this lead is hot/warm/cold, along with a custom outreach message.",
        input_schema: {
          type: "object",
          properties: {
            businessName: {
              type: "string",
              description: "Name of the business."
            },
            rating: {
              type: "number",
              description: "Google Places rating (0-5), or null if not available."
            },
            website: {
              type: "string",
              description: "Website URL of the business, or null if not available."
            },
            address: {
              type: "string",
              description: "Address of the business."
            },
            phoneNumber: {
              type: "string",
              description: "Phone number, if available."
            },
            score: {
              type: "string",
              enum: ["HOT", "WARM", "COLD"],
              description: "The lead score: HOT (high potential, meets criteria, good fit), WARM (moderate potential), COLD (poor fit, low potential, or missing crucial info)."
            },
            outreachMessage: {
              type: "string",
              description: "A highly personalized, professional cold outreach message tailored to this business, highlighting how Purnova can help them (e.g., improve their website, SEO, Google review management, etc.)."
            },
            reasoning: {
              type: "string",
              description: "The reasoning behind the lead score."
            }
          },
          required: ["businessName", "score", "outreachMessage", "reasoning", "address"]
        }
      }
    ];

    let loop = true;
    let iteration = 0;
    const maxIterations = 12;
    const accumulatedLeads: ScoredLead[] = [];

    while (loop && iteration < maxIterations) {
      iteration++;
      addLog(`🧠 Sending context to Claude (Step ${iteration}/${maxIterations})...`, "action");

      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": activeAnthropicKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: model,
            max_tokens: 4000,
            messages: messages,
            tools: tools,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP error ${response.status}`;
          throw new Error(errMsg);
        }

        const responseData = await response.json();
        
        messages.push({
          role: "assistant",
          content: responseData.content,
        });

        const stopReason = responseData.stop_reason;
        const toolCalls = responseData.content.filter((c: any) => c.type === "tool_use");

        if (stopReason === "tool_use" || toolCalls.length > 0) {
          const toolResults: any[] = [];

          for (const toolCall of toolCalls) {
            const { name, input, id: toolCallId } = toolCall;

            if (name === "search_businesses") {
              addLog(`🔍 Claude requested tool [search_businesses] for: "${input.industry}" in "${input.location}"`, "info");
              
              try {
                const rawPlaces = await callGooglePlaces(input.industry, input.location);
                
                const formattedPlaces = rawPlaces.map((p: any) => ({
                  id: p.id,
                  displayName: p.displayName?.text || "Unknown Name",
                  formattedAddress: p.formattedAddress || "No address",
                  rating: p.rating || null,
                  websiteUri: p.websiteUri || null,
                  nationalPhoneNumber: p.nationalPhoneNumber || null,
                  primaryType: p.primaryType || ""
                }));

                addLog(`✅ Google Places found ${formattedPlaces.length} businesses. Sending data back to Claude.`, "success");

                toolResults.push({
                  type: "tool_result",
                  tool_use_id: toolCallId,
                  content: JSON.stringify(formattedPlaces),
                });
              } catch (placesErr: any) {
                addLog(`⚠️ Error in search_businesses execution: ${placesErr.message || placesErr}`, "warning");
                toolResults.push({
                  type: "tool_result",
                  tool_use_id: toolCallId,
                  content: JSON.stringify({ error: "Failed to search businesses", details: placesErr.message }),
                  is_error: true
                });
              }
            } else if (name === "score_lead") {
              addLog(`⭐ Claude executed tool [score_lead] for: "${input.businessName}" -> [${input.score}]`, "success");
              
              const newLead: ScoredLead = {
                id: toolCallId + Math.random().toString(36).substring(2, 6),
                name: input.businessName,
                rating: input.rating,
                website: input.website,
                address: input.address,
                phoneNumber: input.phoneNumber,
                score: input.score as "HOT" | "WARM" | "COLD",
                outreachMessage: input.outreachMessage,
                reasoning: input.reasoning,
              };

              if (!accumulatedLeads.some(l => l.name.toLowerCase() === newLead.name.toLowerCase())) {
                accumulatedLeads.push(newLead);
                setLeads([...accumulatedLeads]);
              }

              toolResults.push({
                type: "tool_result",
                tool_use_id: toolCallId,
                content: JSON.stringify({ status: "success", message: `Lead ${input.businessName} recorded` }),
              });
            }
          }

          messages.push({
            role: "user",
            content: toolResults,
          });

        } else {
          const textResponse = responseData.content.find((c: any) => c.type === "text")?.text || "";
          if (textResponse) {
            addLog(`💬 Final Agent Summary: ${textResponse}`, "info");
          }
          addLog("🏁 Lead generation run completed successfully!", "success");
          loop = false;
        }

      } catch (err: any) {
        addLog(`❌ Agent Error: ${err.message || err}`, "error");
        loop = false;
      }
    }

    if (iteration >= maxIterations) {
      addLog("⚠️ Reached maximum workflow iterations limit. Stopping agent.", "warning");
    }

    setIsSearching(false);
  };

  // CSV Exporter
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "Business Name",
      "Lead Score",
      "Rating",
      "Website",
      "Phone Number",
      "Address",
      "Reasoning",
      "AI Generated Outreach Message"
    ];

    const rows = leads.map((l) => [
      l.name,
      l.score,
      l.rating ? `${l.rating} / 5` : "N/A",
      l.website || "N/A",
      l.phoneNumber || "N/A",
      l.address || "N/A",
      l.reasoning || "N/A",
      l.outreachMessage || "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `purnova_leads_${industry.toLowerCase().replace(/\s+/g, "_")}_${location.toLowerCase().replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog("📥 Downloaded leads dataset as CSV file.", "success");
  };

  // Clipboard copy helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLeadId(id);
    setTimeout(() => setCopiedLeadId(null), 2000);
  };

  // Count summaries
  const hotCount = leads.filter(l => l.score === "HOT").length;
  const warmCount = leads.filter(l => l.score === "WARM").length;
  const coldCount = leads.filter(l => l.score === "COLD").length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-montserrat">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 px-3 py-1 text-xs tracking-widest uppercase font-semibold rounded-none">
            Digital Agency AI Suite
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold tracking-wider text-white uppercase gold-text-glow">
            LeadGen Agent
          </h1>
          <p className="text-base md:text-lg text-[#F5F0E8]/75 font-cormorant italic tracking-wide">
            Autonomously scan physical locations for target industries, analyze search data, score prospects, and draft bespoke cold outreach messages.
          </p>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-4" />
        </div>

        {/* Sandbox Mode / Live Mode Selector Info Badge */}
        <div className="flex justify-center">
          <div className="glass px-4 py-2 border border-[#C9A84C]/15 flex items-center gap-3 text-xs">
            <span className="text-[#F5F0E8]/50">Status:</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isSandboxMode ? 'bg-[#F5C518]' : 'bg-green-500'}`} />
              <span className={`font-semibold uppercase tracking-wider ${isSandboxMode ? 'text-[#F5C518]' : 'text-green-500'}`}>
                {isSandboxMode ? "Sandbox / Simulation Mode" : "Live Agent Mode"}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-[#C9A84C]/20" />
            <label className="flex items-center gap-1.5 cursor-pointer text-[#C9A84C] hover:text-white select-none">
              <input 
                type="checkbox" 
                checked={isSandboxMode} 
                onChange={(e) => {
                  if (!e.target.checked && (!activeAnthropicKey || !activeGoogleKey)) {
                    addLog("⚠️ API keys required for Live Agent Mode. Set keys below first.", "warning");
                    setShowKeysPanel(true);
                    return;
                  }
                  setIsSandboxMode(e.target.checked);
                  addLog(e.target.checked ? "🔄 Switched to Sandbox / Simulation Mode." : "🔄 Switched to Live Agent Mode.", "info");
                }}
                disabled={isSearching}
                className="accent-[#C9A84C] h-3.5 w-3.5" 
              />
              <span>Run in Simulation Mode</span>
            </label>
          </div>
        </div>

        {/* API Key Panel (If keys are not configured in VITE variables) */}
        {(!import.meta.env.VITE_ANTHROPIC_API_KEY || !import.meta.env.VITE_GOOGLE_PLACES_API_KEY) && (
          <div className="glass border border-[#C9A84C]/15 p-6 space-y-4">
            <div className="flex items-center gap-3 text-[#F5C518]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-cinzel text-xs uppercase tracking-wider font-semibold">Missing Local Env API Keys</h3>
            </div>
            <p className="text-xs text-[#F5F0E8]/70 leading-relaxed">
              VITE_ANTHROPIC_API_KEY and VITE_GOOGLE_PLACES_API_KEY are not fully defined in your static project environment. Please paste them below to enable direct frontend agent executions. They will be saved to your local browser session storage.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                onClick={() => setShowKeysPanel(!showKeysPanel)}
                className="bg-transparent hover:bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] font-semibold text-[10px] tracking-wider uppercase rounded-none px-4 py-2 h-auto"
              >
                <Key className="w-3.5 h-3.5 mr-2" />
                {showKeysPanel ? "Hide Key Configuration" : "Configure Temporary Keys"}
              </Button>
            </div>

            {showKeysPanel && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#C9A84C]/10">
                <div className="space-y-1.5">
                  <Label htmlFor="anthropic-key" className="text-xs uppercase text-[#F5F0E8]/60 font-semibold tracking-wider">
                    Anthropic API Key
                  </Label>
                  <Input
                    id="anthropic-key"
                    type="password"
                    value={anthropicKeyInput}
                    onChange={handleAnthropicKeyChange}
                    placeholder="sk-ant-..."
                    className="bg-[#0F0F0F] border-[#C9A84C]/25 text-[#F5F0E8] focus:border-[#C9A84C] rounded-none focus-visible:ring-0 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="google-key" className="text-xs uppercase text-[#F5F0E8]/60 font-semibold tracking-wider">
                    Google Places API Key
                  </Label>
                  <Input
                    id="google-key"
                    type="password"
                    value={googleKeyInput}
                    onChange={handleGoogleKeyChange}
                    placeholder="AIzaSy..."
                    className="bg-[#0F0F0F] border-[#C9A84C]/25 text-[#F5F0E8] focus:border-[#C9A84C] rounded-none focus-visible:ring-0 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Parameters Form */}
        <div className="glass p-6 md:p-8 space-y-6">
          <h2 className="font-cinzel text-lg md:text-xl text-white uppercase tracking-wider font-semibold border-b border-[#C9A84C]/15 pb-3">
            Search Parameters
          </h2>
          <form onSubmit={handleStartAgent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-xs uppercase text-[#F5F0E8]/70 tracking-widest font-semibold flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#C9A84C]" />
                  Industry / Business Niche
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-4 h-4 text-[#F5F0E8]/40" />
                  <Input
                    id="industry"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Dentists, Roofers, Boutique Hotels"
                    disabled={isSearching}
                    className="bg-[#0F0F0F] border-[#C9A84C]/20 focus:border-[#C9A84C] text-[#F5F0E8] placeholder-[#F5F0E8]/35 rounded-none pl-10 py-6 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs uppercase text-[#F5F0E8]/70 tracking-widest font-semibold flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                  Target Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-[#F5F0E8]/40" />
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Seattle WA, London, Austin TX"
                    disabled={isSearching}
                    className="bg-[#0F0F0F] border-[#C9A84C]/20 focus:border-[#C9A84C] text-[#F5F0E8] placeholder-[#F5F0E8]/35 rounded-none pl-10 py-6 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-xs uppercase text-[#F5F0E8]/70 tracking-widest font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                  Target Audience Keywords
                </Label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-3.5 w-4 h-4 text-[#F5F0E8]/40" />
                  <Input
                    id="keywords"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. needs SEO, bad reviews, no website"
                    disabled={isSearching}
                    className="bg-[#0F0F0F] border-[#C9A84C]/20 focus:border-[#C9A84C] text-[#F5F0E8] placeholder-[#F5F0E8]/35 rounded-none pl-10 py-6 focus-visible:ring-0"
                  />
                </div>
              </div>

            </div>

            {/* Model & Submit Grid */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-3">
                <Label htmlFor="model-select" className="text-xs uppercase text-[#F5F0E8]/60 font-semibold tracking-wider flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#C9A84C]" />
                  Model:
                </Label>
                <select
                  id="model-select"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={isSearching || isSandboxMode}
                  className={`bg-[#0F0F0F] border border-[#C9A84C]/20 text-[#F5F0E8] text-xs font-semibold px-3 py-1.5 focus:border-[#C9A84C] outline-none rounded-none cursor-pointer ${isSandboxMode ? 'opacity-55 cursor-not-allowed' : ''}`}
                >
                  <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Best Outreach Quality)</option>
                  <option value="claude-3-5-haiku-20241022">Claude 3.5 Haiku (Faster Run)</option>
                </select>
                {isSandboxMode && <span className="text-[10px] text-[#F5F0E8]/40 italic">(Fixed to Simulator in Sandbox)</span>}
              </div>

              <Button
                type="submit"
                disabled={isSearching}
                className="bg-[#C9A84C] hover:bg-[#F5F0E8] text-[#0A0A0A] font-montserrat font-bold uppercase tracking-wider text-xs px-8 py-6 rounded-none transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.15)] flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Agent Executing...
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" />
                    {isSandboxMode ? "Launch Demo simulation" : "Launch Live Agent"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Live Terminal Console Logs */}
        {(logs.length > 0 || isSearching) && (
          <div className="glass border border-[#C9A84C]/20 p-5 space-y-3 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-2.5">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 ${isSearching ? 'bg-[#F5C518] animate-ping' : 'bg-green-500'} rounded-full`} />
                <span className="font-cinzel text-xs text-white uppercase tracking-wider font-semibold">Agent Workflow Monitor</span>
              </div>
              <span className="font-mono text-[10px] text-[#F5F0E8]/40">
                {isSandboxMode ? "C:\\Users\\Aniket\\Purnova\\sandbox_agent.exe" : "C:\\Users\\Aniket\\Purnova\\live_agent.exe"}
              </span>
            </div>
            
            <div className="h-64 overflow-y-auto bg-[#050505] p-4 border border-[#C9A84C]/10 font-mono text-xs space-y-2 scrollbar-none rounded-none text-left">
              {logs.map((log, index) => {
                let colorClass = "text-[#F5F0E8]/70";
                if (log.type === "success") colorClass = "text-[#C9A84C] font-semibold";
                if (log.type === "warning") colorClass = "text-[#F5C518]";
                if (log.type === "error") colorClass = "text-red-500 font-semibold";
                if (log.type === "action") colorClass = "text-sky-400";

                return (
                  <div key={index} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#F5F0E8]/30 shrink-0 select-none">[{log.timestamp}]</span>
                    <span className={colorClass}>{log.text}</span>
                  </div>
                );
              })}
              
              {isSearching && (
                <div className="flex items-center gap-2 text-[#C9A84C] animate-pulse">
                  <span>&gt;</span>
                  <span>Agent executing reasoning loop...</span>
                  <span className="w-1.5 h-4 bg-[#C9A84C] animate-pulse select-none inline-block align-middle" />
                </div>
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}

        {/* Lead Grid & Dashboard */}
        {leads.length > 0 && (
          <div className="space-y-6">
            
            {/* Dashboard Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
              <div className="glass p-4 border border-[#C9A84C]/15 flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-cinzel font-bold text-white">{leads.length}</span>
                <span className="text-xs uppercase text-[#F5F0E8]/60 tracking-wider mt-1 font-semibold">Total Leads</span>
              </div>
              
              <div className="glass p-4 border border-[#F5C518]/20 bg-[#F5C518]/5 flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-cinzel font-bold text-[#F5C518]">{hotCount}</span>
                <span className="text-xs uppercase text-[#F5C518] tracking-wider mt-1 font-semibold">🔥 Hot Leads</span>
              </div>

              <div className="glass p-4 border border-amber-500/20 bg-amber-500/5 flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-cinzel font-bold text-amber-500">{warmCount}</span>
                <span className="text-xs uppercase text-amber-500 tracking-wider mt-1 font-semibold">⚡ Warm Leads</span>
              </div>

              <div className="glass p-4 border border-zinc-700 bg-zinc-800/10 flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-cinzel font-bold text-zinc-400">{coldCount}</span>
                <span className="text-xs uppercase text-zinc-400 tracking-wider mt-1 font-semibold">❄️ Cold Leads</span>
              </div>
            </div>

            {/* Dashboard Header Actions */}
            <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-4">
              <h2 className="font-cinzel text-xl text-white uppercase tracking-wider font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C9A84C]" />
                Scored Leads & Outreach Messages
              </h2>
              
              <Button
                onClick={exportToCSV}
                className="bg-transparent hover:bg-[#C9A84C]/10 border border-[#C9A84C]/35 text-[#C9A84C] font-semibold text-xs tracking-wider uppercase rounded-none px-5 py-2.5 h-auto transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </div>

            {/* Leads Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead) => {
                // Determine Badge styling based on score
                let badgeStyle = "bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/30 shadow-[0_0_8px_rgba(245,197,24,0.15)]";
                if (lead.score === "WARM") {
                  badgeStyle = "bg-amber-500/10 text-amber-500 border border-amber-500/30";
                } else if (lead.score === "COLD") {
                  badgeStyle = "bg-zinc-800 text-zinc-400 border border-zinc-700";
                }

                return (
                  <Card 
                    key={lead.id} 
                    className="bg-[#0F0F0F] border border-[#C9A84C]/15 rounded-none transition-all duration-300 hover:border-[#C9A84C]/80 hover:shadow-[0_0_15px_rgba(201,168,76,0.1)] flex flex-col justify-between group"
                  >
                    <div>
                      <CardHeader className="p-5 pb-3 border-b border-[#C9A84C]/10 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="font-cinzel text-sm md:text-base text-white tracking-wider leading-snug group-hover:text-[#C9A84C] transition-colors uppercase text-left">
                            {lead.name}
                          </CardTitle>
                          <Badge className={`${badgeStyle} px-2 py-0.5 rounded-none font-bold text-[10px] tracking-wider shrink-0`}>
                            {lead.score}
                          </Badge>
                        </div>
                        
                        {/* Rating block */}
                        {lead.rating !== null && (
                          <div className="flex items-center gap-1.5 text-xs text-[#F5C518]">
                            <Star className="w-3.5 h-3.5 fill-[#F5C518]" />
                            <span className="font-semibold">{lead.rating.toFixed(1)} / 5.0</span>
                            <span className="text-[#F5F0E8]/30">Google Rating</span>
                          </div>
                        )}
                      </CardHeader>
                      
                      <CardContent className="p-5 space-y-4 text-left">
                        {/* Directory Contacts details */}
                        <div className="space-y-2 text-xs text-[#F5F0E8]/70">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
                            <span>{lead.address}</span>
                          </div>
                          
                          {lead.phoneNumber && (
                            <div className="flex items-center gap-2.5">
                              <Phone className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                              <span>{lead.phoneNumber}</span>
                            </div>
                          )}

                          {lead.website && (
                            <div className="flex items-center gap-2.5">
                              <Globe className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                              <a 
                                href={lead.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white hover:text-[#C9A84C] underline inline-flex items-center gap-1"
                              >
                                {lead.website.replace(/https?:\/\/(www\.)?/, "").substring(0, 24)}...
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Agent reasoning block */}
                        <div className="p-3 bg-[#0A0A0A] border-l border-[#C9A84C]/35">
                          <span className="text-[10px] uppercase text-[#C9A84C] font-bold tracking-widest block mb-1">
                            Assessment Reasoning
                          </span>
                          <p className="text-xs text-[#F5F0E8]/75 font-cormorant italic leading-relaxed">
                            "{lead.reasoning}"
                          </p>
                        </div>

                        {/* Outreach email/message text area */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase text-[#F5F0E8]/50 font-bold tracking-widest">
                              Outreach Blueprint
                            </span>
                            
                            <button
                              onClick={() => copyToClipboard(lead.outreachMessage, lead.id)}
                              className="text-[#C9A84C] hover:text-[#F5F0E8] text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              {copiedLeadId === lead.id ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="bg-[#050505] border border-[#C9A84C]/10 p-3 h-36 overflow-y-auto font-mono text-[10px] text-[#F5F0E8]/90 leading-relaxed scrollbar-none whitespace-pre-wrap">
                            {lead.outreachMessage}
                          </div>
                        </div>

                      </CardContent>
                    </div>

                    <div className="p-5 pt-0 border-t border-[#C9A84C]/10 flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(lead.outreachMessage, lead.id)}
                        className="flex-1 rounded-none border border-[#C9A84C]/25 bg-transparent hover:bg-[#C9A84C]/10 text-[#C9A84C] font-semibold text-[10px] tracking-wider uppercase py-5"
                      >
                        Copy outreach
                      </Button>
                      
                      {lead.website ? (
                        <Button
                          asChild
                          className="flex-1 rounded-none bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#F5F0E8] font-semibold text-[10px] tracking-wider uppercase py-5"
                        >
                          <a href={lead.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                            Visit site
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="flex-1 rounded-none bg-zinc-800 text-zinc-500 font-semibold text-[10px] tracking-wider uppercase py-5 cursor-not-allowed border-none"
                        >
                          No Website
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
