import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
	try {
		await dbConnect();
		console.log("The GET route was called");

		// Exclude the 'password' field
		const users = await User.find().select('-password');

		return NextResponse.json(users, { status: 200 });
	} catch (error) {
		console.error("Error fetching users:", error);

		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}
