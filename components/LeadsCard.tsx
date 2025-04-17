"use client";
import { Crown } from "lucide-react";
import { AnimatedModalButton } from "./ui/animated-modalButton";
import { AnimatedTooltipPreview } from "./ui/animated-tooltipButton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";


const LeadsCard = () => {
  return (
    <>
      <Card className="bg-white dark:bg-neutral-800 h-72">
        <CardHeader>
          <span>
            <Crown size={32} />

          </span>
          <CardTitle>
            Run Campaign <span className="text-sm" >(PRO)</span> 

          </CardTitle>
          <CardDescription>
            Use Infinity SAAS to run your creative email campaign better than ever.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatedModalButton />
          <div className="mt-4">
            <AnimatedTooltipPreview />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LeadsCard;
