export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    // این خط را اضافه کنید تا علت واقعی خطا را ببینید
    console.error("Error fetching cabin:", error);
    
    return Response.json({ message: "Cabin not found" }, { status: 404 });
  }
}