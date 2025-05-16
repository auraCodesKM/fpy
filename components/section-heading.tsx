import { OptimizedScrollReveal } from "./optimized-scroll-reveal"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  className?: string
}

export const SectionHeading = ({ title, subtitle, alignment = "center", className = "" }: SectionHeadingProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <OptimizedScrollReveal className={`mb-12 ${className}`}>
      <div className={alignmentClasses[alignment]}>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </OptimizedScrollReveal>
  )
}
