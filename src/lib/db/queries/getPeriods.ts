import { db } from '../index'
import { periodsTable, type SelectPeriod } from '../schemas/periods'

export async function getPeriods(): Promise<SelectPeriod[]> {
  return await db.select().from(periodsTable);
}
