const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Monisme",
        },
        {
          name: "Daoisme",
        },
        {
          name: "Confucianisme",
        },
        {
          name: "Rationalism",
        },
        {
          name: "Empiricism",
        },
        {
          name: "Epicureanism",
        },
        {
          name: "Christian Platonism",
        },
        {
          name: "Arabic Aristotelianism",
        },
        {
          name: "Platonic/Aristotelian",
        },
        {
          name: "Realism",
        },
        {
          name: "Voluntarism",
        },
        {
          name: "Communism",
        },
        {
          name: "Phenomenology ",
        },
        {
          name: "Existentialism ",
        },
        {
          name: "Feminism ",
        },
        {
          name: "Technology ",
        },
        {
          name: "Dialectic Method",
        },
        {
          name: "Jews Aristotelianism",
        },
        {
          name: "Logic",
        },
        {
          name: "Indonesian Philosophy",
        },
        {
          name: "Atheism",
        },
        {
          name: "Atheism",
        },
        {
          name: "Analytic Philosophy",
        },
        {
          name: "Contemporary Philosophy",
        },
        {
          name: "Idealism",
        },
        {
          name: "Sadism",
        },
        {
          name: "Collectivist Anarchism",
        },
        {
          name: "Social Contract",
        },
        {
          name: "Transcendental Idealism",
        },
        {
          name: "Absurdism",
        },
        {
          name: "Deconstruction",
        },
      ],
    });
  } catch (error) {
    console.log("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();
