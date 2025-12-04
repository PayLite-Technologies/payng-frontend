import { ReactNode, Suspense } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full max-w-md">{children}</div>
      </Suspense>
    </div>
  );
}
