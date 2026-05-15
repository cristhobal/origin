import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/shared/utils/cn"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to slow down the animation on hover
   * @default false
   *
   * El componente solo marca el contenedor con `data-pause-on-hover`. La lógica
   * real (Web Animations API + updatePlaybackRate) vive en un script inline en
   * Layout.astro porque:
   *  1) updatePlaybackRate preserva la posición visual al cambiar la velocidad
   *     (cambiar `animation-duration` en CSS produce saltos al recalcular el
   *     progreso contra la nueva duración).
   *  2) Mantener la lógica fuera del componente React permite que el Marquee
   *     no necesite `client:load`. Esto evita anidar islands React dentro de
   *     <BlurFade client:load>, lo que rompía la animación de entrada del padre.
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
  /**
   * Delay to apply to the animation (e.g., "calc(var(--duration) / -2)")
   * Use a negative value to start the animation mid-way
   */
  delay?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  delay,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      data-pause-on-hover={pauseOnHover ? "" : undefined}
      className={cn(
        "flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={delay ? { animationDelay: delay } : undefined}
            className={cn("flex shrink-0 justify-around gap-(--gap)", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
