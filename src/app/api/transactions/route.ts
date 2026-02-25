import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error reading data from Supabase:', error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Create new transaction
        const newTransaction = {
            name: body.name,
            category: body.category,
            date: new Date().toISOString(),
            amount: Number(body.amount)
        };

        const { data, error } = await supabase
            .from('transactions')
            .insert([newTransaction])
            .select();

        if (error) throw error;

        // Return the successfully inserted transaction
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error('Error writing data to Supabase:', error);
        return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const idToDelete = body.id;

        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', idToDelete);

        if (error) throw error;

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting data from Supabase:', error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
