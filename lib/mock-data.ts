/**
 * Mock data for the tennis court booking application
 */

// Mock courts
export const courts = [
  {
    id: "court1",
    name: "Center Court",
    description: "Our premier court with stadium seating",
    imageUrl: "/images/courts/center-court.jpg",
    hourlyRate: 40,
    isIndoor: false,
    surface: "Hard",
    location: "Main Facility"
  },
  {
    id: "court2",
    name: "Indoor Court 1",
    description: "Climate controlled indoor court",
    imageUrl: "/images/courts/indoor-court.jpg",
    hourlyRate: 35,
    isIndoor: true,
    surface: "Hard",
    location: "Main Facility"
  },
  {
    id: "court3",
    name: "Clay Court",
    description: "Professional clay surface",
    imageUrl: "/images/courts/clay-court.jpg",
    hourlyRate: 45,
    isIndoor: false,
    surface: "Clay",
    location: "East Wing"
  }
];

// Mock users
export const users = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    image: "/images/avatars/john.jpg"
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "/images/avatars/jane.jpg"
  },
  {
    id: "user3",
    name: "Bob Wilson",
    email: "bob@example.com",
    image: "/images/avatars/bob.jpg"
  }
];

// Mock open sessions
let openSessions = [
  {
    id: "session1",
    courtId: "court1",
    court: courts.find(c => c.id === "court1"),
    creatorId: "user1",
    creator: users.find(u => u.id === "user1"),
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    endTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), // Tomorrow + 2 hours
    totalCost: 80,
    maxPlayers: 4,
    description: "Casual doubles game, all skill levels welcome!",
    status: "OPEN",
    participants: [
      {
        id: "participant1",
        userId: "user1",
        userName: "John Doe",
        hasPaid: true
      }
    ]
  },
  {
    id: "session2",
    courtId: "court2",
    court: courts.find(c => c.id === "court2"),
    creatorId: "user2",
    creator: users.find(u => u.id === "user2"),
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000).toISOString(), // + 1.5 hours
    totalCost: 52.5,
    maxPlayers: 2,
    description: "Singles practice match, intermediate level",
    status: "OPEN",
    participants: [
      {
        id: "participant2",
        userId: "user2",
        userName: "Jane Smith",
        hasPaid: true
      }
    ]
  },
  {
    id: "session3",
    courtId: "court3",
    court: courts.find(c => c.id === "court3"),
    creatorId: "user3",
    creator: users.find(u => u.id === "user3"),
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // + 2 hours
    totalCost: 90,
    maxPlayers: 4,
    description: "Clay court experience, doubles game",
    status: "OPEN",
    participants: [
      {
        id: "participant3",
        userId: "user3",
        userName: "Bob Wilson",
        hasPaid: true
      },
      {
        id: "participant4",
        userId: "user1",
        userName: "John Doe",
        hasPaid: true
      }
    ]
  }
];

// Mock session for the currently logged-in user
export const currentUser = users[0]; // Default to the first user

// Functions to interact with mock data
export const getOpenSessions = () => {
  return openSessions;
};

export const getOpenSessionById = (sessionId: string) => {
  return openSessions.find(session => session.id === sessionId) || null;
};

export const createOpenSession = (sessionData: any) => {
  const newSession = {
    id: `session${openSessions.length + 1}`,
    courtId: sessionData.courtId,
    court: courts.find(c => c.id === sessionData.courtId),
    creatorId: currentUser.id,
    creator: currentUser,
    startTime: sessionData.startTime,
    endTime: sessionData.endTime,
    totalCost: sessionData.totalCost,
    maxPlayers: sessionData.maxPlayers,
    description: sessionData.description,
    status: "OPEN",
    participants: [
      {
        id: `participant${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        hasPaid: true // Creator automatically pays
      }
    ]
  };

  openSessions.push(newSession);
  return newSession;
};

export const joinOpenSession = (sessionId: string) => {
  const session = openSessions.find(s => s.id === sessionId);
  
  if (!session) {
    throw new Error("Session not found");
  }
  
  if (session.participants.length >= session.maxPlayers) {
    throw new Error("Session is full");
  }
  
  if (session.status !== "OPEN") {
    throw new Error("Session is not open for joining");
  }
  
  // Check if user already joined
  if (session.participants.some(p => p.userId === currentUser.id)) {
    throw new Error("You have already joined this session");
  }
  
  const participantId = `participant${Date.now()}`;
  
  const newParticipant = {
    id: participantId,
    userId: currentUser.id,
    userName: currentUser.name,
    hasPaid: false
  };
  
  session.participants.push(newParticipant);
  
  // Update session status if full
  if (session.participants.length >= session.maxPlayers) {
    session.status = "FULL";
  }
  
  return {
    participantId,
    session
  };
};

export const completePayment = (participantId: string) => {
  let foundSession = null;
  let foundParticipant = null;
  
  for (const session of openSessions) {
    const participant = session.participants.find(p => p.id === participantId);
    if (participant) {
      participant.hasPaid = true;
      foundParticipant = participant;
      foundSession = session;
      break;
    }
  }
  
  if (!foundParticipant || !foundSession) {
    throw new Error("Participant not found");
  }
  
  return {
    participant: foundParticipant,
    session: foundSession
  };
};

// For the mock auth mechanism
export const getMockSession = () => {
  return {
    session: {
      user: currentUser,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    }
  };
}; 