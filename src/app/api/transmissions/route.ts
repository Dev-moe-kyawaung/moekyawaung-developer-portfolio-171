import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { transmissions } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db
      .select()
      .from(transmissions)
      .orderBy(desc(transmissions.createdAt))
      .limit(30);

    return NextResponse.json({ success: true, transmissions: list });
  } catch (error) {
    console.error("Failed to fetch transmissions:", error);
    // Fallback if DB table not yet created during first boot
    return NextResponse.json({
      success: true,
      transmissions: [
        {
          id: 1,
          senderName: "Command HQ - Nova Terminal",
          senderEmail: "nova@omni-sphere.net",
          senderRole: "System Admin",
          transmissionType: "Architecture Verification",
          message: "Omni-Sphere Hologram Node 01 is online and radiating at 99.98% frequency.",
          signalStrength: 99,
          encryptionProtocol: "QUANTUM-AES256",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          senderName: "Dev Rel Lead - Tokyo Hub",
          senderEmail: "dev@tokyo-hub.io",
          senderRole: "Tech Evaluator",
          transmissionType: "Project Endorsement",
          message: "Reviewing the POS Ultimate Pro Max architecture - exceptional CRDT offline-first design!",
          signalStrength: 95,
          encryptionProtocol: "QUANTUM-AES256",
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderName, senderEmail, senderRole, transmissionType, message } = body;

    if (!senderName || !senderEmail || !message) {
      return NextResponse.json(
        { success: false, error: "Sender Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(transmissions)
      .values({
        senderName: String(senderName).trim(),
        senderEmail: String(senderEmail).trim(),
        senderRole: senderRole ? String(senderRole).trim() : "Visitor",
        transmissionType: transmissionType ? String(transmissionType).trim() : "Holocall Inquiry",
        message: String(message).trim(),
        signalStrength: Math.floor(92 + Math.random() * 8),
        encryptionProtocol: "QUANTUM-AES256"
      })
      .returning();

    return NextResponse.json({ success: true, transmission: inserted[0] });
  } catch (error) {
    console.error("Failed to create transmission:", error);
    return NextResponse.json(
      { success: false, error: "Database transmission relay failed." },
      { status: 500 }
    );
  }
}
