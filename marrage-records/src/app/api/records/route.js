import connectDB from "@/lib/mongodb";
import MarriageRecord from "@/models/MarriageRecord";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const record = await MarriageRecord.create(data);
    return new Response(JSON.stringify(record), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const queryParams = url.searchParams;

    const query = {};
    queryParams.forEach((value, key) => {
      if (value) {
        query[key] = { $regex: value, $options: "i" };
      }
    });

    const records = await MarriageRecord.find(query);
    return new Response(JSON.stringify(records), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
