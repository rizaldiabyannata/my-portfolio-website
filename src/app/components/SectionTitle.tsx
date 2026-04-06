import { cn } from "@/lib/utils";

interface SectionTitleProps {
  index: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({
  index,
  title,
  description,
  centered = false,
  className,
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-5",
        centered ? "items-center text-center" : "",
        className
      )}
    >
      <div className="section-kicker">
        <span className="font-mono text-xs tracking-[0.24em]">{index}</span>
      </div>
      <div className={cn("space-y-4", centered ? "max-w-2xl" : "max-w-3xl")}>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      <div className={cn("editorial-rule", centered ? "max-w-xl" : "")} />
    </div>
  );
};

export default SectionTitle;
