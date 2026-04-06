import { SOCIAL_LINKS, SITE_CONTENT } from "../../../constants";

const SocialLinks = () => {
  return (
    <div className="surface-panel px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary/75">
            Stay in touch
          </p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            {SITE_CONTENT.footerNote}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/45 px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-accent/70"
            >
              <span className="size-4 text-primary">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
