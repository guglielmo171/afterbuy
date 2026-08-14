import { z } from "zod";
import {
  isCalendarDate,
  type CalendarDate,
} from "@/shared/lib/calendar-date";

export const calendarDateSchema = z
  .string()
  .refine((value): value is CalendarDate => isCalendarDate(value), {
    message: "Invalid calendar date",
  });
