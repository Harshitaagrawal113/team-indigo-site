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
  pehel: "/images/PEHEL.jpg",
  documentary: "/images/documentary.jpg",
  team: "/images/team.jpeg",
};

export const stories = [
  { number: "01", label: "PEHEL / EVERY DIWALI", title: "A celebration of people", description: "Pehel is Team Indigo’s Diwali event for the auxiliary staff of GGITS. Students come together to organize performances and celebrate the people who help the campus run every day.", image: images.pehel },
  { number: "02", label: "PEHEL / THE FILM", title: "Their stories, on screen", description: "We create a documentary about the auxiliary staff and the hard work behind keeping our college safe and clean. It is a moment to see and appreciate the people whose work is often unseen.", image: images.documentary },
  { number: "03", label: "PEHEL / THE DRIVE", title: "Giving, together", description: "The college community contributes funds for gift hampers. Team Indigo brings together Diwali gifts and useful things, then distributes the hampers to the auxiliary staff during Pehel.", image: images.crew },
];

export const events = [
  { title: "Pahal", type: "FLAGSHIP EVENT", theme: "Team Indigo’s major event", image: images.pehel },
  { title: "Beat Blaze", type: "TEAM INDIGO EVENT", theme: "More details coming soon", image: images.crew },
  { title: "Open Day", type: "TEAM INDIGO EVENT", theme: "More details coming soon", image: images.team },
  { title: "Winter Breeze", type: "TEAM INDIGO EVENT", theme: "More details coming soon", image: images.documentary },
];

export const teamLeads = [
  { name: "Harshita Agrawal", role: "TEAM LEAD", image: "/images/harshita.jpeg", group: "LEAD" },
  { name: "Bhavya Upadhyay", role: "TEAM LEAD", image: "/images/bhavya.jpeg", group: "LEAD" },
  { name: "Ayushman Dubey", role: "TEAM LEAD", image: "/images/ayushman.jpeg", group: "LEAD" },
  { name: "Gaurav Jain", role: "TEAM LEAD", image: "/images/gaurav.jpeg", group: "LEAD" },
];

export const coreTeam = [
  { name: "Shiva Sharma", role: "TECHNICAL HEAD", image: "/images/shiva.jpg", group: "CORE TEAM" },
  { name: "Arpit Sharma", role: "TECHNICAL HEAD", image: "/images/arpit.jpeg", group: "CORE TEAM" },
  { name: "Sanidhya Tiwari", role: "GRAPHICS HEAD", image: "/images/sanidhya.jpeg", group: "CORE TEAM" },
  { name: "Shailendra Yadav", role: "GRAPHICS HEAD", image: "/images/shailendra.jpeg", group: "CORE TEAM" },
  { name: "Harsh Tripathi", role: "GRAPHICS HEAD", image: "/images/Harsh.jpeg", group: "CORE TEAM" },
];

export const teamMembers = [...teamLeads, ...coreTeam];
