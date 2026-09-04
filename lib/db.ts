export enum InquiryStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  PROPOSAL_SENT = "PROPOSAL_SENT",
  WON = "WON",
  LOST = "LOST",
  CLOSED = "CLOSED",
}

export interface CreateInquiryInput {
  name: string;
  email: string;
  company?: string;
  capabilities: string[];
  budget?: string;
  projectDescription?: string;
}

export interface ProjectInquiryRecord {
  id: string;
  name: string;
  email: string;
  company: string | null;
  capabilities: string[];
  budget: string | null;
  projectDescription: string | null;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

let prismaClientInstance: any = null;

function getPrismaClient() {
  if (prismaClientInstance) return prismaClientInstance;
  if (!process.env.DATABASE_URL) return null;
  try {
    // Dynamically load PrismaClient if available
    const { PrismaClient } = require("@prisma/client");
    prismaClientInstance = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
    return prismaClientInstance;
  } catch (err) {
    console.warn("[Database Warning] Could not instantiate PrismaClient:", err);
    return null;
  }
}

// In-memory fallback cache for development/testing when database is offline or DATABASE_URL not set
const memoryInquiries: ProjectInquiryRecord[] = [];

/**
 * Persists a new Project Inquiry to PostgreSQL via Prisma.
 * Falls back gracefully to memory store if DATABASE_URL is not set during local dev/testing.
 */
export async function saveProjectInquiry(input: CreateInquiryInput): Promise<ProjectInquiryRecord> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const prisma = getPrismaClient();

  if (prisma && process.env.DATABASE_URL) {
    try {
      const record = await prisma.projectInquiry.create({
        data: {
          name: input.name.trim(),
          email: normalizedEmail,
          company: input.company?.trim() || null,
          capabilities: input.capabilities,
          budget: input.budget?.trim() || null,
          projectDescription: input.projectDescription?.trim() || null,
          status: InquiryStatus.NEW,
        },
      });
      return {
        ...record,
        status: (record.status as InquiryStatus) || InquiryStatus.NEW,
      };
    } catch (error) {
      console.error("[Database Error] Failed to persist inquiry via Prisma:", error);
      throw error;
    }
  } else {
    if (!process.env.DATABASE_URL) {
      console.info("[Database Info] DATABASE_URL is not set. Saving inquiry to local memory store.");
    }
    const record: ProjectInquiryRecord = {
      id: `inquiry-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: input.name.trim(),
      email: normalizedEmail,
      company: input.company?.trim() || null,
      capabilities: input.capabilities,
      budget: input.budget?.trim() || null,
      projectDescription: input.projectDescription?.trim() || null,
      status: InquiryStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryInquiries.push(record);
    return record;
  }
}
