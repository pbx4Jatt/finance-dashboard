import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function GET() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data.transactions);
    } catch (error) {
        console.error('Error reading data file:', error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Read existing data
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Create new transaction
        const newTransaction = {
            id: Date.now(),
            name: body.name,
            category: body.category,
            date: new Date().toISOString(),
            amount: Number(body.amount)
        };

        // Add to top of list
        data.transactions.unshift(newTransaction);

        // Write back to file
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error('Error writing data file:', error);
        return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const idToDelete = body.id;

        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Filter out the transaction
        const initialLength = data.transactions.length;
        data.transactions = data.transactions.filter((tx: any) => tx.id !== idToDelete);

        if (data.transactions.length === initialLength) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting data from file:', error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
