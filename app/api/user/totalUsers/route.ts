import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
	try {
		await dbConnect();

		const totalUsers = await User.countDocuments();

		return NextResponse.json({ totalUsers }, { status: 200 });
	} catch (error) {
		console.error("Error fetching total user count:", error);

		return NextResponse.json({ error: 'Failed to fetch user count' }, { status: 500 });
	}
}
