'use server';

import { db } from '@/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'

export type SaveConfigArgs = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
}

export async function saveConfiguration({color,finish,material,model,configId}: SaveConfigArgs) {
  try {

    await db.configuration.update({
      where: { id: configId },
      data: { 
        color: color,
        finish: finish,
        material: material,
        model: model
      }
    });
  
    return true;
  } catch (error:any) {
    // console.log(error);
    return false;
  }
}