export enum InquiryStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  PROPOSAL_SENT = "PROPOSAL_SENT",
  WON = "WON",
  LOST = "LOST",
  CLOSED = "CLOSED",
}

export enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
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
  notificationStatus: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

let prismaClientInstance: any = null;

function getPrismaClient() {
  if (prismaClientInstance) return prismaClientInstance;
  if (!process.env.DATABASE_URL) return null;
  try {
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
 * Initial status: NEW
 * Initial notificationStatus: PENDING
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
          notificationStatus: NotificationStatus.PENDING,
        },
      });
      return {
        ...record,
        status: (record.status as InquiryStatus) || InquiryStatus.NEW,
        notificationStatus: (record.notificationStatus as NotificationStatus) || NotificationStatus.PENDING,
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
      notificationStatus: NotificationStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryInquiries.push(record);
    return record;
  }
}

/**
 * Updates the notificationStatus (SENT or FAILED) of a stored Project Inquiry.
 */
export async function updateInquiryNotificationStatus(
  id: string,
  notificationStatus: NotificationStatus
): Promise<void> {
  const prisma = getPrismaClient();

  if (prisma && process.env.DATABASE_URL) {
    try {
      await prisma.projectInquiry.update({
        where: { id },
        data: { notificationStatus },
      });
      console.info(`[Database Info] Updated notificationStatus for ${id} to ${notificationStatus}`);
    } catch (error) {
      console.error(`[Database Error] Failed to update notificationStatus for ${id}:`, error);
    }
  } else {
    const item = memoryInquiries.find((m) => m.id === id);
    if (item) {
      item.notificationStatus = notificationStatus;
      item.updatedAt = new Date();
      console.info(`[Memory Store Info] Updated notificationStatus for ${id} to ${notificationStatus}`);
    }
  }
}
