import { Instagram } from "lucide-react";

const accounts = [
  { handle: "alponycfitness", label: "AlpoNYCFitness", url: "https://www.instagram.com/alponycfitness" },
  { handle: "alponyceats", label: "AlpoNYCEats", url: "https://www.instagram.com/alponyceats" },
  { handle: "alposworld", label: "AlposWorld", url: "https://www.instagram.com/alposworld" },
  { handle: "thisisalponyc", label: "ThisIsAlpoNYC", url: "https://www.instagram.com/thisisalponyc" },
  { handle: "slothystudios", label: "SlothyStudios", url: "https://www.instagram.com/slothystudios" },
];

const SocialRow = () => (
  <div className="grid grid-cols-5 gap-2 py-3">
    {accounts.map((a) => (
      <a
        key={a.handle}
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 group"
      >
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Instagram className="w-4 h-4 text-primary" />
        </div>
        <span className="text-[7px] text-muted-foreground group-hover:text-primary transition-colors font-medium text-center leading-tight">
          @{a.label}
        </span>
      </a>
    ))}
  </div>
);

export default SocialRow;
