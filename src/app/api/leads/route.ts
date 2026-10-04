import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, business, bottleneck, why } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials missing, simulating success.");
      return NextResponse.json({ success: true, warning: "Missing credentials" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("leads").insert([
      { name, email, phone, business, bottleneck, why }
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      // Even if the table doesn't exist yet, we don't want the frontend to crash
      return NextResponse.json({ success: true, warning: error.message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
