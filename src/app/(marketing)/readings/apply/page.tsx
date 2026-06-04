import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeader from "@/components/sections/section-header";
import ConstellationField from "@/components/visual/constellation-field";
import ApplyForm from "./apply-form";

export const metadata: Metadata = { title: "鑑定お申し込み" };

export default function ApplyPage() {
  return (
    <ConstellationField density="sparse">
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader
          eyebrow="Apply"
          title="鑑定お申し込み"
          sub="必要事項をご入力のうえ、決済にお進みください。"
        />
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            border: "1px solid var(--border-card)",
            padding: "32px",
            marginTop: "40px",
          }}
        >
          <Suspense fallback={<p style={{ color: "var(--text-muted)", textAlign: "center" }}>読み込み中...</p>}>
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </ConstellationField>
  );
}
