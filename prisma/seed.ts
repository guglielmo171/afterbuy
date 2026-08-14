import { PrismaClient, ReturnStatus } from "@prisma/client";
import { calculateReturnDeadline } from "../src/entities/return-case/lib/calculate-return-deadline";
import { classifyDeadlineUrgency } from "../src/entities/return-case/lib/classify-deadline-urgency";
import {
  addCalendarDays,
  calendarDateToUtcMidnight,
  utcMidnightToCalendarDate,
} from "../src/shared/lib/calendar-date";
import { getTodayCalendarDate } from "../src/shared/lib/today";

const prisma = new PrismaClient();

const RETURN_POLICY_DAYS = 30;

async function main() {
  const seedToday = getTodayCalendarDate();
  console.log(`seedToday (Europe/Berlin): ${seedToday}`);

  const store = await prisma.store.upsert({
    where: { name: "Example Store" },
    create: {
      name: "Example Store",
      defaultReturnPolicyDays: RETURN_POLICY_DAYS,
    },
    update: {},
  });

  const scenarios: Array<{
    productName: string;
    purchaseDate: string;
    priceCents: number;
    status: ReturnStatus;
    label: string;
  }> = [
    {
      productName: "Wireless headphones",
      purchaseDate: addCalendarDays(seedToday, -(RETURN_POLICY_DAYS + 5)),
      priceCents: 8999,
      status: ReturnStatus.return_planned,
      label: "overdue",
    },
    {
      productName: "Desk lamp",
      purchaseDate: addCalendarDays(
        addCalendarDays(seedToday, 3),
        -RETURN_POLICY_DAYS,
      ),
      priceCents: 4599,
      status: ReturnStatus.return_planned,
      label: "due soon",
    },
    {
      productName: "Kitchen scale",
      purchaseDate: addCalendarDays(seedToday, -10),
      priceCents: 2999,
      status: ReturnStatus.returned,
      label: "resolved",
    },
  ];

  for (const scenario of scenarios) {
    const returnDeadline = calculateReturnDeadline(
      scenario.purchaseDate,
      RETURN_POLICY_DAYS,
    );

    await prisma.purchase.create({
      data: {
        productName: scenario.productName,
        storeId: store.id,
        purchaseDate: calendarDateToUtcMidnight(scenario.purchaseDate),
        priceCents: scenario.priceCents,
        returnCase: {
          create: {
            returnPolicyDays: RETURN_POLICY_DAYS,
            returnDeadline: calendarDateToUtcMidnight(returnDeadline),
            status: scenario.status,
          },
        },
      },
    });
  }

  console.log("\nSeed report (return urgency vs seedToday):");
  const purchases = await prisma.purchase.findMany({
    include: { returnCase: true },
    orderBy: { productName: "asc" },
  });

  for (const purchase of purchases) {
    const returnCase = purchase.returnCase;
    if (!returnCase) {
      console.log(`- ${purchase.productName}: no ReturnCase`);
      continue;
    }

    const deadline = utcMidnightToCalendarDate(returnCase.returnDeadline);
    const urgency = classifyDeadlineUrgency(
      deadline,
      seedToday,
      returnCase.status,
    );

    console.log(
      `- ${purchase.productName}: status=${returnCase.status}, deadline=${deadline}, seedToday=${seedToday}, urgency=${urgency}`,
    );
  }

  console.log("\nSeed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
