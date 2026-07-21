import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import available_rooms from "../../data-gen/available_rooms.json" with { type: "json" };

async function main() {}

main()
  .then(async () => {
    const data = [];
    const seenIds = new Set();
    for (let batch in available_rooms) {
      for (let gender in available_rooms[batch]) {
        const capacity = available_rooms[batch][gender]["capacity"];
        for (let hostel in available_rooms[batch][gender]["hostels"]) {
          console.log("adding for", batch, gender, hostel, capacity);
          for (let floor in available_rooms[batch][gender]["hostels"][hostel]) {
            for (let roomsRange of available_rooms[batch][gender]["hostels"][hostel][floor]) {
              roomsRange = roomsRange.split("-");
              /* If floor is not same */
              if (roomsRange[0][0] !== roomsRange[1][0]) {
                throw new Error(`Both ends of the room range ${roomsRange[0]}-${roomsRange[1]} have different floors`);
              }
              const low = parseInt(roomsRange[0]);
              const high = parseInt(roomsRange[1]);
              for (let room = low; room <= high; room++) {
                const roomNum = `${room.toString().padStart(3, "0")}`;
                const roomId = `${hostel}${floor}-${roomNum}-${batch}`;
                if (seenIds.has(roomId)) continue;
                seenIds.add(roomId);
                
                data.push({
                    roomId,
                    hostel,
                    floor,
                    gender,
                    roomNum,
                    batch,
                    capacity,
                    numFilled: 0,
                    students: [],
                    roommateCode: null,
                  }
                );
              }
            }
          }
        }
      }
    }

    // Insert in batches of 100 to avoid validation issues
    // Note: skipDuplicates is not supported in MongoDB with Prisma
    const BATCH_SIZE = 100;
    let totalCreated = 0;

    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      try {
        const result = await prisma.rooms.createMany({
          data: batch
        });
        totalCreated += result.count;
        console.log(`Inserted batch ${Math.floor(i/BATCH_SIZE) + 1}: ${result.count} rooms (total: ${totalCreated}/${data.length})`);
      } catch (error) {
        console.log(`Batch ${Math.floor(i/BATCH_SIZE) + 1} skipped (may contain duplicates)`);
      }
    }

    console.log(`\nSeeding completed! Created ${totalCreated} rooms.`);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
/* vi: set et sw=2: */
