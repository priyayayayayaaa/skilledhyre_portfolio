export const APPROVED_CAPABILITIES = [
  "AI & Automation",
  "Software Engineering (.NET / C#)",
  "Web & Mobile Platforms",
  "ERP & Business Systems",
  "Digital Marketing & SEO",
  "Dedicated Tech Talent",
] as const;

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: {
    name: string;
    email: string;
    company?: string;
    capabilities: string[];
    budget?: string;
    projectDescription?: string;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProjectInquiryInput(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      isValid: false,
      errors: { _payload: "Invalid JSON request payload." },
    };
  }

  const input = body as Record<string, unknown>;

  // 1. Validate Name
  const rawName = typeof input.name === "string" ? input.name.trim() : "";
  if (!rawName) {
    errors.name = "Full name is required.";
  } else if (rawName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (rawName.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  // 2. Validate Email
  const rawEmail = typeof input.email === "string" ? input.email.trim() : "";
  if (!rawEmail) {
    errors.email = "Work email is required.";
  } else if (!EMAIL_REGEX.test(rawEmail)) {
    errors.email = "Please enter a valid email address.";
  } else if (rawEmail.length > 150) {
    errors.email = "Email cannot exceed 150 characters.";
  }

  // 3. Validate Company (Optional)
  const rawCompany = typeof input.company === "string" ? input.company.trim() : "";
  if (rawCompany.length > 100) {
    errors.company = "Company name cannot exceed 100 characters.";
  }

  // 4. Validate Capabilities
  const rawCapabilities = input.capabilities;
  let validCapabilities: string[] = [];

  if (!Array.isArray(rawCapabilities) || rawCapabilities.length === 0) {
    errors.capabilities = "Please select at least one capability.";
  } else {
    const invalidItems = rawCapabilities.filter(
      (item) => typeof item !== "string" || !APPROVED_CAPABILITIES.includes(item as any)
    );
    if (invalidItems.length > 0) {
      errors.capabilities = "One or more selected capabilities are invalid.";
    } else {
      validCapabilities = Array.from(new Set(rawCapabilities as string[]));
    }
  }

  // 5. Validate Budget (Free-text string, Optional)
  const rawBudget = typeof input.budget === "string" ? input.budget.trim() : "";
  if (rawBudget.length > 100) {
    errors.budget = "Budget description cannot exceed 100 characters.";
  }

  // 6. Validate Project Description (Optional)
  const rawDescription =
    typeof input.projectDescription === "string"
      ? input.projectDescription.trim()
      : typeof input.message === "string"
      ? input.message.trim()
      : "";

  if (rawDescription.length > 2000) {
    errors.projectDescription = "Project description cannot exceed 2000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: {},
    sanitizedData: {
      name: rawName,
      email: rawEmail.toLowerCase(),
      company: rawCompany || undefined,
      capabilities: validCapabilities,
      budget: rawBudget || undefined,
      projectDescription: rawDescription || undefined,
    },
  };
}
