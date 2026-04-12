import type { CreateUserInput, User } from '../interfaces/User'

type EnrichedCreateInput = CreateUserInput & Pick<User, 'role' | 'createdAt'>
type CreateUserMethod = (input: CreateUserInput) => User

export function enrichNewUser(
  _target: object,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<CreateUserMethod>,
) {
  const originalMethod = descriptor.value

  if (!originalMethod) {
    return descriptor
  }

  descriptor.value = function decorateCreate(input: CreateUserInput) {
    const enrichedInput: EnrichedCreateInput = {
      ...input,
      role: 'user',
      createdAt: Date.now(),
    }

    return originalMethod.call(this, enrichedInput)
  }

  return descriptor
}
