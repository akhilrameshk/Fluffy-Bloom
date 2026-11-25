// Static page copy for Vision and About. Edit here.
// NOTE: wording below came from the design draft - confirm the claims with the client before launch.
export type IconKey = 'spa' | 'heart' | 'verified' | 'handshake' | 'place';

export const VISION = {
  title: 'OUR VISION',
  heading: 'EMPOWERING COMFORT, CONFIDENCE & QUALITY',
  body: 'Bringing everyday comfort, premium quality, and effortless confidence to women across Kerala. From Alappuzha to every corner of the state.',
  cta: { label: 'Our Journey & Story', href: '/about' },
  valuesTitle: 'Our Purpose & Values',
  values: [
    { icon: 'spa' as IconKey, title: 'Uncompromising Comfort', text: 'Crafting everyday innerwear using soft, breathable, premium fabrics that feel like a second skin, supporting women through every stage of life.' },
    { icon: 'heart' as IconKey, title: 'Confidence in Every Fit', text: 'Designed to empower every woman with tailored, body-positive fits that require zero compromise on elegance, style, or self-assurance.' },
    { icon: 'verified' as IconKey, title: 'Quality & Trust', text: 'Maintaining the highest standards of materials, hygiene, and ethical crafting across our collections, setting a benchmark for ladies innerwear in Kerala.' },
  ],
  expandTitle: 'Expanding Across Kerala',
  footprint: {
    title: 'The Fluffy Bloom Footprint: Cherthala to All of Kerala',
    text: 'From our roots in Cherthala and Thiruvampadi, Alappuzha, our vision is to establish welcoming, woman-friendly retail experiences across every district in Kerala. Expanding accessible, specialized innerwear solutions with warm hospitality.',
    chips: [
      { title: 'Cherthala Branch (Established)', text: 'Our foundational store' },
      { title: 'Thiruvampadi, Alappuzha (New Branch)', text: 'Second flagship location' },
      { title: 'Kerala Expansion Roadmap', text: 'Vision for upcoming regional experience hubs' },
    ],
  },
  commitment: {
    title: 'Our Commitment to Women',
    text: 'A Space for All: Inclusive sizing, expert personalized fitting, maternity & nursing care, and specialized innerwear designed for all-day comfort and active South Indian lifestyles.',
  },
};

export const ABOUT = {
  title: 'ABOUT US',
  subtitle: 'The Fluffy Bloom Story: Comfort, Care & Community',
  heading: 'Empowering Women with',
  headingAccent: 'Comfort & Everyday Confidence',
  body: "From a single dream in Cherthala to Alappuzha's favourite ladies innerwear destination, crafted for every woman.",
  cta: { label: 'Explore Our Journey', href: '/vision' },
  milestonesTitle: 'Milestones & Journey',
  milestonesSub: 'Our Evolution across Alappuzha',
  milestones: [
    { title: 'The Beginning', text: 'Launched our first flagship store in Cherthala, Alappuzha, bringing premium comfort and a dedicated ladies shopping experience.' },
    { title: 'Growing Together', text: 'Gained the trust of families across the district through uncompromising quality, care, and privacy.' },
    { title: '2026 - Expanding to Thiruvampadi', text: 'Opened our second branch at Thiruvampadi, Alappuzha, bringing Fluffy Bloom closer to your neighbourhood with a wider range of innerwear, loungewear, and essentials.' },
  ],
  drivesTitle: 'What Drives Us',
  drives: [
    { icon: 'spa' as IconKey, title: 'Uncompromised Comfort', text: 'Carefully curated fabrics, skin-friendly materials, and sizes for every body type.' },
    { icon: 'handshake' as IconKey, title: 'A Trusted Haven', text: 'A warm, respectful, and completely comfortable shopping environment for women and families.' },
    { icon: 'place' as IconKey, title: 'Local Heritage', text: 'Proudly rooted in Alappuzha, serving Cherthala and Thiruvampadi with dedication and love.' },
  ],
};
