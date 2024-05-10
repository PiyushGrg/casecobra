'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getConfigDetails = async (configId:string) => {
  try{
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
        throw new Error('You need to be logged in to view this page.')
    }

    const config = await db.configuration.findFirst({
        where: { id: configId },
    });

    if (!config) throw new Error('This config does not exist.')

    return { config };
    
  } catch (error:any) {
    return { error: error.message }
  }
}