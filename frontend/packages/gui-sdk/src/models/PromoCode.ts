export enum PromoType {
  Package = "package",
  Invite = "invite",
  Report = "report",
}

export enum PromoStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DRAFT = "draft",
  ARCHIVED = "archived",
}

export type PackagePromo = {
  packageId?: string;
  parentPackageId: string;
  products?: { id: string; amount: number; shortName?: string }[];
  discountAmount?: number;
};

export interface PromoCode {
  id?: string;

  promoCode: string;
  type: PromoType;
  status: PromoStatus;
  description?: string;
  usageCount?: number;
  usageCountPerUser?: number;
  leftCount?: number;
  revenueAmount?: number;
  discountPercent?: number;
  discountAmount?: number;
  startDate?: number;
  expiration?: number;
  currentUsageCount?: number;
  usedRevenue?: number;

  assigned?: { packageId: string; mainPackageId: string }[];
  assign?: PackagePromo[];

  createdBy?: string;
  updatedBy?: string;

  createdAt?: number;
  createdOn?: string;

  updatedAt?: number;
  updatedOn?: string;

  activatedAt?: number;
  deactivatedAt?: number;
}

