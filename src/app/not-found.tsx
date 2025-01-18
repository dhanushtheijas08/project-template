"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen text-primary/90">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold mb-4">
          <span className="inline-block mr-2 -rotate-12">4</span>
          <span className="inline-block animate-bounce">0</span>
          <span className="inline-block ml-2 rotate-12">4</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className=" mb-8 max-w-xs mx-auto text-muted-foreground">
          {`We're sorry, but the page you're looking for doesn't exist or has been
          moved.`}
        </p>
        <Button asChild className="font-semibold bg-primary/90">
          <Link href="/">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
