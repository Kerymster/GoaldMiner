import type { OrganizationPayload } from '../../../../types/organization'

export type OrganizationFormStepHandlers = {
  payload: OrganizationPayload
  patchPayload: (patch: Partial<OrganizationPayload>) => void
}
