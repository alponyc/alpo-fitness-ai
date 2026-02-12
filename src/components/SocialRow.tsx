import { Instagram } from "lucide-react";

const accounts = [
  { handle: "alponycfitness", url: "https://instagram.com/alponycfitness" },
  { handle: "alponyceats", url: "https://instagram.com/alponyceats" },
  { handle: "alposworld", url: "https://instagram.com/alposworld" },
  { handle: "thisisalponyc", url: "https://instagram.com/thisisalponyc" },
];

const SocialRow = () => (
  <div className="flex items-center justify-center gap-4 py-3">
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
        <span className="text-[8px] text-muted-foreground group-hover:text-primary transition-colors font-medium truncate max-w-[70px]">
          @{a.handle.replace("alpo", "").replace("thisis", "")}
        </span>
      </a>
    ))}
  </div>
);

export default SocialRow;
