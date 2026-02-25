const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSchema() {
    console.log("Trying to insert real object to get error...");
    const { data, error } = await supabase.from('Transactions').insert([{ name: 'Test', amount: 100 }]).select();
    console.log("Error:", error);
}

checkSchema();
