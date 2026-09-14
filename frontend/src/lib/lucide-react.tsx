/* oxlint-disable react/only-export-components -- this compatibility module only exports icon components */
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { createLucideIcon, type LucideProps } from "lucide-react-upstream";
import { SiGithub, type IconType } from "@icons-pack/react-simple-icons";

export * from "lucide-react-upstream";

const GithubBrand = forwardRef<SVGSVGElement, LucideProps>(function GithubBrand(props, ref) {
  const { size = 24, color = "currentColor", strokeWidth, absoluteStrokeWidth, ...rest } = props;
  void strokeWidth;
  void absoluteStrokeWidth;
  return <SiGithub ref={ref} size={size} color={color} {...(rest as ComponentPropsWithoutRef<IconType>)} />;
});

GithubBrand.displayName = "Github";

const linkedinNode: Parameters<typeof createLucideIcon>[1] = [
  ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", key: "c2jq9f" }],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
];

export const Github = GithubBrand;
export const Linkedin = createLucideIcon("Linkedin", linkedinNode);
