import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-2.5">
      <h2 className={`text-9xl`}>403</h2>
      <h4 className="text-3xl">Access Denied</h4>
      <p className="text-xl">
        Oops! You don&apos;t have permission to access this page.
      </p>

      <Button asChild className="h-14 px-8 mt-5">
        <Link href="/">
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-lg">Back to home</span>
        </Link>
      </Button>
    </div>
  );
};

export default Unauthorized;
