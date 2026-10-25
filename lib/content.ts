export const club = {
  name: "Team Indigo",
  shortName: "Indigo",
  initials: "TI",
  college: "Gyan Ganga Institute of Technology and Sciences",
  email: "",
  // Keep club social destinations in one place for contact and navigation links.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/teamindigoggits/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/team-indigo-ggits/" },
  ] as { label: string; href: string }[],
};

export const images = {
  crew: "/images/4leads.jpeg",
  pehel: "/images/PEHEL.jpg",
  documentary: "/images/documentary.jpg",
  team: "/images/team.jpeg",
};

export const beatPlaceImages = [
  "/images/beatblaze/image.png",
  "/images/beatblaze/image copy.png",
  "/images/beatblaze/image copy 2.png",
  "/images/beatblaze/image copy 3.png",
  "/images/beatblaze/image copy 4.png",
  "/images/beatblaze/image copy 5.png",
  "/images/beatblaze/dance1.png",
  "/images/beatblaze/WhatsApp Image 2026-10-23 at 00.56.23.jpeg",
  "/images/beatblaze/WhatsApp Image 2026-10-23 at 00.59.03.jpeg",
  "/images/beatblaze/WhatsApp Image 2026-10-23 at 01.30.59.jpeg",
];

export const tourismDayImages = [
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.39.30%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-23%20at%2012.44.50%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.33.57%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.37.37%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.36.17%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.31.13%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.10.50%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.36.46%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.35.08%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.40.49%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.40.02%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.38.48%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.31.43%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.34.37%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.33.09%E2%80%AFAM.png",
  "/images/tourism-day/Screenshot%202026-10-25%20at%201.32.37%E2%80%AFAM.png",
];

export const teachersDayImages = [
  "/images/teachers-day/IMG20260905124658.jpg",
  "/images/teachers-day/IMG20260905120749.jpg",
  "/images/teachers-day/IMG20260905125815.jpg",
  "/images/teachers-day/IMG20260905115742.jpg",
  "/images/teachers-day/IMG20260905122930.jpg",
  "/images/teachers-day/IMG20260905120700.jpg",
  "/images/teachers-day/IMG20260905115802.jpg",
  "/images/teachers-day/IMG20260905131211.jpg",
  "/images/teachers-day/IMG20260905120323.jpg",
  "/images/teachers-day/IMG20260905115941.jpg",
  "/images/teachers-day/IMG20260905120656.jpg",
  "/images/teachers-day/IMG20260905115759.jpg",
  "/images/teachers-day/IMG20260905122917.jpg",
  "/images/teachers-day/IMG20260905115941%20(1).jpg",
];

export const stories = [
  { number: "01", label: "PEHEL / EVERY DIWALI", title: "A celebration of people", description: "Pehel is Team Indigo’s Diwali event for the auxiliary staff of GGITS. Students come together to organize performances and celebrate the people who help the campus run every day.", image: "/images/pehel.jpeg" },
  { number: "02", label: "PEHEL / THE FILM", title: "Their stories, on screen", description: "We create a documentary about the auxiliary staff and the hard work behind keeping our college safe and clean. It is a moment to see and appreciate the people whose work is often unseen.", image: images.documentary },
  { number: "03", label: "PEHEL / THE DRIVE", title: "Giving, together", description: "The college community contributes funds for gift hampers. Team Indigo brings together Diwali gifts and useful things, then distributes the hampers to the auxiliary staff during Pehel.", image: "/images/pehel-poster.png" },
];

export const events = [
  { title: "Pehel – एक नई सुबह", type: "FLAGSHIP EVENT", theme: "Team Indigo’s major event", image: images.pehel },
  { title: "Beat Blaze", type: "INTERNATIONAL DANCE DAY", theme: "Dance competition", image: "/images/beatblaze/beat-poster.jpeg" },
  { title: "Tourism Day", type: "SPANDAN / CULTURAL SHOWCASE", theme: "Celebrating cultures through dance", image: tourismDayImages[0] },
  { title: "Teachers’ Day", type: "ANNUAL TRIBUTE", theme: "Games, performances, and gratitude", image: teachersDayImages[0] },
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

export const mentors = [
  { name: "Ujjwal Singh Thakur", image: "/images/ujjwal.jpeg" },
  { name: "Anushka Bondre", image: "/images/anushka.png" },
  { name: "Suryansh Asati", image: "/images/suryansh.png" },
  { name: "Aaditya Chhipa", image: "/images/aditya.png" },
  { name: "Siddharth Nema", image: "/images/siddharth.jpeg" },
  { name: "Ayush Pandey", image: "/images/ayush.png" },
];
