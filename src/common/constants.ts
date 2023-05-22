export const mgsConst = {
  RECORD_ALREADY_EXISTS: "This skill already exists",
} as any;

export enum EUserRole {
  USER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
  MASTER_WORKER = 3,
  ASSISTANT_WORKER = 4,
}

export enum EUserStatus {
  PENDING = 0,
  ACTIVE = 1,
  BANNED = 2,
}
export enum EUserGender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}
