export const club = {
  name: "Team Indigo",
  shortName: "Indigo",
  initials: "TI",
  college: "Gyan Ganga Institute of Technology and Sciences",
  email: "",
  // Replace these draft destinations with verified club links before launch.
  socials: [{ label: "Instagram", href: "https://www.instagram.com/teamindigoggits/" }] as { label: string; href: string }[],
};

export const images = {
  crew: "/images/crew.jpg",
  pehel: "/images/pehel.jpg",
  documentary: "/images/documentary.jpg",
};

export const stories = [
  { number: "01", label: "PEHEL / EVERY DIWALI", title: "A celebration of people", description: "Pehel is Team Indigo’s Diwali event for the auxiliary staff of GGITS. Students come together to organize performances and celebrate the people who help the campus run every day.", image: images.pehel },
  { number: "02", label: "PEHEL / THE FILM", title: "Their stories, on screen", description: "We create a documentary about the auxiliary staff and the hard work behind keeping our college safe and clean. It is a moment to see and appreciate the people whose work is often unseen.", image: images.documentary },
  { number: "03", label: "PEHEL / THE DRIVE", title: "Giving, together", description: "The college community contributes funds for gift hampers. Team Indigo brings together Diwali gifts and useful things, then distributes the hampers to the auxiliary staff during Pehel.", image: images.crew },
];

export const archive = [
  { title: "Performances", type: "PEHEL", theme: "For auxiliary staff", image: images.pehel },
  { title: "The documentary", type: "PEHEL", theme: "Their hard work", image: images.documentary },
  { title: "The hamper drive", type: "PEHEL", theme: "College-wide giving", image: images.crew },
  { title: "The celebration", type: "PEHEL", theme: "Every Diwali", image: images.pehel },
];

export const roles = ["EVENTS", "PRODUCTION", "CREATIVE", "OPERATIONS", "COMMUNITY"];
