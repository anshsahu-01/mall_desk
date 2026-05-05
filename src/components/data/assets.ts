export type VideoAsset = {
  src: string;
  label: string;
  poster: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

// ── Hero & Overview ──
export const heroVideo: VideoAsset = {
  src: "/assets/homevideo.mp4",
  label: "Luxury mall overview",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const mallOverviewVideo: VideoAsset = {
  src: "/assets/mallouterview.mp4",
  label: "Mall overview",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

// ── Atrium ──
export const atriumVideo: VideoAsset = {
  src: "/assets/atrium.mp4",
  label: "Atrium interior",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const escalatorsVideo: VideoAsset = {
  src: "/assets/escalators.mp4",
  label: "Escalator transition",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const walkVideo: VideoAsset = {
  src: "/assets/walkinluxurymall.mp4",
  label: "Walk through luxury mall",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

// ── Electronics & Retail ──
export const electronicsVideo: VideoAsset = {
  src: "/assets/electronicsshop.mp4",
  label: "Electronics showroom",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const appleStoreVideo: VideoAsset = {
  src: "/assets/applestore.mp4",
  label: "Flagship electronics retail",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const fashionStoreVideo: VideoAsset = {
  src: "/assets/fashionstore.mp4",
  label: "Fashion store",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const flagshipStoreVideo: VideoAsset = {
  src: "/assets/flagshipstore.mp4",
  label: "Flagship store",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const retailStoresVideo: VideoAsset = {
  src: "/assets/retailstores.mp4",
  label: "Retail stores",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

// ── Dining ──
export const restaurantVideo: VideoAsset = {
  src: "/assets/restaurantvideo.mp4",
  label: "Restaurant destination",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const luxuryFoodVideo: VideoAsset = {
  src: "/assets/luxuryfood.mp4",
  label: "Luxury dining",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const restaurantPlatingVideo: VideoAsset = {
  src: "/assets/restaurantplating.mp4",
  label: "Restaurant plating",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const foodMacroVideo: VideoAsset = {
  src: "/assets/foodmacro.mp4",
  label: "Food macro",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

export const burgerCloseupVideo: VideoAsset = {
  src: "/assets/burgercloseup.mp4",
  label: "Burger closeup",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

// ── Events ──
export const concertCrowdVideo: VideoAsset = {
  src: "/assets/concertcrowd.mp4",
  label: "Concert crowd",
  poster: "/assets/posters/luxury-mall-poster.svg",
};

// ── MacBook ──
export const macbookImage: ImageAsset = {
  src: "/assets/macbookimage.jpg",
  alt: "Mall experience display",
};

// ── Corridor media (used in horizontal scroll panels) ──
export const corridorMedia: Array<VideoAsset | ImageAsset> = [
  fashionStoreVideo,
  flagshipStoreVideo,
  retailStoresVideo,
  appleStoreVideo,
];

// ── Corridor panel content ──
export const corridorPanels = [
  {
    index: "01",
    title: "Storefronts stretch like architectural sets",
    body: "Scale, reflection, and moving crowds establish the mall as an immersive public world.",
  },
  {
    index: "02",
    title: "Fashion arrives as a curated luxury district",
    body: "Textiles, silhouettes, and visual merchandising transform retail into a living runway.",
  },
  {
    index: "03",
    title: "Hospitality carries the destination into the night",
    body: "Dining, lounges, and rooftop atmospheres extend the mall beyond commerce.",
  },
  {
    index: "04",
    title: "A space that never feels static",
    body: "Every level introduces a new perspective, thoughtfully designed to feel complete on its own.",
  },
] as const;

// ── Decorative floating / falling words ──
export const floatingWords = [
  "Destination",
  "Atrium",
  "Luxury",
  "Retail",
  "Culture",
  "Nightlife",
];

export const fallingWords = [
  "Fashion",
  "Events",
  "Dining",
  "Movement",
  "Crowds",
  "Cinema",
];
