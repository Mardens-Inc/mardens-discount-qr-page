export type TagDiscount={
    tag: string,
    percentage: number,
    color: string
}


export const Tags: Record<string, TagDiscount> = {
    "brown": {tag: "brown", percentage: 0.2, color: "#8B4513"},
    "red": {tag: "red", percentage: 0.25, color: "#DC2626"},
    "blue": {tag: "blue", percentage: 0.3, color: "#2563EB"},
    "green": {tag: "green", percentage: 0.15, color: "#16A34A"},
    "yellow": {tag: "yellow", percentage: 0.35, color: "#EAB308"},
    "orange": {tag: "orange", percentage: 0.4, color: "#EA580C"},
    "purple": {tag: "purple", percentage: 0.5, color: "#7C3AED"},
    "pink": {tag: "pink", percentage: 0.1, color: "#EC4899"},
    "white": {tag: "white", percentage: 0.05, color: "#F5F5F5"},
    "black": {tag: "black", percentage: 0.6, color: "#1F2937"},
}