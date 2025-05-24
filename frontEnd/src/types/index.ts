export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'voter';
  firstName?: string;
  lastName?: string;
}

export interface Voter {
  id: string;
  userId: string;
  registrationNumber: string;
  status: 'registered' | 'verified' | 'rejected';
  votingDistrict: string;
  hasVoted: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  biography: string;
  photoUrl?: string;
  electionId: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'closed';
}

export interface Ballot {
  id: string;
  electionId: string;
  voterId: string;
  castTime: string;
  verified: boolean;
}

export interface Vote {
  id: string;
  ballotId: string;
  candidateId: string;
  position: string;
}

export interface ElectionResult {
  electionId: string;
  position: string;
  candidateId: string;
  candidateName: string;
  party: string;
  voteCount: number;
  percentage: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  entityType: 'voter' | 'candidate' | 'election' | 'ballot' | 'system';
  entityId: string;
  details: string;
} 