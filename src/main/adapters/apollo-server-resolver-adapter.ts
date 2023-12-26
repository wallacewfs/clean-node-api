import { Controller } from '@/presentation/protocols'

export const adaptResolver = async (controller: Controller, args: any): Promise<any> => {
  const httResponse = await controller.handle(args)
  return httResponse.body
}
