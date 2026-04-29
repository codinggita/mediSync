import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function clean() {
  await mongoose.connect(process.env.MONGO_URI);
  const res = await mongoose.connection.db.collection('medicalrecords').updateMany(
    { fileUrl: { $regex: '^https://medisync.app' } },
    {
      $set: {
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    }
  );
  console.log('Updated ' + res.modifiedCount + ' records');
  process.exit(0);
}
clean();
