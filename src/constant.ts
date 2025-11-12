export const SPECIAL_ROLE = {
  "MAINTAINER": "maintainer"
} as const


export const ORG_ADMIN = {
  "ADMIN": "admin",
  ...SPECIAL_ROLE,
} as const


export const ORG_ROLE = {
  "MEMBER": "member",
  ...ORG_ADMIN,
} as const

export const EVENT_STATUS = {
  "INACTIVE": "inactive",
  "ACTIVE": "active",
  "FINISHED": "finished"
} as const

